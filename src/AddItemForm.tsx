import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


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
            <input value={title}
                   onChange={onChangeSetTitle}
                   type="text"
                   onKeyDown={onPressEnter}
                   className={error ? 'errorInput' : ''}/>
            <button onClick={addItem}>+</button>
            {error && <p className={'errorText'}>Please enter title!</p>}
        </div>
    );
};

export default AddItemForm;