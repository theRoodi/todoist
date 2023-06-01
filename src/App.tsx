import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterType = 'all' | 'completed' | 'active'

function App() {

    const state = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ]

    const [tasks, setTasks] = useState(state)

    const [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (id: string) => {
        const ftasks = tasks.filter(ft => ft.id !== id)
        setTasks(ftasks)
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }
    const changeStatus = (id: string, isDone: boolean) => {
        const newTasks = [...tasks]
        const task = newTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks(newTasks)
    }
    let filteredTasks = tasks

    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}/>
        </div>
    );
}

export default App;
