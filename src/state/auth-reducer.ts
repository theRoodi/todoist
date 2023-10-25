import { Dispatch } from "redux";
import {
  SetAppErrorACType,
  setAppInitAC,
  SetAppInitACType,
  setAppStatusAC,
  SetAppStatusACType,
} from "../AppWithRedux/app-reducer";
import { authAPI } from "../api/todolist-api";
import { LoginDataType } from "../Login/Login";
import { RESULT_CODE } from "./task-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { ClearDataActionType, clearTodoDataAC } from "./todolists-reducer";

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};
// actions
export const setIsLoggedInAC = (value: boolean) => ({ type: "login/SET-IS-LOGGED-IN", value }) as const;

// thunks

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC("loading"));
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(setIsLoggedInAC(true));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch);
  } finally {
    dispatch(setAppInitAC(true));
  }
};
export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC("loading"));
  try {
    const res = await authAPI.login(data);
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(setIsLoggedInAC(true));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch);
  }
};

export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC("loading"));
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(setIsLoggedInAC(false));
      dispatch(setAppStatusAC("succeeded"));
      dispatch(clearTodoDataAC());
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch);
  }
};

// types
type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusACType
  | SetAppErrorACType
  | SetAppInitACType
  | ClearDataActionType;
