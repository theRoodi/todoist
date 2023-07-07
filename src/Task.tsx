import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {EditableSpan} from './EditableSpan';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/task-reducer';

type TaskPropsType = {
    task: { id: string, title: string, isDone: boolean }
    todoId: string
}
export const Task = memo((props: TaskPropsType) => {

    const dispatch = useDispatch();

    const onRemoveHandler = () => dispatch(removeTaskAC(props.task.id, props.todoId))

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(props.todoId, props.task.id, e.currentTarget.checked))

    const onChangeTitle = (title: string) => dispatch(changeTaskTitleAC(props.todoId, props.task.id, title))

    return (
        <ListItem
            className={props.task.isDone ? 'isDone' : ''}
            disablePadding
            secondaryAction={
                <IconButton onClick={onRemoveHandler} size="small">
                    <ClearIcon/>
                </IconButton>
            }
        >
            <Checkbox checked={props.task.isDone} onChange={onChangeStatusHandler} edge="start"/>
            <EditableSpan title={props.task.title} onChangeTitle={onChangeTitle}/>

        </ListItem>
    )
})