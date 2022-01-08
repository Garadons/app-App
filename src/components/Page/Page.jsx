import React from "react";

import { NavLinks } from "../common";

import "./Page.css";

function Page(props) {
  const { content, active, setActive } = props;

  console.log(active);
  return (
    <div className="body">
      <NavLinks active={active} setActive={setActive} />
      {content()}
    </div>
  );
}

export default Page;
