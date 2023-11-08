import { RootStateType } from "state/store";
import { createSelector } from "@reduxjs/toolkit";

export const statusSelector = (state: RootStateType) => state.app.status;
export const isInitSelector = (state: RootStateType) => state.app.isInit;
export const errorSelector = (state: RootStateType) => state.app.error;
export const isLoggedInSelector = (state: RootStateType) => state.auth.isLoggedIn;
export const tasksSelector = (state: RootStateType) => state.tasks;

export const findTasksSelector = () =>
  createSelector(
    tasksSelector,
    (_: any, id: string) => id,
    (tasks, id) => tasks[id],
  );
