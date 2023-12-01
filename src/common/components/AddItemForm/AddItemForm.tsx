import React, { memo } from "react";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { useAddItemForm } from "common/components/AddItemForm/hooks/useAddItemForm";

export type Props = {
  addItem: (title: string) => Promise<unknown>;
  disabled?: boolean;
};
export const AddItemForm = memo((props: Props) => {
  const { title, error, changeTitle, onKeyPressHandler, addTask } = useAddItemForm(props.addItem);

  return (
    <div>
      <TextField
        size="small"
        value={title}
        onChange={changeTitle}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        disabled={props.disabled}
      />
      <IconButton onClick={() => addTask(title)} size="small" disabled={props.disabled}>
        <AddIcon />
      </IconButton>
      {error && <div className={"errorMessage"}>{error}</div>}
    </div>
  );
});
