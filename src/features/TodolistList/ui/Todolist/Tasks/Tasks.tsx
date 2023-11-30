import { Task } from "features/TodolistList/ui/Todolist/Task/Task";
import React from "react";
import List from "@mui/material/List";
import { TaskStatuses, TaskType } from "features/TodolistList/api/tasks/tasksAPI.types";
import { FilterType } from "features/TodolistList/model/todolists/todolists-reducer";

type Props = {
  filter: FilterType;
  tasks: TaskType[];
  todoId: string;
};
export const Tasks = ({ filter, tasks, todoId }: Props) => {
  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  if (filter === "active") {
    filteredTasks = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  return (
    <>
      <List>{filteredTasks?.map((task) => <Task key={task.id} task={task} todoId={todoId} />)}</List>
    </>
  );
};
