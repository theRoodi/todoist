import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {IconButton, TextField} from '@mui/material';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTask = useCallback((title: string) => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Enter title!')
        }
    },[props.addItem])
    const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value), [])
    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if(error) setError(null)
        e.charCode === 13 ? addTask(title) : console.log()
        setError(null)
    }, [])
    return (
        <div>
            <TextField
                size='small'
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error && 'Enter title!'}
            />
            <IconButton onClick={() => addTask(title)} size="small">
                <AddIcon/>
            </IconButton>
            {/*{error && <div className={'errorMessage'}>{error}</div>}*/}
        </div>
    )
})