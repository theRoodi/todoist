import React from 'react';
import '../App.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {
    AppBar,
    Button,
    Container,
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
import {Todolist} from '../TodoList';
import {useAppWithRedux} from './hooks/useAppWithRedux';
import {TaskType} from '../api/todolist-api';

export type TaskStateType = {
    [key: string]: Array<TaskType>
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
