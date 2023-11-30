import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useCallback } from "react";
import { useActions } from "common/hooks";
import { todolistThunks } from "features/TodolistList/model/todolists/todolists-reducer";
import { RequestStatus } from "app/app-reducer";

type Props = {
  todoId: string;
  title: string;
  entityStatus: RequestStatus;
};

export const TodolistTitle = ({ title, todoId, entityStatus }: Props) => {
  const { deleteTodo, changeTodoTitle } = useActions(todolistThunks);
  const removeTodolist = () => deleteTodo({ todoId });

  const changeTodolistTitle = useCallback((title: string) => changeTodoTitle({ todoId, title }), [todoId]);
  return (
    <>
      <h3>
        <EditableSpan title={title} onChangeTitle={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} disabled={entityStatus === "loading"}>
          <ClearIcon />
        </IconButton>
      </h3>
    </>
  );
};
