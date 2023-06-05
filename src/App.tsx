import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterType = 'all' | 'completed' | 'active'
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

function App() {

    const removeTodolist = (todoId: string) => {
        const filteredTodo = todolists.filter(tl => tl.id !== todoId)
        setTodolist(filteredTodo)
        delete tasks[todoId]
        setTasks({...tasks})
    }

    const removeTask = (id: string, todolistid: string) => {
        const newTasks = tasks[todolistid]
        const ftasks = newTasks.filter(ft => ft.id !== id)
        tasks[todolistid] = ftasks
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistid: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        const task = tasks[todolistid]
        const newTasks = [newTask, ...task]
        tasks[todolistid] = newTasks
        setTasks({...tasks})
    }

    const changeFilter = (value: FilterType, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolist([...todolists])

        }
    }
    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        const newTasks = tasks[todolistId]
        const task = newTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    const tl1 = v1()
    const tl2 = v1()
    const [tasks, setTasks] = useState<TaskStateType>({
        [tl1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [tl2]: [
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'milk', isDone: false}
        ]
    })

    const [todolists, setTodolist] = useState<Array<TodoListType>>([
        {id: tl1, title: 'What to buy', filter: 'all'},
        {id: tl2, title: 'What to learn', filter: 'all'},
    ])

    const addTodolist = (title: string) => {
        const todolist: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolist([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        const newTasks = tasks[todolistId]
        const task = newTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find( t => t.id === id)
        if(todolist) {
            todolist.title = newTitle
            setTodolist([...todolists])
        }
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let filteredTasks = tasks[tl.id]

                    if (tl.filter === 'completed') {
                        filteredTasks = tasks[tl.id].filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                    }
                    return (
                        <Todolist
                            key={tl.id}
                            title={tl.title}
                            todoId={tl.id}
                            tasks={filteredTasks}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}/>
                    )
                })
            }
        </div>
    );
}

export default App;
