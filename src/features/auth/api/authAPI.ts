import { AxiosResponse } from "axios";
import { instance } from "common/api/instance";
import { BaseResponseType } from "common/types";
import { LoginDataType } from "common/types/common.types";

type UserDataType = {
  id: number;
  email: string;
  login: string;
};
export const authAPI = {
  me() {
    return instance.get<BaseResponseType<UserDataType>>(`auth/me`);
  },
  login(data: LoginDataType) {
    return instance.post<
      BaseResponseType<{ userId: number }>,
      AxiosResponse<BaseResponseType<{ userId: number }>>,
      LoginDataType
    >(`auth/login`, data);
  },
  logout() {
    return instance.delete<BaseResponseType>(`auth/login`);
  },
};
