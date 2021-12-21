import React from "react";
import { Link } from "react-router-dom";

// Многоразовая кастомная кнопка

function Button(props) {
  const { value, isActive, to } = props;
  const classNames = isActive ? "button active" : "button";

  return (
    <Link to={to}>
      <button className={classNames}>{value}</button>
    </Link>
  );
}

export default Button;
