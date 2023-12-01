import React, { useEffect } from "react";
import "../App.css";
import Menu from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { CircularProgress, LinearProgress, ThemeProvider } from "@mui/material";
import { useAppSelector } from "app/store";
import { ErrorSnackbar } from "common/components/ErrorSnakbar/ErrorSnackbar";
import { Login } from "features/auth/ui/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { authThunks } from "features/auth/model/auth-reducer";
import { RequestStatus } from "app/app-reducer";
import { isInitSelector, statusSelector } from "common/utils/app.selectors";
import { TodolistList } from "features/TodolistList/ui/TodolistList";
import { useActions, useAppWithRedux } from "common/hooks";
import { TaskType } from "features/TodolistList/api/tasks/tasksAPI.types";

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

export function App() {
  const { isLoggedIn, todoLists, isDarkMode, addTodolist, customTheme, setDark } = useAppWithRedux();

  const status = useAppSelector<RequestStatus>(statusSelector);
  const isInit = useAppSelector(isInitSelector);
  const { me, logout } = useActions(authThunks);
  const logoutHandler = () => {
    logout();
  };

  useEffect(() => {
    me();
  }, []);

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
