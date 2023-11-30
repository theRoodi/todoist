import { AxiosResponse } from "axios";
import { instance } from "common/api/instance";
import { CreateTodoArg } from "features/TodolistList/model/todolists/todolists-reducer";
import { BaseResponseType } from "common/types/common.types";
import { TodoListType } from "features/TodolistList/api/todolists/todolistAPI.types";

export const todolistAPI = {
  updateTodolist(todoId: string, title: string) {
    return instance.put<BaseResponseType>(`todo-lists/${todoId}`, { title: title });
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
};
