import { TaskStateType } from "app/AppWithRedux";
import { Dispatch } from "redux";
import axios from "axios";
import { appActions } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistActions } from "features/TodolistList/Todolist/todolists-reducer";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";
import { CreateTaskArg, TaskType, todolistAPI, UpdateTaskArg, UpdateTaskType } from "../todolistAPI";

export type UpdateModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadLine?: string;
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
    removeTask: (state, action: PayloadAction<{ idTask: string; idTodo: string }>) => {
      const tasks = state[action.payload.idTodo];
      const index = tasks.findIndex((task) => task.id === action.payload.idTask);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
    },
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
      .addCase(todolistActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistActions.removeTodolist, (state, action) => {
        delete state[action.payload.todoId];
      })
      .addCase(todolistActions.setTodolist, (state, action) => {
        action.payload.todolist.forEach((td) => {
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
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistAPI.getTasks(todoId);
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { tasks: res.data.items, todolistId: todoId };
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  },
);

export const deleteTask = (todoId: string, taskId: string) => async (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const response = await todolistAPI.deleteTask(todoId, taskId);
    if (response.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(taskActions.removeTask({ idTask: taskId, idTodo: todoId }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    } else {
      handleServerAppError(response.data, dispatch);
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      handleServerNetworkError(e, dispatch);
    } else {
      handleServerNetworkError(e as Error, dispatch);
    }
  }
};
export const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArg>(
  `${slice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await todolistAPI.createTask(arg);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { task: res.data.data.item };
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
export const tasksThunks = { getTasks, addTask, updateTask };
