import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId : string
}

export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListId: string
    title: string

}
export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todoListId: string

}

export type ActionTypes = RemoveTodoListAT | AddTodolistAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT
export const todoListReducer = (todoLists: Array<TodoListType>, action: ActionTypes): Array<TodoListType>=> {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: 'all'
            }
            return [newTodoList, ...todoLists]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }

}


export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', id})
export const AddTodoListAC = (title: string): AddTodolistAT => ({type: 'ADD-TODOLIST', title, todoListId: v1()})
export const ChangeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleAT => ({type: 'CHANGE-TODOLIST-TITLE', title, todoListId})
export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodoListFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', filter, todoListId})