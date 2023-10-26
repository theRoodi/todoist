import { TaskStateType } from "AppWithRedux/AppWithRedux";
import { AddTodolistType, ClearDataActionType, RemoveTodolistType, SetTodolistType } from "./todolists-reducer";
import { Dispatch } from "redux";
import { TaskType, todolistAPI, UpdateTaskType } from "api/todolist-api";
import { RootStateType } from "./store";
import { SetAppErrorACType, setAppStatusAC, SetAppStatusACType } from "AppWithRedux/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import axios from "axios";

type RemoveTaskType = {
  type: "REMOVE-TASK";
  idTask: string;
  idTodo: string;
};

type AddTaskType = {
  type: "ADD-TASK";
  task: TaskType;
};
type ChangeTaskTitleType = {
  type: "CHANGE-TASK-TITLE";
  idTodo: string;
  taskId: string;
  title: string;
};
type ChangeTaskStatusType = {
  type: "CHANGE-TASK-STATUS";
  idTodo: string;
  taskId: string;
  status: number;
};
export type SetTasksType = {
  type: "SET-TASK";
  tasks: Array<TaskType>;
  todolistId: string;
};

type ActionType =
  | RemoveTaskType
  | AddTaskType
  | ChangeTaskTitleType
  | ChangeTaskStatusType
  | AddTodolistType
  | RemoveTodolistType
  | SetTodolistType
  | SetTasksType
  | SetAppStatusACType
  | SetAppErrorACType
  | ClearDataActionType;

export enum RESULT_CODE {
  SUCCESS = 0,
  FAILED = 1,
  CATCH = 2,
}

const initialState: TaskStateType = {};

export const taskReducer = (state = initialState, action: ActionType): TaskStateType => {
  switch (action.type) {
    case "SET-TODOLIST": {
      const copyState = { ...state };
      action.todos.forEach((td) => {
        copyState[td.id] = [];
      });
      return copyState;
    }
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.idTodo];
      const filteredTasks = tasks.filter((t) => t.id !== action.idTask);
      stateCopy[action.idTodo] = filteredTasks;
      return stateCopy;
    }
    case "SET-TASK": {
      return {
        ...state,
        [action.todolistId]: action.tasks,
      };
    }
    case "ADD-TASK": {
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      };
    }
    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.idTodo];
      stateCopy[action.idTodo] = tasks.map((t) => (t.id === action.taskId ? { ...t, title: action.title } : t));
      return stateCopy;
    }
    case "CHANGE-TASK-STATUS": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.idTodo];
      stateCopy[action.idTodo] = tasks.map((t) => (t.id === action.taskId ? { ...t, status: action.status } : t));
      return stateCopy;
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
      stateCopy[action.idTodoList] = [];
      return stateCopy;
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    case "CLEAR-DATA": {
      return {};
    }
    default:
      return state;
  }
};

export const removeTaskAC = (idTask: string, idTodo: string): RemoveTaskType => {
  return { type: "REMOVE-TASK", idTask, idTodo };
};

export const addTaskAC = (task: TaskType): AddTaskType => {
  return { type: "ADD-TASK", task };
};
export const changeTaskTitleAC = (idTodo: string, taskId: string, title: string): ChangeTaskTitleType => {
  return { type: "CHANGE-TASK-TITLE", idTodo, taskId, title };
};
export const changeTaskStatusAC = (idTodo: string, taskId: string, status: number): ChangeTaskStatusType => {
  return { type: "CHANGE-TASK-STATUS", idTodo, taskId, status };
};
export const setTaskAC = (tasks: TaskType[], todolistId: string): SetTasksType => {
  return { type: "SET-TASK", tasks, todolistId } as const;
};

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
export const getTask = (todoId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistAPI.getTasks(todoId).then((res) => {
    dispatch(setTaskAC(res.data.items, todoId));
    dispatch(setAppStatusAC("succeeded"));
  });
};

export const deleteTask = (todoId: string, taskId: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  try {
    const response = await todolistAPI.deleteTask(todoId, taskId);
    if (response.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(removeTaskAC(taskId, todoId));
      dispatch(setAppStatusAC("succeeded"));
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
  dispatch(setAppStatusAC("loading"));
  todolistAPI
    .createTask(todoId, title)
    .then((res) => {
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        const task = res.data.data.item;
        dispatch(addTaskAC(task));
        dispatch(setAppStatusAC("succeeded"));
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
            dispatch(changeTaskStatusAC(todoId, taskId, status));
            dispatch(setAppStatusAC("succeeded"));
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
          dispatch(changeTaskTitleAC(todoId, taskId, title));
          dispatch(setAppStatusAC("succeeded"));
        })
        .catch((e) => {
          handleServerNetworkError(e, dispatch);
        });
    }
  };
