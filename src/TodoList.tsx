import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: string) => void
    changeTodoListFilter: (nextValueFilter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter)
    }

    const tasksElements = props.tasks.map(task => {
        const removeTask = () => {
            props.removeTask(task.id)
        }

        const changeStatus = () => {
            props.changeTaskStatus(task.id)
        }
        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeStatus}
                />
                <span>{task.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeSetTitle} type="text" onKeyDown={onPressEnter}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button onClick={onClickHandlerCreator('all')}>All</button>
                <button onClick={onClickHandlerCreator('active')}>Active</button>
                <button onClick={onClickHandlerCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};