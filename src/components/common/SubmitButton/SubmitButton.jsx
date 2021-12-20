import React from "react";

//Многоразовая кастомная сабмит кнопка

function SubmitButton(props) {
  const { value, isActive } = props;
  const classNames = isActive ? "button active" : "button";

  return <input type="submit" value={value} className={classNames} />;
}

export default SubmitButton;
