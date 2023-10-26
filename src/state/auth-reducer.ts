import { Dispatch } from "redux";
import {
  SetAppErrorACType,
  setAppInitAC,
  SetAppInitACType,
  setAppStatusAC,
  SetAppStatusACType,
} from "AppWithRedux/app-reducer";
import { authAPI } from "api/todolist-api";
import { LoginDataType } from "Login/Login";
import { RESULT_CODE } from "./task-reducer";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { ClearDataActionType, clearTodoDataAC } from "./todolists-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "state/store";

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
  dispatch(setAppStatusAC("loading"));
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch);
  } finally {
    dispatch(setAppInitAC(true));
  }
};
export const loginTC =
  (data: LoginDataType): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (e) {
      handleServerNetworkError(e as { message: string }, dispatch);
    }
  };

export const logoutTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
      dispatch(setAppStatusAC("succeeded"));
      dispatch(clearTodoDataAC());
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch);
  }
};
export const authReducer = slice.reducer;
export const authActions = slice.actions;
