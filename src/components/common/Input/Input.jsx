import React from "react";

import "./Input.css";

function Input(props) {
  return (
    <div className="formInput">
      <input {...props} />
    </div>
  );
}

export default Input;
