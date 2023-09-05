import {useAppDispatch, useAppSelector} from '../../state/store';
import {useCallback, useEffect, useState} from 'react';
import {addTodolistAC, getTodo, TodolistDomainType} from '../../state/todolists-reducer';
import {createTheme} from '@mui/material';


export const useAppWithRedux = () => {
    const dispatch = useAppDispatch()
    const todoLists = useAppSelector<Array<TodolistDomainType>>(state => state.todoLists)

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
    const setDark = (value: boolean) => {
        setDarkMode(value)
    }

    useEffect(() => {
        dispatch(getTodo())
    }, [])


    return {
        todoLists,
        isDarkMode,
        addTodolist,
        customTheme,
        setDark
    }
}