import React from "react";

import Input from "../common/Input";
import BtnGroup from "../common/BtnGroup";
import Button from "../common/Button";
import SubmitButton from "../common/SubmitButton";
import SocialNetworks from "../common/SocialNetworks";
import SocialIcon from "../common/SocialIcon";
import FormCheckBox from "../common/FormCheckBox";
import Form from "../common/Form/Form";

import "./LogInForm.css";

import facebook from "../../img/facebook.png";
import google from "../../img/google.png";
import instagram from "../../img/instagram.png";
import linkedin from "../../img/linkedin.png";
import mainFormImg from "../../img/loginFormImg.png";

function LogInForm() {
  return (
    <div className="logInForm">
      <div className="formContainer">
        <h2 className="formTitle">Enter account</h2>
        <SocialNetworks>
          <SocialIcon icon={facebook} link="#" />
          <SocialIcon icon={google} link="#" />
          <SocialIcon icon={instagram} link="#" />
          <SocialIcon icon={linkedin} link="#" />
        </SocialNetworks>
        <span className="formLable">or use your email for login:</span>
        <Form action="#">
          <Input type="text" placeholder="Name" isRequired />
          <Input type="password" placeholder="Password" isRequired />
          <BtnGroup>
            <Button value="Sign Up" to="/signup" />
            <SubmitButton value="Sign In" isActive />
          </BtnGroup>
        </Form>
      </div>
      <img src={mainFormImg} className="formImg" />
    </div>
  );
}

export default LogInForm;
