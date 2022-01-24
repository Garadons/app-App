import React, { useState, useEffect, createContext } from "react";

import { parseDateTimeInput } from "../Utils";

import request from "../Api/Services/request";

const TasksContext = createContext();

function onTodoAdd(
  tasks,
  onTasks,
  todoTitle,
  todoDateTime,
  onTodoTitle,
  onTodoError,
  onTodoDateTime
) {
  if (todoTitle.trim() !== "" && todoDateTime.trim() !== "") {
    const newTasks = [...tasks];

    const date = parseDateTimeInput(todoDateTime);

    newTasks.push({ value: todoTitle, done: false, date });
    onTasks(newTasks);
    onTodoError(false);

    localStorage.setItem("tasks", JSON.stringify(newTasks));

    onTodoTitle("");
    onTodoDateTime("");

    const token = localStorage.getItem("accessToken");

    request("http://localhost:5000/api/settasks", "POST", {
      token,
      tasks: newTasks,
    });
  } else {
    if (todoDateTime.trim() !== "") {
      onTodoError("Title required");
    } else {
      onTodoError("Data required");
    }
  }
}

function isDone(id, onTasks, tasks) {
  const newTasks = [...tasks];
  const newTodoTask = { ...newTasks[id] };
  newTodoTask.done = true;
  newTasks[id] = newTodoTask;
  onTasks(newTasks);

  localStorage.setItem("tasks", JSON.stringify(newTasks));

  const token = localStorage.getItem("accessToken");

  request("http://localhost:5000/api/settasks", "POST", {
    token,
    tasks: newTasks,
  });
}

function onTodoChange(tasks, onTasks, todoValue, id) {
  const newTasks = [...tasks];
  const newTodoTask = { ...newTasks[id] };
  newTodoTask.value = todoValue;
  newTasks[id] = newTodoTask;
  onTasks(newTasks);

  const token = localStorage.getItem("accessToken");

  request("http://localhost:5000/api/settasks", "POST", {
    token,
    tasks: newTasks,
  });
}

function onDone(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));

  const token = localStorage.getItem("accessToken");

  request("http://localhost:5000/api/settasks", "POST", { token, tasks });
}

function onClose(onTasks) {
  onTasks(JSON.parse(localStorage.getItem("tasks")));

  const tasks = JSON.parse(localStorage.getItem("tasks"));

  const token = localStorage.getItem("accessToken");

  request("http://localhost:5000/api/settasks", "POST", { token, tasks });
}

function onTrashTodo(id, tasks, onTasks) {
  const newTasks = [...tasks];
  newTasks.splice(id, 1);
  onTasks(newTasks);

  localStorage.setItem("tasks", JSON.stringify(newTasks));

  const token = localStorage.getItem("accessToken");

  request("http://localhost:5000/api/settasks", "POST", {
    token,
    tasks: newTasks,
  });
}

async function getTasks() {}

const TasksProvider = (props) => {
  const [tasks, onTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  console.log(tasks);

  const token = localStorage.getItem("accessToken");

  const a = request("http://localhost:5000/api/gettasks", "POST", {
    token,
  });

  console.log(a);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        onTasks,
        onTodoAdd,
        isDone,
        onTodoChange,
        onDone,
        onClose,
        onTrashTodo,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };
