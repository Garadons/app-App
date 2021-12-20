import React from "react";

// Многоразовая кастомная кнопка

function Button(props) {
  const { value, isActive } = props;
  const classNames = isActive ? "button active" : "button";

  return <button className={classNames}>{value}</button>;
}

export default Button;
