import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from './TodoList';

export type FilterValuesType = "all" | 'active'| 'completed'


function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'One', isDone: true},
        {id: 2, title: 'Two', isDone: true},
        {id: 3, title: 'Three', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')
    console.log(filter)

    const removeTask = (taskID: number) => {
        const updateTasks = tasks.filter(task => task.id !== taskID)
        setTasks(updateTasks)
    }

    const changeTodoListFilter = (nextValueFilter: FilterValuesType) => {
        setFilter(nextValueFilter)
    }

    let tasksForRender:Array<TasksType> = [];
    if(filter === 'all') {
        tasksForRender = tasks
    }else if (filter === 'active') {
        tasksForRender = tasks.filter(task => task.isDone === false)
    } else if (filter === 'completed') {
        tasksForRender = tasks.filter(task => task.isDone === true)
    }

    return (
        <div className="App">
            <TodoList
                title={'Learn that'}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
