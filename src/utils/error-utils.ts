import { Dispatch } from "redux";
import { setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType } from "AppWithRedux/app-reducer";
import { ResponseType } from "api/todolist-api";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]));
  } else {
    dispatch(setAppErrorAC("Some error occurred"));
  }
  dispatch(setAppStatusAC("failed"));
};

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
  dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred"));
  dispatch(setAppStatusAC("failed"));
};

type ErrorUtilsDispatchType = Dispatch<SetAppStatusACType | SetAppErrorACType>;
