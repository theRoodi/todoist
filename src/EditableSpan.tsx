import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChangeTitle: (value: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

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
            ? <input onBlur={activateViewMode} value={title} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}