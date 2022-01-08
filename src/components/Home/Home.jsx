import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import {
  Button,
  LogOutImg,
  TodoTask,
  NavLink,
  Logo,
  NavLinks,
} from "../common";

import "./Home.css";

import add from "../../img/add.png";

function PretendZero(value) {
  if (value < 10) {
    value = "0" + value;
  }
  return value;
}

function dateNow() {
  const dateNow = new Date(Date.now());

  let date;
  date = dateNow.getFullYear();
  date += "-" + PretendZero(dateNow.getMonth() + 1);
  date += "-" + PretendZero(dateNow.getDay() + 2);
  date += "T" + PretendZero(dateNow.getHours());
  date += ":" + PretendZero(dateNow.getMinutes());
  return date;
}

function parseDateTimeInput(dataTime) {
  console.log(dateNow());
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayNames = ["Sun", "Tue", "Wed", "Thu", "Fri", "Sat", "Mon"];

  const dateDataTime = new Date(dataTime);

  let date = monthNames[dateDataTime.getMonth()];
  date += " " + dateDataTime.getDay();
  date += " " + dayNames[dateDataTime.getDay()];
  date += " " + dateDataTime.getHours();
  date += ":" + dateDataTime.getMinutes();

  return date;
}

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

function isDone(id, onTasks, tasks) {
  const newTasks = [...tasks];
  const newTodoTask = { ...newTasks[id] };
  newTodoTask.done = true;
  newTasks[id] = newTodoTask;
  onTasks(newTasks);

  localStorage.setItem("tasks", JSON.stringify(newTasks));
}

function Home(props) {
  const [todoTitle, onTodoTitle] = useState("");
  const [todoDateTime, onTodoDateTime] = useState(dateNow());
  const [todoError, onTodoError] = useState(false);
  const [editing, onEditing] = useState(false);

  const redirect = JSON.parse(localStorage.getItem("authorized"));

  if (!redirect) {
    return <Redirect to="/signin" />;
  }

  const { tasks, onTasks } = props;

  return (
    <div className="body">
      <div className="container">
        <div className="toDoHeader">
          <h2 className="toDoTitle">My todo list</h2>
          <div className="toDoHeaderInputs">
            <div className="toDoMessage toDoMessage-small">
              <input
                type="datetime-local"
                onChange={(e) => {
                  onTodoDateTime(e.target.value);
                }}
                value={todoDateTime}
                min={dateNow()}
              />
            </div>
            <div className="toDoMessage toDoMessage-medium">
              <input
                onChange={(e) => {
                  onTodoTitle(e.target.value);
                  onTodoError(false);
                }}
                type="text"
                placeholder="Title for new todo"
                value={todoTitle}
                min={""}
              />
              {!todoError == false && (
                <div className="todoError">{todoError}</div>
              )}
              <div className="toDoButtons">
                <button
                  onClick={() =>
                    onTodoAdd(
                      tasks,
                      onTasks,
                      todoTitle,
                      todoDateTime,
                      onTodoTitle,
                      onTodoError,
                      onTodoDateTime
                    )
                  }
                >
                  <img src={add} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="toDoList">
          {tasks.map((t, id) => (
            <TodoTask
              value={t.value}
              date={t.date}
              done={t.done}
              key={id}
              onTrashTodo={() => onTrashTodo(id, tasks, onTasks)}
              onTodoChange={(todoValue) =>
                onTodoChange(tasks, onTasks, todoValue, id)
              }
              onDone={() => onDone(tasks)}
              onClose={() => onClose(onTasks)}
              isDone={() => isDone(id, onTasks, tasks)}
              editing={editing}
              onEditing={onEditing}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
