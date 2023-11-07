import { TaskStateType } from "AppWithRedux/AppWithRedux";
import { Dispatch } from "redux";
import { TaskType, todolistAPI, UpdateTaskType } from "api/todolist-api";
import { AppDispatch, RootStateType } from "./store";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import axios from "axios";
import { appActions } from "AppWithRedux/app-reducer";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistActions } from "state/todolists-reducer";
import { createAppAsyncThunk } from "utils/createAppAsyncThunk";

type UpdateModelType = {
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
  name: "task",
  initialState: {} as TaskStateType,
  reducers: {
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift(action.payload.task);
    },
    removeTask: (state, action: PayloadAction<{ idTask: string; idTodo: string }>) => {
      const tasks = state[action.payload.idTodo];
      const index = tasks.findIndex((task) => task.id === action.payload.idTask);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
    },
    updateTask: (state, action: PayloadAction<{ idTodo: string; taskId: string; model: UpdateModelType }>) => {
      const tasks = state[action.payload.idTodo];
      const index = tasks.findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
    setTask: (state, action: PayloadAction<{ tasks: TaskType[]; todolistId: string }>) => {
      state[action.payload.todolistId] = action.payload.tasks;
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

export const addTask = (todoId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistAPI
    .createTask(todoId, title)
    .then((res) => {
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(taskActions.addTask({ task: res.data.data.item }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};
export const updateTask =
  (todoId: string, taskId: string, status: number) => (dispatch: Dispatch, getState: () => RootStateType) => {
    const task = getState().tasks[todoId].find((el) => el.id === taskId);
    if (task) {
      const item: UpdateTaskType = {
        title: task.title,
        description: task.description,
        status: status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
      };
      todolistAPI
        .updateTask(todoId, taskId, item)
        .then((res) => {
          if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(taskActions.updateTask({ idTodo: todoId, taskId: taskId, model: item }));
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((e) => {
          handleServerNetworkError(e, dispatch);
        });
    }
  };

export const updateTitleTask =
  (todoId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: () => RootStateType) => {
    const task = getState().tasks[todoId].find((el) => el.id === taskId);
    if (task) {
      const item: UpdateTaskType = {
        title: title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
      };
      todolistAPI
        .updateTask(todoId, taskId, item)
        .then((res) => {
          dispatch(taskActions.updateTask({ idTodo: todoId, taskId: taskId, model: item }));
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
        })
        .catch((e) => {
          handleServerNetworkError(e, dispatch);
        });
    }
  };
export const taskReducer = slice.reducer;
export const taskActions = slice.actions;
export const tasksThunks = { getTasks };
