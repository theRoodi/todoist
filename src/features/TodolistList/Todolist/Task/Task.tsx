import React, { ChangeEvent, memo, useCallback } from "react";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteTask, tasksThunks } from "features/TodolistList/Todolist/task-reducer";
import { useAppDispatch } from "state/store";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { TaskStatuses, TaskType } from "features/TodolistList/todolistAPI";

type TaskPropsType = {
  task: TaskType;
  todoId: string;
};
export const Task = memo((props: TaskPropsType) => {
  const dispatch = useAppDispatch();

  const onRemoveHandler = () => dispatch(deleteTask(props.todoId, props.task.id));

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isDoneValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(tasksThunks.updateTask({ todoId: props.todoId, taskId: props.task.id, model: { status: isDoneValue } }));
  };

  const onChangeTitle = useCallback(
    (title: string) =>
      dispatch(tasksThunks.updateTask({ todoId: props.todoId, taskId: props.task.id, model: { title } })),
    [props.todoId, props.task],
  );

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
