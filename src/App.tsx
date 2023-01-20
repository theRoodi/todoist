import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListId: string]: Array<TasksType>
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to want', filter: 'all'},
    ])


    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'One', isDone: true},
            {id: v1(), title: 'Two', isDone: true},
            {id: v1(), title: 'Three', isDone: false}],
        [todolistId2]: [
            {id: v1(), title: 'One1', isDone: true},
            {id: v1(), title: 'Two2', isDone: true},
            {id: v1(), title: 'Three3', isDone: false}],
    })

    // const [filter, setFilter] = useState<FilterValuesType>('all')
    // console.log(filter)
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: 'all'
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoList.id]: []})
    }
    const removeTask = (taskID: string, todoListId: string) => {
        const tasksForUpdate = tasks[todoListId]
        const updatedTasks = tasksForUpdate.filter(task => task.id !== taskID)
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTasks
        setTasks(copyTasks)

        // setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskID)})
    }
    const addTask = (title: string, todoListId: string) => {


        const newTask: TasksType = {
            id: v1(),
            title,
            isDone: false
        }
        const tasksForUpdate = tasks[todoListId]
        const updatedTasks = [newTask, ...tasksForUpdate]
        const copyTask = {...tasks}
        copyTask[todoListId] = updatedTasks
        setTasks(copyTask)

        //setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
    }

    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, title} : t)})
    }

    const changeTodoListFilter = (nextValueFilter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: nextValueFilter} : tl))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)
    }

    const getFilteredTask = (tasks: Array<TasksType>, filter: FilterValuesType): Array<TasksType> => {
        switch (filter) {
            case 'completed':
                return tasks.filter(task => task.isDone)
            case 'active':
                return tasks.filter(task => !task.isDone)
            default:
                return tasks
        }
    }

    const todoListsItems = todoLists.map(tl => {

        return (
            <Grid item>
                <Paper variant={'outlined'} sx={{p: '15px'}}>
                    <TodoList
                        todoListId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={getFilteredTask(tasks[tl.id], tl.filter)}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{p: '15px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListsItems}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
