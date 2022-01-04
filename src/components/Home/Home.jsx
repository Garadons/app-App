import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Button from "../common/Button";
import LogOutImg from "../common/LogOutImg";
import TodoTask from "../common/TodoTask";

import "./Home.css";

import logo from "../../img/logo.png";
import add from "../../img/add.png";
import home from "../../img/home.png";
import info from "../../img/info.png";
import writing from "../../img/writing.png";
import telephone from "../../img/telephone.png";

function logOut() {
  localStorage.setItem("authorized", false);
}

function onTodoAdd(tasks, onTasks, todoTitle, onTodoTitle, onTodoError) {
  // Клонируем tasks и добавляем новый элемент в клон после чего мы обновляем состояние tasks
  if (todoTitle.trim() !== "") {
    const newTasks = [...tasks];
    newTasks.push({ value: todoTitle, done: false });
    onTasks(newTasks);
    onTodoError(false);

    localStorage.setItem("tasks", JSON.stringify(newTasks));

    // Очищаем input
    onTodoTitle("");
  } else {
    onTodoError(true);
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
  const [todoError, onTodoError] = useState(false);
  const [editing, onEditing] = useState(false);

  const [redirect, onRedirect] = useState(
    JSON.parse(localStorage.getItem("authorized"))
  );

  if (!redirect) {
    return <Redirect to="/signin" />;
  }

  const { tasks, onTasks } = props;
  return (
    <div className="body">
      <div className="header">
        <img src={logo} className="logo" />
        <div className="navLinks">
          <a href="#" className="navLink">
            <img src={info} className="navLinkImg" alt="#" />
            <p className="navLinkTitle">About</p>
          </a>
          <a href="#" className="navLink active">
            <img src={home} className="navLinkImg" alt="#" />
            <p className="navLinkTitle">Home</p>
          </a>
          <a href="#" className="navLink">
            <img src={writing} className="navLinkImg" alt="#" />
            <p className="navLinkTitle">Example</p>
          </a>
          <a href="#" className="navLink">
            <img src={telephone} className="navLinkImg" alt="#" />
            <p className="navLinkTitle">Contact</p>
          </a>
          <div className="logOutImgTurnOn">
            <LogOutImg onClick={logOut} to="signin" />
          </div>
        </div>
        <div className="logOutButton">
          <Button onClick={logOut} value="Log Out" to="signin" isActive />
        </div>
      </div>
      <div className="container">
        <div className="toDoHeader">
          <h2 className="toDoTitle">My todo list</h2>
          <div className="toDoMessage toDoMessage-small">
            <input
              onChange={(e) => {
                onTodoTitle(e.target.value);
                onTodoError(false);
              }}
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
          {tasks.map((t, id) => (
            // <div className="toDoMessage" key={i}>
            //   <input
            //     type="text"
            //     onChange={(e) => onChangeTodo(e.target.value)}
            //     value={t.value}
            //   />
            //   <div className="toDoButtons">
            //     <button>
            //       <img src={pencil} />
            //     </button>
            //     <button onClick={() => onTrashTodo(i, tasks, onTasks)}>
            //       <img src={trash} />
            //     </button>
            //     <button >
            //       <img src={done} />
            //     </button>
            //   </div>
            // </div>
            <TodoTask
              value={t.value}
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
