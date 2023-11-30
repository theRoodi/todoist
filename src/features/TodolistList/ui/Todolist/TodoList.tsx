import React, { memo, useCallback, useEffect, useMemo } from "react";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { useAppSelector } from "app/store";
import { tasksThunks } from "features/TodolistList/model/tasks/task-reducer";
import { FilterType } from "features/TodolistList/model/todolists/todolists-reducer";
import { RequestStatus } from "app/app-reducer";
import { findTasksSelector } from "common/utils/app.selectors";
import { useActions } from "common/hooks";
import { TaskType } from "features/TodolistList/api/tasks/tasksAPI.types";
import { FilterTasksButtons } from "features/TodolistList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "features/TodolistList/ui/Todolist/TodoListTitle/TodolistTitle";

export type Props = {
  title: string;
  todoId: string;
  filter: FilterType;
  entityStatus: RequestStatus;
};
export const Todolist = memo((props: Props) => {
  const { getTasks, addTask } = useActions(tasksThunks);

  const selectTodo = useMemo(findTasksSelector, []);

  const tasks = useAppSelector<Array<TaskType>>((state) => selectTodo(state, props.todoId));
  useEffect(() => {
    getTasks(props.todoId);
  }, [props.todoId]);

  const addTaskCallback = useCallback(
    (title: string) => {
      return addTask({ todoId: props.todoId, title }).unwrap();
    },
    [props.todoId],
  );

  return (
    <div className="todolist">
      <TodolistTitle title={props.title} todoId={props.todoId} entityStatus={props.entityStatus} />
      <AddItemForm addItem={addTaskCallback} disabled={props.entityStatus === "loading"} />
      <Tasks tasks={tasks} todoId={props.todoId} filter={props.filter} />
      <div className="btn-container">
        <FilterTasksButtons filter={props.filter} todoId={props.todoId} />
      </div>
    </div>
  );
});
