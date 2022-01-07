import React from "react";
import { Link } from "react-router-dom";

import "./NavLink.css";

function NavLink(props) {
  const { icon, title, to, isActive } = props;
  const className = isActive ? "navLink active" : "navLink";
  return (
    <Link to={to} className="navLinkLink">
      <div className={className}>
        <img src={icon} className="navLinkImg" alt="#" />
        <p className="navLinkTitle">{title}</p>
      </div>
    </Link>
  );
}

export default NavLink;
