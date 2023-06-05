import React, {ChangeEvent} from 'react';
import {FilterType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    todoId: string
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filter: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todoId: string) => void
    filter: string
    changeTaskTitle: (id: string, newTitle: string, todoId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}
export const Todolist = (props: PropsType) => {

    const removeTask = (id: string) => props.removeTask(id, props.todoId)
    const removeTodolist = () => props.removeTodolist(props.todoId)
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(props.todoId, title)
    const onAllChangeFilter = () => props.changeFilter('all', props.todoId)
    const onActiveChangeFilter = () => props.changeFilter('active', props.todoId)
    const onCompletedChangeFilter = () => props.changeFilter('completed', props.todoId)
    const addTask = (title: string) => {
        props.addTask(title, props.todoId)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChangeTitle={changeTodolistTitle}/>
                <button onClick={removeTodolist}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(task => {
                        const onRemoveHandler = () => {
                            removeTask(task.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, e.currentTarget.checked, props.todoId)
                        }
                        const onChangeTitle = (newValue: string) => {
                            props.changeTaskTitle(task.id, newValue, props.todoId)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                                <EditableSpan title={task.title} onChangeTitle={onChangeTitle}/>
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

