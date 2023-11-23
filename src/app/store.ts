import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "app/app-reducer";
import { taskReducer } from "features/TodolistList/Todolist/task-reducer";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "features/auth/auth-reducer";
import { todolistReducer } from "features/TodolistList/Todolist/todolists-reducer";

export type RootStateType = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    todoLists: todolistReducer,
    tasks: taskReducer,
    app: appReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

// @ts-ignore
window.store = store;
