import {v1} from 'uuid';
import {todolistAPI, TodoListType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {setAppStatusAC, SetAppStatusACType} from '../AppWithRedux/app-reducer';


export type FilterType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodoListType & {
    filter: FilterType
}
export type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
    idTodoList: string
}

export type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterType
}

export type SetTodolistType = {
    type: 'SET-TODOLIST'
    todos: TodoListType[]
}

type ActionType =
    RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolistType
    | SetAppStatusACType


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLIST': {
            return action.todos.map(el => ({...el, filter: 'all'}))
        }

        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST' : {
            return [
                {
                    id: action.idTodoList,
                    title: action.title,
                    filter: 'all',
                    addedDate: '',
                    order: 0
                },
                ...state,
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]

        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]

        }
        default:
            return state
    }
}

export const removeTodolistAC = (todoId: string): RemoveTodolistType => {
    return {type: 'REMOVE-TODOLIST', id: todoId}
}
export const addTodolistAC = (title: string): AddTodolistType => {
    return {type: 'ADD-TODOLIST', title, idTodoList: v1()}
}
export const changeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id}
}
export const changeTodolistFilterAC = (filter: FilterType, id: string): ChangeTodolistFilterType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id}
}

export const setTodolistAC = (todos: Array<TodoListType>): SetTodolistType => {
    return {type: 'SET-TODOLIST', todos} as const
}

export const getTodo = () => (dispatch: Dispatch) => {
    todolistAPI.get()
        .then((res) => {
            dispatch(setTodolistAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const deleteTodo = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.delete(todoId)
        .then(res => {
            dispatch(removeTodolistAC(todoId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const createTodo = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.addTodo(title)
        .then(res => {
            dispatch(addTodolistAC(title))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const changeTodoTitle = (todoId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todoId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(title, todoId))
            dispatch(setAppStatusAC('succeeded'))
        })
}