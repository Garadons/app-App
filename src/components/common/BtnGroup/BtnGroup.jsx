import React from "react";

//Многоразовый контэйнер для кнопок

function BtnGroup(props) {
  return <div className="btnGroup">{props.children}</div>;
}

export default BtnGroup;
