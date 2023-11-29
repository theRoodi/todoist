import { appActions, RequestStatus } from "app/app-reducer";
import { RESULT_CODE } from "features/TodolistList/model/tasks/task-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistAPI } from "features/TodolistList/api/todolists/todolistAPI";
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from "common/utils";
import { TodoListType } from "features/TodolistList/api/todolists/todolistAPI.types";

export type FilterType = "all" | "active" | "completed";
export type TodolistDomainType = TodoListType & {
  filter: FilterType;
  entityStatus: RequestStatus;
};
export type CreateTodoArg = {
  title: string;
};
export type DeleteTodoArg = {
  todoId: string;
};
export type UpdateTodoTitleArg = {
  todoId: string;
  title: string;
};
const slice = createSlice({
  name: "todolist",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistTitle: (state, action: PayloadAction<{ title: string; todoId: string }>) => {
      const todolist = state.find((todo) => todo.id === action.payload.todoId);
      if (todolist) {
        todolist.title = action.payload.title;
      }
    },
    changeTodolistFilter: (state, action: PayloadAction<{ filter: FilterType; todoId: string }>) => {
      const todolist = state.find((todo) => todo.id === action.payload.todoId);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    },
    setEntityStatus: (state, action: PayloadAction<{ status: RequestStatus; todoId: string }>) => {
      const todolist = state.find((todo) => todo.id === action.payload.todoId);
      if (todolist) {
        todolist.entityStatus = action.payload.status;
      }
    },
    clearTodoData: (state, action) => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        return action.payload.todolist.map((el: any) => ({ ...el, filter: "all", entityStatus: "idle" }));
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todoId);
        if (index !== -1) {
          state.splice(index, 1);
        }
      })
      .addCase(changeTodoTitle.fulfilled, (state, action) => {
        const todolist = state.find((todo) => todo.id === action.payload.todoId);
        if (todolist) {
          todolist.title = action.payload.title;
        }
      });
  },
});

export const getTodo = createAppAsyncThunk<any, any>(`${slice.name}/getTodo`, async (argeeee, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistAPI.get();
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return { todolist: res.data };
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    dispatch(appActions.setAppStatus({ status: "failed" }));
    return rejectWithValue(null);
  }
});
export const deleteTodo = createAppAsyncThunk<any, DeleteTodoArg>(`${slice.name}/deleteTodo`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistAPI.delete(arg.todoId);
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { todoId: arg.todoId };
    } else {
      const error = res.data.messages[0];
      if (error) {
        dispatch(appActions.setAppError({ error: error }));
      } else {
        dispatch(appActions.setAppError({ error: "Please text me 👻" }));
      }
    }
  } catch (e) {
    dispatch(appActions.setAppStatus({ status: "failed" }));
    dispatch(todolistActions.setEntityStatus({ todoId: arg.todoId, status: "failed" }));
    return rejectWithValue(null);
  }
});
export const createTodo = createAppAsyncThunk<any, CreateTodoArg>(`${slice.name}/createTodo`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await todolistAPI.addTodo(arg);
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      return { todolist: res.data.data.item };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

export const changeTodoTitle = createAppAsyncThunk<any, UpdateTodoTitleArg>(
  `${slice.name}/changeTodoTitle`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await todolistAPI.updateTodolist(arg.todoId, arg.title);
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return arg;
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      dispatch(appActions.setAppStatus({ status: "failed" }));
      return rejectWithValue(null);
    }
  },
);

export const todolistReducer = slice.reducer;
export const todolistActions = slice.actions;
export const todolistThunks = { createTodo, getTodo, deleteTodo, changeTodoTitle };
