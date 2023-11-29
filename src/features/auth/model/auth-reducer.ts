import { LoginDataType } from "features/auth/ui/Login/Login";
import { RESULT_CODE, taskActions } from "features/TodolistList/model/tasks/task-reducer";
import { createSlice } from "@reduxjs/toolkit";
import { appActions } from "app/app-reducer";
import { todolistActions } from "features/TodolistList/model/todolists/todolists-reducer";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError, thunkTryCatch } from "common/utils";
import { authAPI } from "features/auth/api/authAPI";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
});

// thunks
const me = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/me`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.me();
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { isLoggedIn: true };
    } else {
      // handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  }).finally(() => {
    dispatch(appActions.setAppInit({ isInit: true }));
  });
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginDataType>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await authAPI.login(arg);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { isLoggedIn: true };
      } else {
        const isShowAppError = !res.data.fieldsErrors.length;
        handleServerAppError(res.data, dispatch, isShowAppError);
        return rejectWithValue(res.data);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  },
);

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      dispatch(todolistActions.clearTodoData({}));
      dispatch(taskActions.clearData({}));
      return { isLoggedIn: false };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch);
    return rejectWithValue(null);
  }
});
export const authReducer = slice.reducer;
export const authThunks = { login, logout, me };
