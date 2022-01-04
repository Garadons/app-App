import React from "react";
import { Link } from "react-router-dom";

import logout from "../../../img/logout.png";

import "./LogOutImg.css";

function LogOutImg(props) {
  const { to, ...otherProps } = props;

  return (
    <div className="logOutImgTurnOn">
      <div className="logOutImgContainer">
        <Link to={to}>
          <img className="logOutImg" src={logout} {...otherProps} alt="#" />
        </Link>
      </div>
    </div>
  );
}

export default LogOutImg;
