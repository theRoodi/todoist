import React from 'react';
import {FilterValuesType} from './App';


export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: number) => void
    changeTodoListFilter: (nextValue: FilterValuesType) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const tasksElements = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>X</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button onClick={() => props.changeTodoListFilter('all')}>All</button>
                <button onClick={() => props.changeTodoListFilter('active')}>Active</button>
                <button onClick={() => props.changeTodoListFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};