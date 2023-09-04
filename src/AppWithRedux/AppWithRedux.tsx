import React, {useCallback, useState} from 'react';
import '../App.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {
    AppBar,
    Button,
    Container,
    createTheme,
    CssBaseline,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Switch,
    ThemeProvider,
    Toolbar,
    Typography
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {addTodolistAC,} from '../state/todo-lists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../state/store';
import {TasksType, Todolist} from '../TodoList';
import {useAppWithRedux} from './hooks/useAppWithRedux';

export type FilterType = 'all' | 'completed' | 'active'
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

export function AppWithRedux() {

    const {
        todoLists,
        isDarkMode,
        addTodolist,
        customTheme,
        setDark
    } = useAppWithRedux()


    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <div className="App">
                <AppBar position={'static'}>
                    <Toolbar>
                        <IconButton
                            size={'large'}
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}>
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h6'} component={'div'} sx={{flexGrow: 1}}>
                            Todolist
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch defaultChecked={false} onChange={(e) =>
                                    setDark(e.currentTarget.checked)}/>}
                                label={isDarkMode ? 'Go to Light' : 'Go to Dark'}
                            />
                        </FormGroup>
                        <Button color={'inherit'}>Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{p: '15px 0'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {
                            todoLists.map(tl => {
                                return (
                                    <Grid key={tl.id} item>
                                        <Todolist
                                            title={tl.title}
                                            todoId={tl.id}
                                            filter={tl.filter}/>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>

            </div>
        </ThemeProvider>

    );
}
