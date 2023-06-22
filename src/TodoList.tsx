import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton, List, ListItem} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/task-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todo-lists-reducer';


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    todoId: string
    filter: string
}
export const Todolist = (props: PropsType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<RootStateType, Array<TasksType>>(state => state.tasks[props.todoId])

    const removeTask = (id: string) => dispatch(removeTaskAC(id, props.todoId))
    const addTask = (title: string) =>  dispatch(addTaskAC(title, props.todoId))
    const removeTodolist = () => dispatch(removeTodolistAC(props.todoId))
    const changeTodolistTitle = (title: string) => dispatch(changeTodolistTitleAC(title, props.todoId))
    const onAllChangeFilter = () => dispatch(changeTodolistFilterAC('all', props.todoId))
    const onActiveChangeFilter = () => dispatch(changeTodolistFilterAC('active', props.todoId))
    const onCompletedChangeFilter = () => dispatch(changeTodolistFilterAC('completed', props.todoId))

    let filteredTasks = tasks

    if (props.filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
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
                    filteredTasks.map(task => {
                        const onRemoveHandler = () => {
                            removeTask(task.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            // changeStatus(task.id, e.currentTarget.checked, props.todoId)
                            dispatch(changeTaskStatusAC(props.todoId, task.id, e.currentTarget.checked))
                        }
                        const onChangeTitle = (newValue: string) => {
                            // changeTaskTitle(task.id, newValue, props.todoId)
                            dispatch(changeTaskTitleAC(props.todoId, task.id, newValue))
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

