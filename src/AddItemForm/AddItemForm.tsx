import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {IconButton, TextField} from '@mui/material';
import {useAddItemForm} from './hooks/useAddItemForm';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = memo((props: AddItemFormPropsType) => {
    const {title, error, changeTitle, onKeyPressHandler, addTask} = useAddItemForm(props.addItem)

    return (
        <div>
            <TextField
                size="small"
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