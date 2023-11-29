import { UpdateModelType } from "features/TodolistList/model/tasks/task-reducer";

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

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

export type GetTaskResponseType = {
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
