import React from "react";

import "./Input.css";

function Input(props) {
  const { type, placeholder, isRequired } = props;

  return (
    <div className="formInput">
      <input type={type} placeholder={placeholder} required={isRequired} />
    </div>
  );
}

export default Input;
