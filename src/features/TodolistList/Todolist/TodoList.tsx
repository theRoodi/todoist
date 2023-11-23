import React, { memo, useCallback, useEffect, useMemo } from "react";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch, useAppSelector } from "app/store";
import { tasksThunks } from "features/TodolistList/Todolist/task-reducer";
import { todolistActions, todolistThunks } from "features/TodolistList/Todolist/todolists-reducer";
import { Task } from "features/TodolistList/Todolist/Task/Task";
import { RequestStatusType } from "app/app-reducer";
import { findTasksSelector } from "common/utils/app.selectors";
import { TaskType } from "features/TodolistList/todolistAPI";
import { useActions } from "common/hooks";

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
  const { deleteTodo, changeTodoTitle } = useActions(todolistThunks);
  const { getTasks, addTask } = useActions(tasksThunks);
  const { changeTodolistFilter } = useActions(todolistActions);

  const selectTodo = useMemo(findTasksSelector, []);
  const tasks = useAppSelector<Array<TaskType>>((state) => selectTodo(state, props.todoId));
  useEffect(() => {
    getTasks(props.todoId);
  }, [props.todoId]);

  const addItem = useCallback(
    (title: string) => {
      addTask({ todoId: props.todoId, title });
    },
    [props.todoId],
  );
  const removeTodolist = useCallback(() => deleteTodo({ todoId: props.todoId }), [props.todoId]);

  const changeTodolistTitle = useCallback(
    (title: string) => changeTodoTitle({ todoId: props.todoId, title }),
    [props.todoId],
  );

  const onAllChangeFilter = useCallback(
    () => changeTodolistFilter({ filter: "all", todoId: props.todoId }),
    [props.todoId],
  );
  const onActiveChangeFilter = useCallback(
    () => changeTodolistFilter({ filter: "active", todoId: props.todoId }),
    [props.todoId],
  );
  const onCompletedChangeFilter = useCallback(
    () => changeTodolistFilter({ filter: "completed", todoId: props.todoId }),
    [props.todoId],
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
