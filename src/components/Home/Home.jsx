import React, { useState, useContext } from "react";

import { TasksContext } from "../../Context/TasksProvider";

import { TodoTask } from "../common";

import { dateNow } from "../../Utils";

import "./Home.css";

import add from "../../Img/add.png";

function Home() {
  const [todoTitle, onTodoTitle] = useState("");
  const [todoDateTime, onTodoDateTime] = useState(dateNow());
  const [todoError, onTodoError] = useState(false);
  const [editing, onEditing] = useState(false);

  const {
    tasks,
    onTasks,
    onTodoAdd,
    isDone,
    onTodoChange,
    onDone,
    onClose,
    onTrashTodo,
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
    </>
  );
}

export default Home;
