import { Dispatch } from "redux";
import { ResponseType } from "api/todolist-api";
import { appActions } from "AppWithRedux/app-reducer";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
  dispatch(appActions.setAppError({ error: error.message ? error.message : "Some error occurred" }));
  dispatch(appActions.setAppStatus({ status: "failed" }));
};

type ErrorUtilsDispatchType = Dispatch;
