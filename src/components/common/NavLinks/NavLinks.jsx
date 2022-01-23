import React, { useContext } from "react";

import { LogOutImg, NavLink, Logo, Button } from "../";
import home from "../../../Img/home.png";
import about from "../../../Img/about.png";
import example from "../../../Img/example.png";
import contact from "../../../Img/contact.png";

import { AuthorizedContext } from "../../../Context/AuthorizedProvider";

import "./NavLinks.css";

async function logOut(setAuthorized) {
  localStorage.setItem("currentPage", 1);
  localStorage.removeItem("accessToken");
  setAuthorized(false);
}

const linksArray = [
  { icon: about, title: "Dogs", to: "/dogs" },
  { icon: home, title: "Home", to: "/home" },
  { icon: example, title: "Example", to: "#" },
  { icon: contact, title: "Contact", to: "#" },
];

function NavLinks(props) {
  const { active, setActive } = props;

  const { setAuthorized } = useContext(AuthorizedContext);

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
        onClick={() => logOut(setAuthorized)}
        value="Log Out"
        to="signin"
        isActive
        isAdaptive
      />
    </div>
  );
}

export default NavLinks;
