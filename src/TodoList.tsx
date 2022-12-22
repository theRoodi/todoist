import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TasksType>
    removeTask: (taskID: string) => void
    changeTodoListFilter: (nextValueFilter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimTitle = title.trim()
        if (trimTitle){
            props.addTask(trimTitle)
        } else {
            setError(true)
        }
        setTitle('')

    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter)
    }

    const tasksElements = props.tasks.length
        ? props.tasks.map(task => {
            const removeTask = () => {
                props.removeTask(task.id)
            }

            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked)
            }
            return (
                <li key={task.id}>
                    <input type="checkbox"
                           checked={task.isDone}
                           onChange={changeStatus}
                    />
                    <span className={task.isDone ? 'taskDone' : ''}>{task.title}</span>
                    <button onClick={removeTask}>X</button>
                </li>
            )
        })
        : <span>List is empty <br/> Create first task</span>
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeSetTitle}
                       type="text"
                       onKeyDown={onPressEnter}
                       className={error ? 'errorInput' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className={'errorText'}>Please enter task title!</div>}
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'allBtn' : ''} onClick={onClickHandlerCreator('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'activeBtn' : ''}
                        onClick={onClickHandlerCreator('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'completedBtn' : ''}
                        onClick={onClickHandlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};