import React from "react";

import "./SubmitButton.css";

function SubmitButton(props) {
  const { value, isActive } = props;
  const classNames = isActive ? "button active" : "button";

  return <input type="submit" value={value} className={classNames} />;
}

export default SubmitButton;
