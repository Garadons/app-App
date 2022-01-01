import React, { useState } from "react";

import Button from "../common/Button";

import "./Home.css";

import logo from "../../img/logo.png";
import pencil from "../../img/pencil.png";
import trash from "../../img/trash.png";
import add from "../../img/add.png";

function logOut() {
  localStorage.clear();
}

function onTodoAdd(tasks, onTasks, todoTitle, onTodoTitle, onTodoError) {
  // Клонируем tasks и добавляем новый элемент в клон после чего мы обновляем состояние tasks
  if (todoTitle.trim() !== "") {
    const newTasks = [...tasks];
    newTasks.push({ value: todoTitle });
    onTasks(newTasks);
    onTodoError(false);

    localStorage.setItem("tasks", JSON.stringify(newTasks));

    // Очищаем input
    onTodoTitle("");
  } else {
    onTodoError(true);
  }
}

function onTrashTodo(i, tasks, onTasks) {
  const newTasks = [...tasks];
  newTasks.splice(i, 1);
  onTasks(newTasks);

  localStorage.setItem("tasks", JSON.stringify(newTasks));
}

function Home(props) {
  const [todoTitle, onTodoTitle] = useState("");
  const [todoError, onTodoError] = useState(false);
  const { tasks, onTasks } = props;

  return (
    <div className="body">
      <div className="header">
        <img src={logo} className="logo" />
        <div className="navLinks">
          <a href="#" className="navLink active">
            Home
          </a>
          <a href="#" className="navLink">
            About
          </a>
          <a href="#" className="navLink">
            Example
          </a>
          <a href="#" className="navLink">
            Contact
          </a>
        </div>

        <Button onClick={logOut} value="Log Out" to="signin" isActive />
      </div>
      <div className="container">
        <div className="toDoHeader">
          <h2 className="toDoTitle">My todo list</h2>
          <div className="toDoMessage toDoMessage-small">
            <input
              onChange={(e) => onTodoTitle(e.target.value)}
              type="text"
              placeholder="Title for new todo"
              value={todoTitle}
            />
            {todoError && <div className="todoError">Required</div>}
            <div className="toDoButtons">
              <button
                onClick={() =>
                  onTodoAdd(tasks, onTasks, todoTitle, onTodoTitle, onTodoError)
                }
              >
                <img src={add} />
              </button>
            </div>
          </div>
        </div>
        <div className="toDoList">
          {/* Делаем шаблон для toDoMessage */}
          {tasks.map((t, i) => (
            <div className="toDoMessage" key={i}>
              <input type="text" value={t.value} readOnly />
              <div className="toDoButtons">
                <button>
                  <img src={pencil} />
                </button>
                <button onClick={() => onTrashTodo(i, tasks, onTasks)}>
                  <img src={trash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
