import React, { useEffect, useState } from "react";

import { Button, LogOutImg, NavLink, Logo, NavLinks } from "../common";

import home from "../../img/home.png";
import about from "../../img/about.png";
import example from "../../img/example.png";
import contact from "../../img/contact.png";

import "./Dogs.css";

function logOut() {
  localStorage.setItem("authorized", false);
}

function Dogs() {
  const [dogsArray, setDogsArray] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random/9")
      .then((response) => response.json())
      .then((data) => {
        if (data.status != "success") {
          throw Error("Server error");
        }
        return data;
      })
      .then((data) => {
        setDogsArray(data.message);
      })
      .catch((e) => {
        alert(e);
      });
    return () => {};
  }, []);
  return (
    <div className="body">
      <div className="header">
        <Logo />
        <NavLinks>
          <NavLink icon={about} title={"Dogs"} to="/dogs" isActive />
          <NavLink icon={home} title={"Home"} to="/home" />
          <NavLink icon={example} title={"Example"} to="#" />
          <NavLink icon={contact} title={"Contact"} to="#" />
          <LogOutImg onClick={logOut} to="signin" />
        </NavLinks>
        <Button
          onClick={logOut}
          value="Log Out"
          to="signin"
          isActive
          isAdaptive
        />
      </div>
      <div className="dogContainer">
        {dogsArray &&
          dogsArray.map((t, id) => (
            <div className="dogImgContainer" key={id}>
              <img className="dogImg" src={t} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dogs;
