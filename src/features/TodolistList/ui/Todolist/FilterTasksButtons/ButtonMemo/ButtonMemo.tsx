import React, { memo } from "react";
import Button from "@mui/material/Button";

type Props = {
  variant: "text" | "outlined" | "contained";
  size: "small" | "medium" | "large";
  disableElevation: boolean;
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  onClick: () => void;
  title: string;
};

export const ButtonMemo = memo((props: Props) => {
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
