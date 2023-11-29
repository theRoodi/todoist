import { instance } from "common/api/instance";
import { BaseResponseType } from "common/types";
import { AxiosResponse } from "axios";
import { UpdateModelType } from "features/TodolistList/model/tasks/task-reducer";
import { CreateTaskArg, GetTaskResponseType, TaskType } from "features/TodolistList/api/tasks/tasksAPI.types";

export const tasksAPI = {
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
