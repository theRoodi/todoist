import { LoginDataType } from "features/auth/Login/Login";
import { AxiosResponse } from "axios";
import { instance } from "common/api/instance";
import { ResponseType } from "./../TodolistList/todolistAPI";

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
