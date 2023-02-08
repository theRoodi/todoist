import {FilterValuesType, TasksStateType, TodoListType} from '../App';
import {v1} from 'uuid';
import {TasksType} from '../TodoList';
import {AddTodolistAT, RemoveTodoListAT} from './todolist-reducer';

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>


export type ActionTypes = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodoListAT
export const tasksReducer = (state: TasksStateType, action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            const newTask: TasksType = {
                id: '4',
                title: action.title,
                isDone: false
            }
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE-TITLE-STATUS':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoListId]: []
            }
        case 'REMOVE-TODOLIST':
            // let copyState = {...state}
            // delete copyState[action.id]
            // return copyState

            let {[action.id]: [], ...rest} = {...state}
            return rest

        default:
            return state
    }

}


export const removeTaskAC = (taskId: string, todoListID: string) => ({type: 'REMOVE-TASK', taskId, todoListID} as const)
export const addTaskAC = (title: string, todoListID: string) => ({type: 'ADD-TASK', title, todoListID} as const)
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListID: string) => ({
    type: 'CHANGE-TASK-STATUS',
    taskId,
    isDone,
    todoListID
} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string) => ({
    type: 'CHANGE-TITLE-STATUS',
    taskId,
    title,
    todoListID
} as const)

