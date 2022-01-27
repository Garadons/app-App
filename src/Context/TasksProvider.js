import React, { useState, useEffect, createContext } from "react";

import { parseDateTimeInput, dateNow } from "../Utils";

import request from "../Api/Services/request";
import gettasks from "../Api/Services/gettasks";
import { on } from "events";

const TasksContext = createContext();

const TasksProvider = (props) => {
  const [todoTitle, onTodoTitle] = useState("");
  const [todoDateTime, onTodoDateTime] = useState(dateNow());
  const [todoError, onTodoError] = useState(false);
  const [editing, onEditing] = useState(false);
  const [readOnly, onReadOnly] = useState(true);
  const [tasks, onTasks] = useState([]);

  useEffect(async () => {
    let tasksFromApi = await gettasks();
    localStorage.setItem("tasks", JSON.stringify(tasksFromApi));
    onTasks(tasksFromApi);
  }, []);

  function onTodoAdd() {
    if (todoTitle.trim() !== "" && todoDateTime.trim() !== "") {
      const newTasks = [...tasks];

      const date = parseDateTimeInput(todoDateTime);

      newTasks.push({ value: todoTitle, done: false, date });
      onTasks(newTasks);
      onTodoError(false);

      localStorage.setItem("tasks", JSON.stringify(newTasks));

      onTodoTitle("");
      onTodoDateTime("");

      request("http://localhost:5000/api/settasks", "POST", true, {
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

  function isDone(id) {
    const newTasks = [...tasks];
    const newTodoTask = { ...newTasks[id] };
    newTodoTask.done = true;
    newTasks[id] = newTodoTask;
    onTasks(newTasks);

    localStorage.setItem("tasks", JSON.stringify(newTasks));

    request("http://localhost:5000/api/settasks", "POST", true, {
      tasks: newTasks,
    });
  }

  function onTodoChange(todoValue, id) {
    const newTasks = [...tasks];
    const newTodoTask = { ...newTasks[id] };
    newTodoTask.value = todoValue;
    newTasks[id] = newTodoTask;
    onTasks(newTasks);
  }

  function onDone() {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const newTasks = JSON.parse(localStorage.getItem("tasks"));

    request("http://localhost:5000/api/settasks", "POST", true, {
      tasks: newTasks,
    });
  }

  function onClose() {
    onTasks(JSON.parse(localStorage.getItem("tasks")));
  }

  function onTrashTodo(id) {
    const newTasks = [...tasks];
    newTasks.splice(id, 1);
    onTasks(newTasks);

    localStorage.setItem("tasks", JSON.stringify(newTasks));

    request("http://localhost:5000/api/settasks", "POST", true, {
      tasks: newTasks,
    });
  }

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
        todoTitle,
        onTodoTitle,
        todoDateTime,
        onTodoDateTime,
        todoError,
        onTodoError,
        editing,
        onEditing,
        readOnly,
        onReadOnly,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };
