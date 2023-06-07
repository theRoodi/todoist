import React, {ChangeEvent} from 'react';
import {FilterType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton, List, ListItem} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';


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
        <div className='todolist'>
            <h3><EditableSpan title={props.title} onChangeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} >
                    <ClearIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
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
                            <ListItem
                                key={task.id}
                                className={task.isDone ? 'isDone' : '' }
                                disablePadding
                                secondaryAction={
                                    <IconButton onClick={onRemoveHandler} size='small'>
                                        <ClearIcon/>
                                    </IconButton>
                                }
                            >
                                <Checkbox checked={task.isDone} onChange={onChangeHandler} edge='start'/>
                                <EditableSpan title={task.title} onChangeTitle={onChangeTitle}/>

                            </ListItem>
                        )
                    })
                }
            </List>
            <div className='btn-container'>
                <Button variant="contained"
                        size="small"
                        disableElevation
                        color={props.filter === 'all' ? 'secondary' : 'primary'}
                        onClick={onAllChangeFilter}>All
                </Button>
                <Button variant="contained"
                        size="small"
                        disableElevation
                        color={props.filter === 'active' ? 'secondary' : 'primary'}
                        onClick={onActiveChangeFilter}>Active
                </Button>
                <Button variant="contained"
                        size="small"
                        disableElevation
                        color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={onCompletedChangeFilter}>Completed
                </Button>
            </div>
        </div>
    )
}

