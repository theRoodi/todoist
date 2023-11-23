import { TaskStateType } from "app/AppWithRedux";
import axios from "axios";
import { appActions } from "app/app-reducer";
import { createSlice } from "@reduxjs/toolkit";
import { todolistThunks } from "features/TodolistList/Todolist/todolists-reducer";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError, thunkTryCatch } from "common/utils";
import { CreateTaskArg, TaskType, todolistAPI, UpdateTaskArg, UpdateTaskType } from "../todolistAPI";

export type UpdateModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadLine?: string;
};

type DeleteTaskArg = {
  todoId: string;
  taskId: string;
};

export enum RESULT_CODE {
  SUCCESS = 0,
  FAILED = 1,
  CATCH = 2,
}

const slice = createSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  reducers: {
    clearData: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoId];
        const index = tasks.findIndex((task) => task.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.model };
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.idTodo];
        const index = tasks.findIndex((task) => task.id === action.payload.idTask);
        if (index !== -1) {
          tasks.splice(index, 1);
        }
      })
      .addCase(todolistThunks.createTodo.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistThunks.deleteTodo.fulfilled, (state, action) => {
        delete state[action.payload.todoId];
      })
      .addCase(todolistThunks.getTodo.fulfilled, (state, action) => {
        action.payload.todolist.forEach((td: any) => {
          state[td.id] = [];
        });
      });
  },
});

export type ErrorType = {
  statusCode: 0;
  messages: [
    {
      messages: "string";
      field: "string";
    },
  ];
  error: "string";
};

export const getTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  `${slice.name}/getTasks`,
  async (todoId: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await todolistAPI.getTasks(todoId);
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { tasks: res.data.items, todolistId: todoId };
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  },
);

export const deleteTask = createAppAsyncThunk<any, DeleteTaskArg>(`${slice.name}/deleteTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistAPI.deleteTask(arg.todoId, arg.taskId);
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { idTask: arg.taskId, idTodo: arg.todoId };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    } else {
      handleServerNetworkError(e as Error, dispatch);
      return rejectWithValue(null);
    }
  }
});
export const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArg>(
  `${slice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistAPI.createTask(arg);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        return { task: res.data.data.item };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    });
  },
);
export const updateTask = createAppAsyncThunk<UpdateTaskArg, UpdateTaskArg>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));

    try {
      const state = getState();
      const task = state.tasks[arg.todoId].find((el) => el.id === arg.taskId);
      if (!task) {
        dispatch(appActions.setAppError({ error: "task not found" }));
        console.warn("task not found");
        return rejectWithValue(null);
      }
      const item: UpdateTaskType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...arg.model,
      };
      const res = await todolistAPI.updateTask(arg.todoId, arg.taskId, item);

      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  },
);
export const taskReducer = slice.reducer;
export const taskActions = slice.actions;
export const tasksThunks = { getTasks, addTask, updateTask, deleteTask };
