import React, { useEffect, useState } from "react";
import { todolistAPI } from "features/TodolistList/todolistAPI";
import { instance } from "common/api/instance";

export default {
  title: "todoAPI/API",
};

const settings = {
  withCredentials: true,
};

const title = "test title22222";

export const GetTodolists = () => {
  const [state, setState] = useState<any>();
  useEffect(() => {
    todolistAPI.get().then((response) => {
      setState(response.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  // useEffect(() => {
  //     instance.addTodo(title)
  //         .then(res => setState(res.data))
  // }, [])

  return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const todolistId = "fc5db5a7-9a0f-4d4f-85c1-aa20eda30b1b";
  useEffect(() => {
    instance.delete(todolistId).then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const todolistId = "fc5db5a7-9a0f-4d4f-85c1-aa20eda30b1b";
  // useEffect(() => {
  //     instance.updateTodolist(todolistId, title)
  //         .then(res => setState(res.data))
  // }, [])

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodoID] = useState("");
  const getTask = () => {
    todolistAPI
      .getTasks(todolistId)
      .then((res) => setState(res.data))
      .then(() => setTodoID(""));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todo id"
          value={todolistId}
          onChange={(e) => setTodoID(e.currentTarget.value)}
        />
        <button onClick={getTask}>get tasks</button>
      </div>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodoID] = useState("");
  const [title, setTitle] = useState("");

  // const createTask = () => {
  //     instance.createTask(todolistId, title)
  //         .then(res => setState(res.data.data))
  // }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todo id"
          value={todolistId}
          onChange={(e) => setTodoID(e.currentTarget.value)}
        />
        <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        {/*<button onClick={createTask}>create task</button>*/}
      </div>
    </div>
  );
};
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodoID] = useState("");
  const [taskId, setTaskID] = useState("");
  const deleteTask = () => {
    todolistAPI.deleteTask(todolistId, taskId).then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todo id"
          value={todolistId}
          onChange={(e) => setTodoID(e.currentTarget.value)}
        />
        <input type="text" placeholder="taskId" value={taskId} onChange={(e) => setTaskID(e.currentTarget.value)} />
        <button onClick={deleteTask}>delete task</button>
      </div>
    </div>
  );
};
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodoID] = useState("");
  const [taskId, setTaskID] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState(0);
  const [priority, setPriority] = useState(0);
  const item = {
    title: title,
    description: desc,
    status: status,
    priority: priority,
    startDate: "",
    deadline: "",
  };
  const updateTask = () => {
    todolistAPI.updateTask(todolistId, taskId, item).then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todo id"
          value={todolistId}
          onChange={(e) => setTodoID(e.currentTarget.value)}
        />
        <input type="text" placeholder="taskId" value={taskId} onChange={(e) => setTaskID(e.currentTarget.value)} />
        <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        <input type="text" placeholder="description" value={desc} onChange={(e) => setDesc(e.currentTarget.value)} />
        <input type="number" placeholder="status" value={status} onChange={(e) => setStatus(+e.currentTarget.value)} />
        <input
          type="number"
          placeholder="priority"
          value={priority}
          onChange={(e) => setPriority(+e.currentTarget.value)}
        />
        <button onClick={updateTask}>update task</button>
      </div>
    </div>
  );
};
