import { Provider } from "react-redux";
import { store } from "app/store";
import React from "react";
import { combineReducers, legacy_createStore } from "redux";
import { taskReducer } from "features/TodolistList/Todolist/task-reducer";
import { v1 } from "uuid";
import { todolistReducer } from "features/TodolistList/Todolist/todolists-reducer";

export type RootStateType = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  tasks: taskReducer,
  todo: todolistReducer,
});

const state = {
  todo: [
    { id: "todo1", title: "title one", filter: "all" },
    { id: "todo2", title: "title two", filter: "all" },
  ],
  tasks: {
    ["todo1"]: [
      { id: v1(), title: "HTML", isDone: false },
      { id: v1(), title: "CSS", isDone: false },
    ],
    ["todo2"]: [
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "REACT", isDone: false },
    ],
  },
};

export const storybookStore = legacy_createStore(rootReducer, state as unknown as RootStateType);

export const ReduxStoreProvider = (fn: () => React.ReactNode) => {
  return <Provider store={storybookStore}>{fn()}</Provider>;
};
