import React, { useState } from "react";

import pencil from "../../../img/pencil.png";
import doneIcon from "../../../img/done.png";
import trash from "../../../img/trash.png";
import close from "../../../img/close.png";

import "./TodoTask.css";

function TodoTask(props) {
  const {
    value,
    date,
    done,
    onTrashTodo,
    onTodoChange,
    onDone,
    onClose,
    isDone,
    editing,
    onEditing,
  } = props;

  const [readOnly, onReadOnly] = useState(true);

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
