import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


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
                    <Checkbox checked={task.isDone}
                              size='small'
                              onChange={changeStatus}/>
                    <div style={{display: 'inline-block'}} className={task.isDone ? 'taskDone' : ''}>
                        <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    </div>
                    <IconButton color='primary'  aria-label="delete" size="small" onClick={removeTask} >
                        <HighlightOffIcon />
                    </IconButton>
                </li>
            )
        })
        : <span>List is empty <br/> Create first task</span>
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                <IconButton color='primary' aria-label="delete" size="small" onClick={onClickRemoveTodoListHandler} >
                    <HighlightOffIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {tasksElements}
            </ul>
            <div>
                <Button sx={{mr:'5px'}} variant="outlined" size='small' color={props.filter === 'all' ? 'secondary' : 'primary'}
                        onClick={onClickHandlerCreator('all')}>All
                </Button>
                <Button sx={{mr:'5px'}}  variant="outlined" size='small' color={props.filter === 'active' ? 'secondary' : 'primary'}
                        onClick={onClickHandlerCreator('active')}>Active
                </Button>
                <Button variant="outlined" size='small' color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={onClickHandlerCreator('completed')}>Completed
                </Button>
            </div>
        </div>
    );
};