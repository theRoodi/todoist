import {FilterType, TodoListType} from '../AppWithRedux/AppWithRedux';
import {v1} from 'uuid';


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

type ActionType = RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType

const initialState: Array<TodoListType> = []

export const todoListsReducer = (state = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST' : {
            return [
                {id: action.idTodoList, title: action.title, filter: 'all'},
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
