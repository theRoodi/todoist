import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";

export const useAddItemForm = (addItem: (title: string) => void) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const addTask = useCallback(
    (title: string) => {
      if (title.trim() !== "") {
        addItem(title.trim());
        setTitle("");
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
