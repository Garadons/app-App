import React, { useState, useContext } from "react";

import { TasksContext } from "../../Context/TasksProvider";

import { TodoTask } from "../common";

import { dateNow } from "../../Utils";

import "./Home.css";

import add from "../../Img/add.png";

function Home() {
  const {
    tasks,
    onTodoAdd,
    todoTitle,
    todoDateTime,
    onTodoTitle,
    todoError,
    onTodoError,
    onTodoDateTime,
    onTrashTodo,
    onTodoChange,
    isDone,
  } = useContext(TasksContext);

  return (
    <>
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
                <button onClick={() => onTodoAdd()}>
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
              onTrashTodo={() => onTrashTodo(id)}
              onTodoChange={(todoValue) => onTodoChange(todoValue, id)}
              isDone={() => isDone(id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
