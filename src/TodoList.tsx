import React, {memo, useCallback} from 'react';
import {AddItemForm} from './AddItemForm/AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton, List} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './state/store';
import {addTaskAC } from './state/task-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todo-lists-reducer';
import {Task} from './Task';


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

    const addTask = useCallback((title: string) => dispatch(addTaskAC(title, props.todoId)), [dispatch, props.todoId])
    const removeTodolist = useCallback(() => dispatch(removeTodolistAC(props.todoId)), [dispatch, props.todoId])
    const changeTodolistTitle = useCallback((title: string) => dispatch(changeTodolistTitleAC(title, props.todoId)), [dispatch, props.todoId])

    const onAllChangeFilter = useCallback(() => dispatch(changeTodolistFilterAC('all', props.todoId)), [dispatch, props.todoId])
    const onActiveChangeFilter = useCallback(() => dispatch(changeTodolistFilterAC('active', props.todoId)), [dispatch, props.todoId])
    const onCompletedChangeFilter = useCallback(() => dispatch(changeTodolistFilterAC('completed', props.todoId)), [dispatch, props.todoId])

    let filteredTasks = tasks

    if (props.filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="todolist">
            <h3><EditableSpan title={props.title} onChangeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <ClearIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {filteredTasks.map(task => <Task key={task.id}
                                                 task={task}
                                                 todoId={props.todoId}/>)}
            </List>
            <div className="btn-container">
                <ButtonMemo variant="contained"
                            size="small"
                            disableElevation={true}
                            color={props.filter === 'all' ? 'secondary' : 'primary'}
                            onClick={onAllChangeFilter}
                            title={'All'}/>
                <ButtonMemo variant="contained"
                            size="small"
                            disableElevation={true}
                            color={props.filter === 'active' ? 'secondary' : 'primary'}
                            onClick={onActiveChangeFilter}
                            title={'Active'}/>
                <ButtonMemo variant="contained"
                            size="small"
                            disableElevation={true}
                            color={props.filter === 'completed' ? 'secondary' : 'primary'}
                            onClick={onCompletedChangeFilter}
                            title={'Completed'}/>
            </div>
        </div>
    )
})

type ButtonPropsType = {
    variant: 'text' | 'outlined' | 'contained'
    size: 'small' | 'medium' | 'large'
    disableElevation: boolean
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    onClick: () => void
    title: string
}

const ButtonMemo = memo((props: ButtonPropsType) => {
    return <Button variant={props.variant}
                   size={props.size}
                   disableElevation={props.disableElevation}
                   color={props.color}
                   onClick={props.onClick}>{props.title}
    </Button>
})

