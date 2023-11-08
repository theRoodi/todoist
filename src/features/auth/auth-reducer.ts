import { LoginDataType } from "features/auth/Login/Login";
import { RESULT_CODE, taskActions } from "features/TodolistList/Todolist/task-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "state/store";
import { appActions } from "app/app-reducer";
import { todolistActions } from "features/TodolistList/Todolist/todolists-reducer";
import { handleServerAppError, handleServerNetworkError } from "common/utils";
import { authAPI } from "features/auth/authAPI";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

// thunks

export const meTC = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch);
  } finally {
    dispatch(appActions.setAppInit({ isInit: true }));
  }
};
export const loginTC =
  (data: LoginDataType): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        console.log(res.data);
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (e) {
      handleServerNetworkError(e as { message: string }, dispatch);
    }
  };

export const logoutTC = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      dispatch(todolistActions.clearTodoData({}));
      dispatch(taskActions.clearData({}));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch);
  }
};
export const authReducer = slice.reducer;
export const authActions = slice.actions;