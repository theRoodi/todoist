import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../state/store';
import {useCallback, useState} from 'react';
import {addTodolistAC} from '../../state/todo-lists-reducer';
import {createTheme} from '@mui/material';
import {TodoListType} from '../AppWithRedux';

export const useAppWithRedux = () => {
    const dispatch = useDispatch()
    const todoLists = useSelector<RootStateType, Array<TodoListType>>(state => state.todoLists)

    const [isDarkMode, setDarkMode] = useState<boolean>(false)
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const darkMode = isDarkMode ? 'dark' : 'light'

    const customTheme = createTheme({
        palette: {
            mode: darkMode
        }
    })

    const setDark = (value:boolean) => {
        setDarkMode(value)
    }



    return {
        todoLists,
        isDarkMode,
        addTodolist,
        customTheme,
        setDark
    }
}