import { AxiosResponse } from "axios";
import { UpdateModelType } from "features/TodolistList/Todolist/task-reducer";
import { instance } from "common/api/instance";
import { CreateTodoArg } from "features/TodolistList/Todolist/todolists-reducer";
import { BaseResponseType } from "common/types/common.types";

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
  resultCode: number;
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
    return instance.put<BaseResponseType, { title: string }>(`todo-lists/${todolistId}`, { title: title });
  },
  get() {
    return instance.get<TodoListType[]>("todo-lists/");
  },
  delete(todolistId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`);
  },
  addTodo(arg: CreateTodoArg) {
    return instance.post<
      BaseResponseType<{ item: TodoListType }>,
      AxiosResponse<BaseResponseType<{ item: TodoListType }>>,
      { title: string }
    >("todo-lists", { title: arg.title });
  },

  getTasks(todolistId: string) {
    return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(arg: CreateTaskArg) {
    return instance.post<
      BaseResponseType<{ item: TaskType }>,
      AxiosResponse<BaseResponseType<{ item: TaskType }>>,
      { title: string }
    >(`todo-lists/${arg.todoId}/tasks`, { title: arg.title });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(todolistId: string, taskId: string, item: UpdateModelType) {
    return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, item);
  },
};
