import React, { useContext, useState } from "react";

import pencil from "../../../Img/pencil.png";
import doneIcon from "../../../Img/done.png";
import trash from "../../../Img/trash.png";
import close from "../../../Img/close.png";

import "./TodoTask.css";
import { TasksContext } from "../../../Context/TasksProvider";

function TodoTask(props) {
  const { value, date, done, onTrashTodo, onTodoChange, isDone } = props;
  const { onDone, onClose, editing, onEditing, readOnly, onReadOnly } =
    useContext(TasksContext);

  return (
    <div className={done ? "toDoMessage toDoMessage-done" : "toDoMessage"}>
      <div className="date">{date}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onTodoChange(e.target.value);
        }}
        readOnly={readOnly ? true : null}
      />
      {readOnly && !done && (
        <div className="toDoButtons">
          {!editing && (
            <button>
              <img
                src={pencil}
                onClick={() => {
                  onReadOnly(false);
                  onEditing(true);
                }}
              />
            </button>
          )}

          <button onClick={onTrashTodo}>
            <img src={trash} />
          </button>
          <button>
            <img
              src={doneIcon}
              onClick={() => {
                isDone();
              }}
            />
          </button>
        </div>
      )}
      {!readOnly && (
        <div className="toDoButtons">
          <button
            onClick={() => {
              onReadOnly(true);
              onDone(true);
              onEditing(false);
            }}
          >
            <img src={doneIcon} />
          </button>
          <button
            onClick={() => {
              onReadOnly(true);
              onClose();
              onEditing(false);
            }}
          >
            <img src={close} />
          </button>
        </div>
      )}
      {done && (
        <div className="toDoButtons">
          <button onClick={onTrashTodo}>
            <img src={trash} />
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoTask;
