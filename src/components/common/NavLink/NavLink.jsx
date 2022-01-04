import React from "react";

import "./NavLink.css";

function NavLink(props) {
  const { icon, title, isActive } = props;
  const className = isActive ? "navLink active" : "navLink";
  return (
    <a href="#" className={className}>
      <img src={icon} className="navLinkImg" alt="#" />
      <p className="navLinkTitle">{title}</p>
    </a>
  );
}

export default NavLink;
