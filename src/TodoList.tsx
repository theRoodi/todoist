import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';


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
    changeTaskTitle: (taskID:string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.todoListId)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }

    const onClickRemoveTodoListHandler = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }

    const tasksElements = props.tasks.length
        ? props.tasks.map(task => {
            const removeTask = () => {
                props.removeTask(task.id, props.todoListId)
            }

            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
            }
            const changeTaskTitle = (title:string) => {
                props.changeTaskTitle(task.id, title, props.todoListId)
            }
            return (
                <li key={task.id}>
                    <input type="checkbox"
                           checked={task.isDone}
                           onChange={changeStatus}
                    />
                    <div style={{display: 'inline-block'}} className={task.isDone ? 'taskDone' : ''}>
                        <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    </div>
                    <button onClick={removeTask}>X</button>
                </li>
            )
        })
        : <span>List is empty <br/> Create first task</span>
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                <button onClick={onClickRemoveTodoListHandler}>X</button>
            </h3>
            <AddItemForm addItem={addTask} />
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