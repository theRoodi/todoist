import React, { ChangeEvent, memo } from "react";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import ClearIcon from "@mui/icons-material/Clear";
import { tasksThunks } from "features/TodolistList/model/tasks/task-reducer";
import { useAppDispatch } from "app/store";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { TaskStatuses, TaskType } from "features/TodolistList/api/tasks/tasksAPI.types";
import style from "./Task.module.css";

type Props = {
  task: TaskType;
  todoId: string;
};
export const Task = memo((props: Props) => {
  const dispatch = useAppDispatch();
  const onRemoveTask = () => dispatch(tasksThunks.deleteTask({ todoId: props.todoId, taskId: props.task.id }));

  const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const isDoneValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(tasksThunks.updateTask({ todoId: props.todoId, taskId: props.task.id, model: { status: isDoneValue } }));
  };

  const onChangeTaskTitle = (title: string) =>
    dispatch(tasksThunks.updateTask({ todoId: props.todoId, taskId: props.task.id, model: { title } }));

  return (
    <ListItem
      className={props.task.status === TaskStatuses.Completed ? style.isDone : ""}
      disablePadding
      secondaryAction={
        <IconButton onClick={onRemoveTask} size="small">
          <ClearIcon />
        </IconButton>
      }
    >
      <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeTaskStatus} edge="start" />
      <EditableSpan title={props.task.title} onChangeTitle={onChangeTaskTitle} />
    </ListItem>
  );
});
