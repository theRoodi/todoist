import React, { memo } from "react";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { useAddItemForm } from "./hooks/useAddItemForm";

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};
export const AddItemForm = memo((props: AddItemFormPropsType) => {
  const { title, error, changeTitle, onKeyPressHandler, addTask } = useAddItemForm(props.addItem);

  return (
    <div>
      <TextField
        size="small"
        value={title}
        onChange={changeTitle}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error && "Enter title!"}
        disabled={props.disabled}
      />
      <IconButton onClick={() => addTask(title)} size="small" disabled={props.disabled}>
        <AddIcon />
      </IconButton>
      {/*{error && <div className={'errorMessage'}>{error}</div>}*/}
    </div>
  );
});
