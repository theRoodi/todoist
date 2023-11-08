import { Navigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "features/TodolistList/Todolist/TodoList";
import React from "react";
import { TodolistDomainType } from "features/TodolistList/Todolist/todolists-reducer";

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
