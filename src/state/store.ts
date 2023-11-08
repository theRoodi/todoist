import { AnyAction, combineReducers } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "app/app-reducer";
import { taskReducer } from "features/TodolistList/Todolist/task-reducer";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "features/auth/auth-reducer";
import { todolistReducer } from "features/TodolistList/Todolist/todolists-reducer";

export type RootStateType = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  todoLists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  auth: authReducer,
});
// export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({ reducer: rootReducer });

export type AppDispatch = ThunkDispatch<RootStateType, any, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AnyAction>;
export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

// @ts-ignore
window.store = store;
