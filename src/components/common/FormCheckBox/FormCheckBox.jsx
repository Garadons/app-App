import React from "react";

import "./FormCheckBox.css";

// Чекбокс с тектом для подтверждения  Terms и Privat Police

function FormCheckBox(props) {
  return (
    <label className="formCheckBox">
      <input type="checkbox" required />
      <span className="formLable">{props.children}</span>
    </label>
  );
}

export default FormCheckBox;
