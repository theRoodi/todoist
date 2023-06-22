import {TaskStateType} from '../AppWithRedux';
import {v1} from 'uuid';
import {AddTodolistType, RemoveTodolistType} from './todo-lists-reducer';

type RemoveTaskType = {
    type: 'REMOVE-TASK'
    idTask: string
    idTodo: string
}

type AddTaskType = {
    type: 'ADD-TASK'
    idTodo: string
    title: string
}
type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    idTodo: string
    taskId: string
    title: string
}
type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    idTodo: string
    taskId: string
    isDone: boolean
}

type ActionType = RemoveTaskType | AddTaskType | ChangeTaskTitleType | ChangeTaskStatusType | AddTodolistType | RemoveTodolistType;


const initialState: TaskStateType = {}

export const taskReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.idTodo]
            const filteredTasks = tasks.filter(t => t.id !== action.idTask)
            stateCopy[action.idTodo] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.idTodo]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks =[newTask, ...tasks]
            stateCopy[action.idTodo] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.idTodo]
            stateCopy[action.idTodo] = tasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.idTodo]
            stateCopy[action.idTodo] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.idTodoList] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state

    }
}

export const removeTaskAC = (idTask: string, idTodo: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', idTask, idTodo}
}

export const addTaskAC = (title: string, idTodo: string ): AddTaskType => {
    return {type: 'ADD-TASK', idTodo, title}
}
export const changeTaskTitleAC = (idTodo: string, taskId: string, title: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', idTodo, taskId, title}
}
export const changeTaskStatusAC = (idTodo: string, taskId: string, isDone: boolean): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', idTodo, taskId, isDone}
}