import React, { ChangeEvent, memo } from "react";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteTask, updateTask, updateTitleTask } from "state/task-reducer";
import { TaskType } from "api/todolist-api";
import { useAppDispatch } from "state/store";
import { EditableSpan } from "components/EditableSpan/EditableSpan";

type TaskPropsType = {
  task: TaskType;
  todoId: string;
};
export const Task = memo((props: TaskPropsType) => {
  const dispatch = useAppDispatch();

  const onRemoveHandler = () => dispatch(deleteTask(props.todoId, props.task.id));

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isDoneValue = e.currentTarget.checked;
    dispatch(updateTask(props.todoId, props.task.id, isDoneValue ? 2 : 0));
  };

  const onChangeTitle = (title: string) => dispatch(updateTitleTask(props.todoId, props.task.id, title));

  return (
    <ListItem
      className={props.task.completed ? "isDone" : ""}
      disablePadding
      secondaryAction={
        <IconButton onClick={onRemoveHandler} size="small">
          <ClearIcon />
        </IconButton>
      }
    >
      <Checkbox checked={props.task.status === 2} onChange={onChangeStatusHandler} edge="start" />
      <EditableSpan title={props.task.title} onChangeTitle={onChangeTitle} />
    </ListItem>
  );
});
