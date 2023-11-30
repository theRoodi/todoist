import { LoginDataType } from "features/auth/ui/Login/Login";
import { RESULT_CODE, taskActions } from "features/TodolistList/model/tasks/task-reducer";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { todolistActions } from "features/TodolistList/model/todolists/todolists-reducer";
import { createAppAsyncThunk } from "common/utils";
import { authAPI } from "features/auth/api/authAPI";
import { appActions } from "app/app-reducer";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(authThunks.me.fulfilled, authThunks.login.fulfilled, authThunks.logout.fulfilled),
      (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      },
    );
  },
});

// thunks
const me = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/me`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await authAPI.me().finally(() => {
    dispatch(appActions.setAppInit({ isInit: true }));
  });
  if (res.data.resultCode === RESULT_CODE.SUCCESS) {
    return { isLoggedIn: true };
  } else {
    return rejectWithValue(res.data);
  }
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginDataType>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const res = await authAPI.login(arg);
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(res.data);
    }
  },
);

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await authAPI.logout();
  if (res.data.resultCode === RESULT_CODE.SUCCESS) {
    dispatch(todolistActions.clearTodoData({}));
    dispatch(taskActions.clearData({}));
    return { isLoggedIn: false };
  } else {
    return rejectWithValue(res.data);
  }
});
export const authReducer = slice.reducer;
export const authThunks = { login, logout, me };
