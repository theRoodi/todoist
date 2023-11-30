import React, { useCallback } from "react";
import { useActions } from "common/hooks";
import { FilterType, todolistActions } from "features/TodolistList/model/todolists/todolists-reducer";
import { ButtonMemo } from "features/TodolistList/ui/Todolist/FilterTasksButtons/ButtonMemo/ButtonMemo";

type Props = {
  filter: string;
  todoId: string;
};
export const FilterTasksButtons = (props: Props) => {
  const { changeTodolistFilter } = useActions(todolistActions);

  const changeTodolistFilterHandler = useCallback(
    (filter: FilterType) => {
      changeTodolistFilter({ filter, todoId: props.todoId });
    },
    [props.todoId],
  );
  return (
    <>
      <ButtonMemo
        variant="contained"
        size="small"
        disableElevation={true}
        color={props.filter === "all" ? "secondary" : "primary"}
        onClick={() => changeTodolistFilterHandler("all")}
        title={"All"}
      />
      <ButtonMemo
        variant="contained"
        size="small"
        disableElevation={true}
        color={props.filter === "active" ? "secondary" : "primary"}
        onClick={() => changeTodolistFilterHandler("active")}
        title={"Active"}
      />
      <ButtonMemo
        variant="contained"
        size="small"
        disableElevation={true}
        color={props.filter === "completed" ? "secondary" : "primary"}
        onClick={() => changeTodolistFilterHandler("completed")}
        title={"Completed"}
      />
    </>
  );
};
