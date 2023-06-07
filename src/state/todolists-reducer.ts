import {FilterType, TodoListType} from '../App';
import {v1} from 'uuid';


export type RemoveTodolistType = {
    type: string
    id: string
}

export type AddTodolistType = {
    type: string
    title: string
}

export type ChangeTodolistTitleType = {
    type: string
    id: string
    title: string
}

export type ChangeTodolistFilterType = {
    type: string
    id: string
    filter: FilterType
}

type ActionType = RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType


export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST' : {
            return [
                ...state,
                {id: v1(), title: action.title, filter: 'all'}
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
            throw new Error('Typo HZ')
    }
}

export const RemoveTodolistAC = (todoId: string): RemoveTodolistType => {
    return {type: 'REMOVE-TODOLIST', id: todoId}
}
export const AddTodolistAC = (title: string): AddTodolistType => {
    return {type: 'ADD-TODOLIST', title}
}
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id}
}
export const ChangeTodolistFilterAC = (filter: FilterType, id: string): ChangeTodolistFilterType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id}
}
