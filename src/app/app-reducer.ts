import { AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatus,
    error: null as string | null,
    isInit: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatus }>) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppInit: (state, action: PayloadAction<{ isInit: boolean }>) => {
      state.isInit = action.payload.isInit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = "failed";
        if (action.payload) {
          if (action.type.includes("createTodo") || action.type.includes("addTask")) return;
          // state.error = action.payload.messages[0];
        } else {
          state.error = action.error.message ? action.error.message : "Some error";
        }
      });
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
