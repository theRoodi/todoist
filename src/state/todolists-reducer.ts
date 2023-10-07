import {v1} from 'uuid';
import {todolistAPI, TodoListType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorACType,
    setAppStatusAC,
    SetAppStatusACType
} from '../AppWithRedux/app-reducer';
import {RESULT_CODE} from './task-reducer';
import {handleServerNetworkError} from '../utils/error-utils';


export type FilterType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodoListType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
export type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type ClearDataActionType = {
    type: 'CLEAR-DATA'
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
export type SetEntityType = {
    type: 'SET-ENTITY-STATUS'
    status: RequestStatusType
    todoId: string
}

type ActionType =
    RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolistType
    | SetAppStatusACType
    | ReturnType<typeof setEntityStatusAC>
    | SetAppErrorACType
    | ClearDataActionType


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLIST': {
            return action.todos.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
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
                    order: 0,
                    entityStatus: 'idle'
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
        case 'SET-ENTITY-STATUS': {
            return state.map(tl => tl.id === action.todoId ? {...tl, entityStatus: action.status} : tl)
        }
        case 'CLEAR-DATA': {
            return []
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
export const setEntityStatusAC = (todoId: string, status: RequestStatusType): SetEntityType => {
    return {type: 'SET-ENTITY-STATUS', status, todoId} as const
}

export const clearTodoDataAC = () => {
    return {type: 'CLEAR-DATA'} as const
}

export const getTodo = () => (dispatch: Dispatch) => {
    todolistAPI.get()
        .then((res) => {
            dispatch(setTodolistAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const deleteTodo = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setEntityStatusAC(todoId, 'loading'))

    todolistAPI.delete(todoId)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(removeTodolistAC(todoId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                const error = res.data.messages[0]
                if (error) {
                    dispatch(setAppErrorAC(error))
                } else {
                    dispatch(setAppErrorAC('Please text me 👻'))
                }
            }
            dispatch(setAppStatusAC('failed'))
            dispatch(setEntityStatusAC(todoId, 'failed'))
        }).catch(() => {
        dispatch(setAppStatusAC('failed'))
        dispatch(setEntityStatusAC(todoId, 'failed'))
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