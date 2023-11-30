import { appActions, RequestStatus } from "app/app-reducer";
import { RESULT_CODE } from "features/TodolistList/model/tasks/task-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistAPI } from "features/TodolistList/api/todolists/todolistAPI";
import { createAppAsyncThunk, handleServerAppError } from "common/utils";
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

export const getTodo = createAppAsyncThunk<any, any>(`${slice.name}/getTodo`, async () => {
  const res = await todolistAPI.get();
  return { todolist: res.data };
});
export const deleteTodo = createAppAsyncThunk<any, DeleteTodoArg>(`${slice.name}/deleteTodo`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  const res = await todolistAPI.delete(arg.todoId).finally(() => {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  });
  if (res.data.resultCode === RESULT_CODE.SUCCESS) {
    return { todoId: arg.todoId };
  } else {
    rejectWithValue(res.data);
  }
});
export const createTodo = createAppAsyncThunk<any, CreateTodoArg>(`${slice.name}/createTodo`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await todolistAPI.addTodo(arg);
  if (res.data.resultCode === RESULT_CODE.SUCCESS) {
    return { todolist: res.data.data.item };
  } else {
    return rejectWithValue(res.data);
  }
});

export const changeTodoTitle = createAppAsyncThunk<any, UpdateTodoTitleArg>(
  `${slice.name}/changeTodoTitle`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    const res = await todolistAPI.updateTodolist(arg.todoId, arg.title);
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      return arg;
    } else {
      rejectWithValue(null);
    }
  },
);

export const todolistReducer = slice.reducer;
export const todolistActions = slice.actions;
export const todolistThunks = { createTodo, getTodo, deleteTodo, changeTodoTitle };
