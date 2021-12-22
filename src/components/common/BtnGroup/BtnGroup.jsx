import React from "react";

import "./BtnGroup.css";

//Многоразовый контэйнер для кнопок

function BtnGroup(props) {
  return <div className="btnGroup">{props.children}</div>;
}

export default BtnGroup;
