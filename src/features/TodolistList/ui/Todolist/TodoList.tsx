import React, { memo, useCallback, useEffect, useMemo } from "react";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch, useAppSelector } from "app/store";
import { tasksThunks } from "features/TodolistList/model/tasks/task-reducer";
import { todolistActions, todolistThunks } from "features/TodolistList/model/todolists/todolists-reducer";
import { Task } from "features/TodolistList/ui/Todolist/Task/Task";
import { RequestStatus } from "app/app-reducer";
import { findTasksSelector } from "common/utils/app.selectors";
import { useActions } from "common/hooks";
import { TaskStatuses, TaskType } from "features/TodolistList/api/tasks/tasksAPI.types";

export type Tasks = {
  id: string;
  title: string;
  isDone: boolean;
};

export type Props = {
  title: string;
  todoId: string;
  filter: string;
  entityStatus: RequestStatus;
};
export const Todolist = memo((props: Props) => {
  const { deleteTodo, changeTodoTitle } = useActions(todolistThunks);
  const { getTasks, addTask } = useActions(tasksThunks);
  const { changeTodolistFilter } = useActions(todolistActions);

  const selectTodo = useMemo(findTasksSelector, []);

  const tasks = useAppSelector<Array<TaskType>>((state) => selectTodo(state, props.todoId));
  useEffect(() => {
    getTasks(props.todoId);
  }, [props.todoId]);

  const addTaskCallback = useCallback(
    (title: string) => {
      addTask({ todoId: props.todoId, title });
    },
    [props.todoId],
  );
  const removeTodolist = () => deleteTodo({ todoId: props.todoId });

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
    filteredTasks = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  if (props.filter === "active") {
    filteredTasks = tasks.filter((t) => t.status === TaskStatuses.New);
  }

  return (
    <div className="todolist">
      <h3>
        <EditableSpan title={props.title} onChangeTitle={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} disabled={props.entityStatus === "loading"}>
          <ClearIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCallback} disabled={props.entityStatus === "loading"} />
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
