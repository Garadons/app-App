import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

// Многоразовая кастомная кнопка

function Button(props) {
  const { value, to, isActive, isAdaptive, ...otherProps } = props;
  let classNames = isActive ? "button active" : "button";
  classNames += isAdaptive ? " buttonAdaptive" : "";
  return (
    <Link to={to}>
      <button {...otherProps} className={classNames}>
        {value}
      </button>
    </Link>
  );
}

export default Button;
