export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState: InitialStateType = {
  status: "loading" as RequestStatusType,
  error: null,
  isInit: false,
};

type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInit: boolean;
};

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    case "APP/SET-INIT":
      return { ...state, isInit: action.isInit };
    default:
      return state;
  }
};

export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status }) as const;
export const setAppErrorAC = (error: null | string) => ({ type: "APP/SET-ERROR", error }) as const;
export const setAppInitAC = (isInit: boolean) => ({ type: "APP/SET-INIT", isInit }) as const;

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>;
export type SetAppInitACType = ReturnType<typeof setAppInitAC>;

type ActionsType = SetAppStatusACType | SetAppErrorACType | SetAppInitACType;
