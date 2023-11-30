import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { BaseResponseType } from "common/types";

export const useAddItemForm = (addItem: (title: string) => Promise<unknown>) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const addTask = useCallback(
    (title: string) => {
      if (title.trim() !== "") {
        addItem(title.trim())
          .then(() => {
            setTitle("");
          })
          .catch((error: BaseResponseType) => {
            if (error?.resultCode) {
              setError(error.messages[0]);
            }
          });
      } else {
        setError("Enter title!");
      }
    },
    [addItem],
  );
  const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value), []);
  const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null);
    e.charCode === 13 ? addTask(title) : console.log();
    setError(null);
  }, []);

  return {
    title,
    error,
    changeTitle,
    onKeyPressHandler,
    addTask,
  };
};
