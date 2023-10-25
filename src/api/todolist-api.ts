import axios, { AxiosResponse } from "axios";
import { LoginDataType } from "../Login/Login";

export type FilterType = "all" | "completed" | "active";

export type TodoListType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};
export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type GetTaskResponseType = {
  error: string | null;
  totalCount: number;
  items: Array<TaskType>;
};

export type UpdateTaskType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "0fcfa52c-cba5-484d-ae0d-56dac03d5456",
  },
});

export const todolistAPI = {
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType, { title: string }>(`todo-lists/${todolistId}`, { title: title });
  },
  get() {
    return instance.get<TodoListType[]>("todo-lists/");
  },
  delete(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  addTodo(title: string) {
    return instance.post<
      ResponseType<{ item: TodoListType }>,
      AxiosResponse<ResponseType<{ item: TodoListType }>>,
      { title: string }
    >("todo-lists", { title });
  },

  getTasks(todolistId: string) {
    return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      { title: string }
    >(`todo-lists/${todolistId}/tasks`, { title });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(todolistId: string, taskId: string, item: UpdateTaskType) {
    return instance.put<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      UpdateTaskType
    >(`todo-lists/${todolistId}/tasks/${taskId}`, item);
  },
};

type UserDataType = {
  id: number;
  email: string;
  login: string;
};

export const authAPI = {
  me() {
    return instance.get<ResponseType<UserDataType>>(`auth/me`);
  },
  login(data: LoginDataType) {
    return instance.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<ResponseType<{ userId: number }>>,
      LoginDataType
    >(`auth/login`, data);
  },
  logout() {
    return instance.delete<ResponseType>(`auth/login`);
  },
};
