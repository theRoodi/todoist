import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'One', isDone: true},
        {id: v1(), title: 'Two', isDone: true},
        {id: v1(), title: 'Three', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')
    console.log(filter)

    const removeTask = (taskID: string) => {
        const updateTasks = tasks.filter(task => task.id !== taskID)
        setTasks(updateTasks)
    }
    const addTask = (title: string) => {
        const newTask: TasksType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
    }

    const changeTodoListFilter = (nextValueFilter: FilterValuesType) => {
        setFilter(nextValueFilter)
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
    return (
        <div className="App">
            <TodoList
                title={'Learn that'}
                tasks={getFilteredTask(tasks, filter)}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
