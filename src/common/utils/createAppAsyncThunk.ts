import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootStateType } from "app/store";
import { BaseResponseType } from "common/types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootStateType;
  dispatch: AppDispatch;
  rejectValue: null | BaseResponseType;
}>();
