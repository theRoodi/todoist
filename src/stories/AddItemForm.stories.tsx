import type { Meta, StoryObj } from "@storybook/react";
import { AddItemForm, Props } from "../common/components/AddItemForm/AddItemForm";
import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const meta: Meta<typeof AddItemForm> = {
  title: "todo/AddItemForm",
  component: AddItemForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem: {
      description: "button clicked inside",
      action: "clicked",
    },
  },
};

export default meta;

type Story = StoryObj<typeof AddItemForm>;

// export const AddItemFormStory: Story = {
//   args: {
//     addItem: action("clicked addItem"),
//   },
// };

const Comp = (props: Props) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const addTask = useCallback(
    (title: string) => {
      if (title.trim() !== "") {
        // props.addItem(title.trim())
        setTitle("");
      } else {
        setError("Enter title!");
      }
    },
    [props.addItem],
  );
  const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value), []);
  const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null);
    e.charCode === 13 ? addTask(title) : console.log();
    setError(null);
  }, []);
  return (
    <div>
      <TextField
        size="small"
        value={title}
        onChange={changeTitle}
        onKeyPress={onKeyPressHandler}
        error={!error}
        helperText={!error && "Enter title!"}
      />
      <IconButton onClick={() => addTask(title)} size="small">
        <AddIcon />
      </IconButton>
    </div>
  );
};

export const AddItemFormErrorStory: Story = {
  render: (args) => <Comp addItem={args.addItem} />,
};
