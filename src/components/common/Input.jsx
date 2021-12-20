import React from "react";

// Кастомные многоразовые импуты

function Input(props) {
  const { type, placeholder, isRequired } = props;

  return (
    <div className="formInput">
      <input type={type} placeholder={placeholder} required={isRequired} />
    </div>
  );
}

export default Input;
