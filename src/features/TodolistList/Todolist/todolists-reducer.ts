import { Dispatch } from "redux";
import { appActions, RequestStatusType } from "app/app-reducer";
import { RESULT_CODE } from "features/TodolistList/Todolist/task-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistAPI, TodoListType } from "features/TodolistList/todolistAPI";

export type FilterType = "all" | "active" | "completed";
export type TodolistDomainType = TodoListType & {
  filter: FilterType;
  entityStatus: RequestStatusType;
};

const slice = createSlice({
  name: "todolist",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ todoId: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todoId);
      if (index != -1) {
        state.splice(index, 1);
      }
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodoListType }>) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
    },
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
    setEntityStatus: (state, action: PayloadAction<{ status: RequestStatusType; todoId: string }>) => {
      const todolist = state.find((todo) => todo.id === action.payload.todoId);
      if (todolist) {
        todolist.entityStatus = action.payload.status;
      }
    },
    setTodolist: (state, action: PayloadAction<{ todolist: Array<TodoListType> }>) => {
      return action.payload.todolist.map((el) => ({ ...el, filter: "all", entityStatus: "idle" }));
    },
    clearTodoData: (state, action) => {
      return [];
    },
  },
});

export const getTodo = () => (dispatch: Dispatch) => {
  todolistAPI
    .get()
    .then((res) => {
      dispatch(todolistActions.setTodolist({ todolist: res.data }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};

export const deleteTodo = (todoId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  dispatch(todolistActions.setEntityStatus({ status: "loading", todoId: todoId }));

  todolistAPI
    .delete(todoId)
    .then((res) => {
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(todolistActions.removeTodolist({ todoId: todoId }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        const error = res.data.messages[0];
        if (error) {
          dispatch(appActions.setAppError({ error: error }));
        } else {
          dispatch(appActions.setAppError({ error: "Please text me 👻" }));
        }
      }
      dispatch(appActions.setAppStatus({ status: "failed" }));
      dispatch(todolistActions.setEntityStatus({ todoId: todoId, status: "failed" }));
    })
    .catch(() => {
      dispatch(appActions.setAppStatus({ status: "failed" }));
      dispatch(todolistActions.setEntityStatus({ todoId: todoId, status: "failed" }));
    });
};
export const createTodo = (title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistAPI.addTodo(title).then((res) => {
    dispatch(todolistActions.addTodolist({ todolist: res.data.data.item }));
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
  });
};

export const changeTodoTitle = (todoId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistAPI.updateTodolist(todoId, title).then((res) => {
    dispatch(todolistActions.changeTodolistTitle({ title, todoId }));
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
  });
};

export const todolistReducer = slice.reducer;
export const todolistActions = slice.actions;
