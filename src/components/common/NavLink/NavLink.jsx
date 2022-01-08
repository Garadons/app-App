import React from "react";
import { Link } from "react-router-dom";

import "./NavLink.css";

function NavLink(props) {
  const { icon, title, to, isActive, onClick } = props;
  const className = isActive ? "navLink active" : "navLink";
  return (
    <Link to={to} onClick={onClick} className="navLinkLink">
      <div className={className}>
        <img src={icon} className="navLinkImg" alt="#" />
        <p className="navLinkTitle">{title}</p>
      </div>
    </Link>
  );
}

export default NavLink;
