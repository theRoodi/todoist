import {TaskStateType} from '../AppWithRedux/AppWithRedux';
import {v1} from 'uuid';
import {AddTodolistType, RemoveTodolistType, SetTodolistType} from './todolists-reducer';
import {Dispatch} from 'redux';
import {TaskType, todolistAPI, UpdateTaskType} from '../api/todolist-api';
import {RootStateType} from './store';

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
    status: number
}
export type SetTasksType = {
    type: 'SET-TASK'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionType =
    RemoveTaskType
    | AddTaskType
    | ChangeTaskTitleType
    | ChangeTaskStatusType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistType
    | SetTasksType


const initialState: TaskStateType = {}

export const taskReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'SET-TODOLIST': {
            const copyState = {...state}
            action.todos.forEach(td => {
                copyState[td.id] = []
            })
            return copyState
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.idTodo]
            const filteredTasks = tasks.filter(t => t.id !== action.idTask)
            stateCopy[action.idTodo] = filteredTasks
            return stateCopy
        }
        case 'SET-TASK': {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.idTodo]
            // const newTask = {id: v1(), title: action.title, isDone: false}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: 0,
                todoListId: action.idTodo, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: 0,
                completed: false
            }
            const newTasks = [newTask, ...tasks]
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
            stateCopy[action.idTodo] = tasks.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
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

export const addTaskAC = (title: string, idTodo: string): AddTaskType => {
    return {type: 'ADD-TASK', idTodo, title}
}
export const changeTaskTitleAC = (idTodo: string, taskId: string, title: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', idTodo, taskId, title}
}
export const changeTaskStatusAC = (idTodo: string, taskId: string, status: number): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', idTodo, taskId, status}
}
export const setTaskAC = (tasks: TaskType[], todolistId: string): SetTasksType => {
    return {type: 'SET-TASK', tasks, todolistId} as const
}
export const getTask = (todoId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todoId)
        .then((res) => {
            dispatch(setTaskAC(res.data.items, todoId))
        })
}

export const deleteTask = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todoId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todoId))
        })
}

export const addTask = (todoId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todoId, title)
        .then(res => {
            dispatch(addTaskAC(title, todoId))
        })
}
export const updateTask = (todoId: string, taskId: string, status: number) => (dispatch: Dispatch, getState: ()=> RootStateType) => {
    const task = getState().tasks[todoId].find(el => el.id === taskId)
    if (task) {
        const item: UpdateTaskType = {
            title: task.title,
            description: task.description,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        todolistAPI.updateTask(todoId, taskId, item)
            .then(res => {
                dispatch(changeTaskStatusAC(todoId,taskId, status))
            })
    }

}

export const updateTitleTask = (todoId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: ()=> RootStateType) => {
    const task = getState().tasks[todoId].find(el => el.id === taskId)
    if (task) {
        const item: UpdateTaskType = {
            title: title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        todolistAPI.updateTask(todoId, taskId, item)
            .then(res => {
                dispatch(changeTaskTitleAC(todoId,taskId, title))
            })
    }

}