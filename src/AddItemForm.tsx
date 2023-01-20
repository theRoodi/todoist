import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ButtonGroup, IconButton, TextField} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddItemFormType = {
    addItem: (title: string) => void

}
const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addItem(trimTitle)
        } else {
            setError(true)
        }
        setTitle('')

    }
    const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <ButtonGroup>
                <TextField
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onPressEnter}
                    variant="outlined"
                    label='Enter title'
                    error={error}
                    size='small'
                />
                <IconButton color="primary" aria-label="delete" size="small" onClick={addItem}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </ButtonGroup>
            {error && <p className={'errorText'}>Please enter title!</p>}
        </div>
    );
};

export default AddItemForm;