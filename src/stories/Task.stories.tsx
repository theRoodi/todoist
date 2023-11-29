import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Task } from "features/TodolistList/ui/Todolist/Task/Task";
import { useSelector } from "react-redux";

import { ReduxStoreProvider, RootStateType } from "../ReduxStoreProvider";
import { Tasks } from "features/TodolistList/ui/Todolist/TodoList";

const meta: Meta<typeof Task> = {
  title: "todo/Task",
  component: Task,
  tags: ["autodocs"],
  // args: {
  //     task: { id: '123321', title: 'title', isDone: false },
  //     todoId: 'qweewq'
  // },
  decorators: [ReduxStoreProvider],
};
export default meta;
type Story = StoryObj<typeof Task>;

const TaskComp = () => {
  // const task = useSelector<RootStateType,TasksType >(state => state.tasks['todo1'][0])
  // return <Task task={task} todoId={'todo1'} />
};

export const TaskStory: Story = {
  // render: (args) => <TaskComp />
};
