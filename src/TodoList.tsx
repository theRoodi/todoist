import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TasksType>
    removeTask: (taskID: string, todoListId: string) => void
    changeTodoListFilter: (nextValueFilter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addTask(trimTitle, props.todoListId)
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
        return () => props.changeTodoListFilter(filter, props.todoListId)
    }

    const onClickRemoveTodoListHandler = () => props.removeTodoList(props.todoListId)

    const tasksElements = props.tasks.length
        ? props.tasks.map(task => {
            const removeTask = () => {
                props.removeTask(task.id, props.todoListId)
            }

            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
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
            <h3>
                {props.title}
                <button onClick={onClickRemoveTodoListHandler}>X</button>
            </h3>
            <div>
                <input value={title}
                       onChange={onChangeSetTitle}
                       type="text"
                       onKeyDown={onPressEnter}
                       className={error ? 'errorInput' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <p className={'errorText'}>Please enter task title!</p>}
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'activeBtn' : 'defaultBtn'}
                        onClick={onClickHandlerCreator('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'activeBtn' : 'defaultBtn'}
                        onClick={onClickHandlerCreator('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'activeBtn' : 'defaultBtn'}
                        onClick={onClickHandlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};