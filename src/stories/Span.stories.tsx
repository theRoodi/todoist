import type { Meta, StoryObj } from "@storybook/react";
import React, { ChangeEvent, useState } from "react";
import { Task } from "features/TodolistList/Todolist/Task/Task";
import { EditableSpan, EditableSpanPropsType } from "../common/components/EditableSpan/EditableSpan";
import { action } from "@storybook/addon-actions";
import { TextField } from "@mui/material";

const meta: Meta<typeof EditableSpan> = {
  title: "todo/EditableSpan",
  component: EditableSpan,
  tags: ["autodocs"],
  args: {
    title: "title",
    onChangeTitle: action("title changed"),
  },
};
export default meta;
type Story = StoryObj<typeof EditableSpan>;

const Comp = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChangeTitle(title);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      size="small"
      variant="standard"
      onBlur={activateViewMode}
      value={title}
      autoFocus
      onChange={onChangeHandler}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
};

export const EditableSpanStory: Story = {
  render: (args) => <Comp title={args.title} onChangeTitle={args.onChangeTitle} />,
};
