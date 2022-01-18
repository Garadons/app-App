import React, {useState, createContext} from "react";

import {parseDateTimeInput} from '../Utils'

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
}

function onTodoChange(tasks, onTasks, todoValue, id) {
  const newTasks = [...tasks];
  const newTodoTask = { ...newTasks[id] };
  newTodoTask.value = todoValue;
  newTasks[id] = newTodoTask;
  onTasks(newTasks);
}

function onDone(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function onClose(onTasks) {
  onTasks(JSON.parse(localStorage.getItem("tasks")));
}

function onTrashTodo(id, tasks, onTasks) {
  const newTasks = [...tasks];
  newTasks.splice(id, 1);
  onTasks(newTasks);

  localStorage.setItem("tasks", JSON.stringify(newTasks));
}

const TasksProvider = (props) => {
  const [tasks, onTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

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
      onTrashTodo
    }}
  >
    {props.children}
  </TasksContext.Provider>
);
}

export {TasksContext, TasksProvider};