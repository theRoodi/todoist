import React, { useEffect } from "react";
import "../App.css";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import Menu from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { PropsType, Todolist } from "../TodoList";
import { useAppWithRedux } from "./hooks/useAppWithRedux";
import { TaskType } from "../api/todolist-api";
import { CircularProgress, LinearProgress, ThemeProvider } from "@mui/material";
import { RequestStatusType } from "./app-reducer";
import { useAppDispatch, useAppSelector } from "../state/store";
import { ErrorSnackbar } from "../ErrorSnakbar/ErrorSnackbar";
import { Login } from "../Login/Login";
import { TodolistDomainType } from "../state/todolists-reducer";
import { Navigate, Route, Routes } from "react-router-dom";
import { logoutTC, meTC } from "../state/auth-reducer";

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

export function AppWithRedux() {
  const { isLoggedIn, todoLists, isDarkMode, addTodolist, customTheme, setDark } = useAppWithRedux();

  const status = useAppSelector<RequestStatusType>((state) => state.app.status);
  const isInit = useAppSelector((state) => state.app.isInit);
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logoutTC());
  };

  useEffect(() => {
    dispatch(meTC());
  }, [dispatch]);

  if (!isInit) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <div className="App">
        <ErrorSnackbar />
        <AppBar position={"static"}>
          <Toolbar>
            <IconButton size={"large"} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
            <Typography variant={"h6"} component={"div"} sx={{ flexGrow: 1 }}>
              Todolist
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Switch defaultChecked={false} onChange={(e) => setDark(e.currentTarget.checked)} />}
                label={isDarkMode ? "Go to Light" : "Go to Dark"}
              />
            </FormGroup>
            {isLoggedIn && (
              <Button color={"inherit"} onClick={logoutHandler}>
                Logout
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress color="secondary" />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/login"} element={<Login />} />
            <Route
              path={"/"}
              element={<TodolistList addTodolist={addTodolist} todoLists={todoLists} isLoggedIn={isLoggedIn} />}
            />
            <Route path={"404"} element={<h1>404 PAGE NOT FOUND</h1>} />
            <Route path={"*"} element={<Navigate to={"/404"} />} />
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export type TodoListsType = {
  addTodolist: (title: string) => void;
  todoLists: Array<TodolistDomainType>;
  isLoggedIn: boolean;
};

export const TodolistList = (props: TodoListsType) => {
  if (!props.isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <Grid container sx={{ p: "15px 0" }}>
        <AddItemForm addItem={props.addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {props.todoLists.map((tl) => {
          return (
            <Grid key={tl.id} item>
              <Todolist title={tl.title} todoId={tl.id} filter={tl.filter} entityStatus={tl.entityStatus} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
