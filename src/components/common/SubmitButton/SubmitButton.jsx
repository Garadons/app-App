import React from "react";
import { Link } from "react-router-dom";

import "./SubmitButton.css";

function SubmitButton(props) {
  const { value, isActive, to } = props;
  const classNames = isActive ? "button active" : "button";

  return (
    <Link to={to}>
      <input type="submit" value={value} className={classNames} />{" "}
    </Link>
  );
}

export default SubmitButton;
