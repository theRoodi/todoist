import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from './App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: string
}
export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const addTask = (title: string) => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Enter title!')
        }

    }
    const removeTask = (id: string) => props.removeTask(id)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.charCode === 13 ? addTask(title) : console.log()
        setError(null)
    }
    const onAllChangeFilter = () => props.changeFilter('all')
    const onActiveChangeFilter = () => props.changeFilter('active')
    const onCompletedChangeFilter = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={changeTitle}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={() => addTask(title)}>+</button>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const onRemoveHandler = () => {
                            removeTask(task.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                                <span>{task.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'activeFilter' : ''}
                        onClick={onAllChangeFilter}>All
                </button>
                <button className={props.filter === 'active' ? 'activeFilter' : ''}
                        onClick={onActiveChangeFilter}>Active
                </button>
                <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                        onClick={onCompletedChangeFilter}>Completed
                </button>
            </div>
        </div>
    )
}