import { useAppDispatch, useAppSelector } from "state/store";
import { useCallback, useEffect, useState } from "react";
import { TodolistDomainType, todolistThunks } from "features/TodolistList/Todolist/todolists-reducer";
import { createTheme } from "@mui/material";
import { isLoggedInSelector } from "common/utils/app.selectors";

export const useAppWithRedux = () => {
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector<Array<TodolistDomainType>>((state) => state.todoLists);

  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(todolistThunks.createTodo({ title }));
    },
    [dispatch],
  );
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const darkMode = isDarkMode ? "dark" : "light";

  const customTheme = createTheme({
    palette: {
      mode: darkMode,
    },
  });
  const setDark = (value: boolean) => {
    setDarkMode(value);
  };

  useEffect(() => {
    dispatch(todolistThunks.getTodo({}));
  }, [dispatch]);

  return {
    isLoggedIn,
    todoLists,
    isDarkMode,
    addTodolist,
    customTheme,
    setDark,
  };
};
