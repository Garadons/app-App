import React, { useState } from "react";

import { LogOutImg, NavLink, Logo, Button } from "../";
import home from "../../../img/home.png";
import about from "../../../img/about.png";
import example from "../../../img/example.png";
import contact from "../../../img/contact.png";

import "./NavLinks.css";

function logOut() {
  localStorage.setItem("authorized", false);
  localStorage.setItem("currentPage", 1);
}

const linksArray = [
  { icon: about, title: "Dogs", to: "/dogs" },
  { icon: home, title: "Home", to: "/home" },
  { icon: example, title: "Example", to: "#" },
  { icon: contact, title: "Contact", to: "#" },
];

function NavLinks(props) {
  const { active, setActive } = props;

  return (
    <div className="header">
      <Logo />
      <div className="navLinks">
        {linksArray.map((link, id) => (
          <NavLink
            key={id}
            {...link}
            onClick={() => {
              setActive(id);
              localStorage.setItem("currentPage", id);
            }}
            isActive={localStorage.getItem("currentPage") == id ? true : false}
          />
        ))}
        <LogOutImg onClick={logOut} to="signin" />
      </div>
      <Button
        onClick={logOut}
        value="Log Out"
        to="signin"
        isActive
        isAdaptive
      />
    </div>
  );
}

export default NavLinks;
