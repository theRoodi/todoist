import axios from 'axios'

export type FilterType = 'all' | 'completed' | 'active'

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseTodoType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
type ResponseTaskType<T = {}> = {
    data: T
    resultCode: number
    messages: Array<string>
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskResponseType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0fcfa52c-cba5-484d-ae0d-56dac03d5456',
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseTodoType>(`todo-lists/${todolistId}`, {title: title})
    },
    get() {
        return instance.get<TodoListType[]>('todo-lists/')
    },
    delete(todolistId: string) {
        return instance.delete<ResponseTodoType>(`todo-lists/${todolistId}`)
    },
    addTodo(title: string) {
        return instance.post<ResponseTodoType<{ item: TodoListType }>>('todo-lists/', {title})
    },

    getTasks(todolistId: string){
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<ResponseTaskType<TaskType>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<ResponseTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}` )
    },
    updateTask(todolistId: string, taskId: string, item: UpdateTaskType){
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, item )
    }
}
