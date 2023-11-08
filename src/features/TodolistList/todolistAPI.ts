import { AxiosResponse } from "axios";
import { UpdateModelType } from "features/TodolistList/Todolist/task-reducer";
import { instance } from "common/api/instance";

export type FilterType = "all" | "completed" | "active";
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

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

export type CreateTaskArg = {
  todoId: string;
  title: string;
};

export type UpdateTaskArg = {
  todoId: string;
  taskId: string;
  model: UpdateModelType;
};

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
  createTask(arg: CreateTaskArg) {
    return instance.post<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      { title: string }
    >(`todo-lists/${arg.todoId}/tasks`, { title: arg.title });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(todolistId: string, taskId: string, item: UpdateModelType) {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, item);
  },
};
