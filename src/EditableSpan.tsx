import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
}
const EditableSpan = (props: EditableSpanType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode)
        props.changeTitle(title)
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        isEditMode
        ? <TextField variant='standard' size='small' value={title} onBlur={toggleEditMode} onChange={onChangeSetTitle} autoFocus/>
        : <span onDoubleClick={toggleEditMode}>{props.title}</span>
    );
};

export default EditableSpan;