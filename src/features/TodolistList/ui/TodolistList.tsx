import { Navigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "features/TodolistList/ui/Todolist/TodoList";
import React, { useCallback, useEffect } from "react";
import { TodolistDomainType, todolistThunks } from "features/TodolistList/model/todolists/todolists-reducer";
import { useActions } from "common/hooks";

export type Props = {
  addTodolist: (title: string) => void;
  todoLists: Array<TodolistDomainType>;
  isLoggedIn: boolean;
};
export const TodolistList = (props: Props) => {
  const { createTodo, getTodo } = useActions(todolistThunks);

  useEffect(() => {
    if (!props.isLoggedIn) {
      return;
    }
    getTodo({});
  }, [props.isLoggedIn]);

  const addTodolist = useCallback((title: string) => {
    return createTodo({ title }).unwrap();
  }, []);

  if (!props.isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <Grid container sx={{ p: "15px 0" }}>
        <AddItemForm addItem={addTodolist} />
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
