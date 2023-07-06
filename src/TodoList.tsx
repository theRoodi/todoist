import React, {ChangeEvent, memo, useCallback} from 'react';
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
export const Todolist = memo((props: PropsType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<RootStateType, Array<TasksType>>(state => state.tasks[props.todoId])

    const addTask = useCallback((title: string) =>  dispatch(addTaskAC(title, props.todoId)), [dispatch, props.todoId])
    const removeTodolist = useCallback(() => dispatch(removeTodolistAC(props.todoId)), [dispatch, props.todoId])
    const changeTodolistTitle = useCallback((title: string) => dispatch(changeTodolistTitleAC(title, props.todoId)), [dispatch, props.todoId])

    const onAllChangeFilter = useCallback(() => dispatch(changeTodolistFilterAC('all', props.todoId)), [dispatch, props.todoId])
    const onActiveChangeFilter = useCallback(() => dispatch(changeTodolistFilterAC('active', props.todoId)), [dispatch, props.todoId])
    const onCompletedChangeFilter = useCallback(() => dispatch(changeTodolistFilterAC('completed', props.todoId)), [dispatch, props.todoId])

    const changeTaskStatus = useCallback((id: string, checked: boolean) => dispatch(changeTaskStatusAC(props.todoId, id, checked)), [dispatch, props.todoId])
    const changeTaskTitle = useCallback( (id: string, title: string) => dispatch(changeTaskTitleAC(props.todoId, id, title)), [dispatch, props.todoId])
    const removeTask = useCallback((id: string) => dispatch(removeTaskAC(id, props.todoId)), [dispatch, props.todoId])

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
                { filteredTasks.map(task => <Task key={task.id}
                                                  task={task}
                                                  changeTaskStatus={changeTaskStatus}
                                                  changeTaskTitle={changeTaskTitle}
                                                  removeTask={removeTask}/> ) }
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
})

type TaskPropsType = {
    task: { id: string, title: string, isDone: boolean }
    removeTask: (id : string) => void
    changeTaskStatus: (id : string, checked: boolean) => void
    changeTaskTitle: (id : string, title: string) => void
}

const Task = memo((props: TaskPropsType) => {
    const onRemoveHandler = useCallback(() => {
        props.removeTask(props.task.id)
    }, [props.removeTask, props.task.id])
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        // changeStatus(task.id, e.currentTarget.checked, props.todoId)
        // dispatch(changeTaskStatusAC(props.todoId, task.id, e.currentTarget.checked))
        props.changeTaskStatus(props.task.id, e.currentTarget.checked)
    }, [props.changeTaskStatus, props.task.id])
    const onChangeTitle = useCallback((newValue: string) => {
        // changeTaskTitle(task.id, newValue, props.todoId)
        // dispatch(changeTaskTitleAC(props.todoId, task.id, newValue))
        props.changeTaskTitle(props.task.id, newValue)
    }, [props.changeTaskTitle, props.task.id])

    return (
        <ListItem
            key={props.task.id}
            className={props.task.isDone ? 'isDone' : '' }
            disablePadding
            secondaryAction={
                <IconButton onClick={onRemoveHandler} size='small'>
                    <ClearIcon/>
                </IconButton>
            }
        >
            <Checkbox checked={props.task.isDone} onChange={onChangeStatusHandler} edge='start'/>
            <EditableSpan title={props.task.title} onChangeTitle={onChangeTitle}/>

        </ListItem>
    )
})