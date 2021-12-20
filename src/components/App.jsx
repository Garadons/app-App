import React from "react";

import Input from "./common/Input";
import BtnGroup from "./common/BtnGroup";
import Button from "./common/Button";
import SubmitButton from "./common/SubmitButton";
import SocialNetworks from "./common/SocialNetworks";
import SocialIcon from "./common/SociaIcon";
import FormCheckBox from "./common/FormCheckBox";
import Form from "./common/Form";

import facebook from "../img/facebook.png";
import google from "../img/google.png";
import instagram from "../img/instagram.png";
import linkedin from "../img/linkedin.png";
import mainFormImg from "../img/mainFormImage2.png";

function App() {
  return (
    <div className="app">
      <div className="formContainer">
        <h2 className="formTitle">Create account</h2>
        <SocialNetworks>
          <SocialIcon icon={facebook} link="#" />
          <SocialIcon icon={google} link="#" />
          <SocialIcon icon={instagram} link="#" />
          <SocialIcon icon={linkedin} link="#" />
        </SocialNetworks>
        <span className="formLable">or use your email for registration:</span>
        <Form action="#">
          <Input type="text" placeholder="Name" isRequired />
          <Input type="email" placeholder="Email" isRequired />
          <Input type="password" placeholder="Password" isRequired />
          <FormCheckBox>
            I agree with <a href="#"> Terms </a> and
            <a href="#"> Privat Police </a>
          </FormCheckBox>
          <BtnGroup>
            <SubmitButton value="Sign Up" isActive />
            <Button value="Sign In" />
          </BtnGroup>
        </Form>
      </div>
      <img src={mainFormImg} className="formImg" />
    </div>
  );
}

export default App;
