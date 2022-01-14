import React from "react";

import {parseDateTimeInput} from '../Utils'

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

let taskscontext = ({onTodoAdd, isDone, onTodoChange, onDone, onClose, onTrashTodo});

export default React.createContext(taskscontext);