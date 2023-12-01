import { TaskType } from "features/TodolistList/api/tasks/tasksAPI.types";

export type FieldErrorType = {
  error: string;
  field: string;
};

export type BaseResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
  fieldsErrors: FieldErrorType[];
};
export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};
