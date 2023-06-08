import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistType, RemoveTodolistType} from './todolists-reducer';

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


export const taskReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
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
            const newTask = {id: 'taskId5', title: action.title, isDone: false}
            const newTasks =[newTask, ...tasks]
            stateCopy[action.idTodo] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.idTodo]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.idTodo]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
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
            throw new Error("3RR0R")

    }
}

export const RemoveTaskAC = (idTask: string, idTodo: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', idTask, idTodo}
}

export const addTaskAC = (idTodo: string, title: string): AddTaskType => {
    return {type: 'ADD-TASK', idTodo, title}
}
export const changeTaskTitleAC = (idTodo: string, taskId: string, title: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', idTodo, taskId, title}
}
export const changeTaskStatusAC = (idTodo: string, taskId: string, isDone: boolean): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', idTodo, taskId, isDone}
}