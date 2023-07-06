import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    onChangeTitle: (value: string) => void
}
export const EditableSpan = memo((props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChangeTitle(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField size='small' variant='standard' onBlur={activateViewMode} value={title} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})