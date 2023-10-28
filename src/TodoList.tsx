import React, { memo, useCallback, useEffect } from "react";
import { AddItemForm } from "AddItemForm/AddItemForm";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch, useAppSelector } from "state/store";
import { addTask, getTask } from "state/task-reducer";
import { changeTodoTitle, deleteTodo, todolistActions } from "state/todolists-reducer";
import { Task } from "Task";
import { TaskType } from "api/todolist-api";
import { RequestStatusType } from "AppWithRedux/app-reducer";

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type PropsType = {
  title: string;
  todoId: string;
  filter: string;
  entityStatus: RequestStatusType;
};
export const Todolist = memo((props: PropsType) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector<Array<TaskType>>((state) => state.tasks[props.todoId]);

  useEffect(() => {
    dispatch(getTask(props.todoId));
  }, [dispatch, props.todoId]);

  const addItem = useCallback((title: string) => dispatch(addTask(props.todoId, title)), [dispatch, props.todoId]);
  const removeTodolist = useCallback(() => dispatch(deleteTodo(props.todoId)), [dispatch, props.todoId]);
  const changeTodolistTitle = useCallback(
    (title: string) => dispatch(changeTodoTitle(props.todoId, title)),
    [dispatch, props.todoId],
  );

  const onAllChangeFilter = useCallback(
    () => dispatch(todolistActions.changeTodolistFilter({ filter: "all", todoId: props.todoId })),
    [dispatch, props.todoId],
  );
  const onActiveChangeFilter = useCallback(
    () => dispatch(todolistActions.changeTodolistFilter({ filter: "active", todoId: props.todoId })),
    [dispatch, props.todoId],
  );
  const onCompletedChangeFilter = useCallback(
    () => dispatch(todolistActions.changeTodolistFilter({ filter: "completed", todoId: props.todoId })),
    [dispatch, props.todoId],
  );

  let filteredTasks = tasks;

  if (props.filter === "completed") {
    filteredTasks = tasks.filter((t) => t.completed);
  }
  if (props.filter === "active") {
    filteredTasks = tasks.filter((t) => !t.completed);
  }

  return (
    <div className="todolist">
      <h3>
        <EditableSpan title={props.title} onChangeTitle={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} disabled={props.entityStatus === "loading"}>
          <ClearIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addItem} disabled={props.entityStatus === "loading"} />
      <List>{filteredTasks?.map((task) => <Task key={task.id} task={task} todoId={props.todoId} />)}</List>
      <div className="btn-container">
        <ButtonMemo
          variant="contained"
          size="small"
          disableElevation={true}
          color={props.filter === "all" ? "secondary" : "primary"}
          onClick={onAllChangeFilter}
          title={"All"}
        />
        <ButtonMemo
          variant="contained"
          size="small"
          disableElevation={true}
          color={props.filter === "active" ? "secondary" : "primary"}
          onClick={onActiveChangeFilter}
          title={"Active"}
        />
        <ButtonMemo
          variant="contained"
          size="small"
          disableElevation={true}
          color={props.filter === "completed" ? "secondary" : "primary"}
          onClick={onCompletedChangeFilter}
          title={"Completed"}
        />
      </div>
    </div>
  );
});

type ButtonPropsType = {
  variant: "text" | "outlined" | "contained";
  size: "small" | "medium" | "large";
  disableElevation: boolean;
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  onClick: () => void;
  title: string;
};

const ButtonMemo = memo((props: ButtonPropsType) => {
  return (
    <Button
      variant={props.variant}
      size={props.size}
      disableElevation={props.disableElevation}
      color={props.color}
      onClick={props.onClick}
    >
      {props.title}
    </Button>
  );
});
