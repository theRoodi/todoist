import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterType = 'all' | 'completed' | 'active'

function App() {

    const state = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ]

    const [tasks, setTasks] = useState(state)

    const [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (id: number) => {
        const ftasks = tasks.filter(ft => ft.id !== id)
        setTasks(ftasks)
    }

    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }
    let filteredTasks = tasks

    if(filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone )
    }
    if(filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone )
    }
    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks = {filteredTasks} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
