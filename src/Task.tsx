import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {EditableSpan} from './EditableSpan';
import {changeTaskStatusAC, changeTaskTitleAC, deleteTask} from './state/task-reducer';
import {TaskType} from './api/todolist-api';
import {useAppDispatch} from './state/store';

type TaskPropsType = {
    task: TaskType
    todoId: string
}
export const Task = memo((props: TaskPropsType) => {

    const dispatch = useAppDispatch();

    const onRemoveHandler = () => dispatch(deleteTask(props.todoId, props.task.id))

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(props.todoId, props.task.id, e.currentTarget.checked))

    const onChangeTitle = (title: string) => dispatch(changeTaskTitleAC(props.todoId, props.task.id, title))

    return (
        <ListItem
            className={props.task.completed ? 'isDone' : ''}
            disablePadding
            secondaryAction={
                <IconButton onClick={onRemoveHandler} size="small">
                    <ClearIcon/>
                </IconButton>
            }
        >
            <Checkbox checked={props.task.completed} onChange={onChangeStatusHandler} edge="start"/>
            <EditableSpan title={props.task.title} onChangeTitle={onChangeTitle}/>

        </ListItem>
    )
})