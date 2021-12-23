import React, { useState } from "react";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";

import Input from "../common/Input";
import BtnGroup from "../common/BtnGroup";
import Button from "../common/Button";
import SubmitButton from "../common/SubmitButton";
import SocialNetworks from "../common/SocialNetworks";
import SocialIcon from "../common/SocialIcon";
import Form from "../common/Form/Form";

import "./LogInForm.css";

import facebook from "../../img/facebook.png";
import google from "../../img/google.png";
import instagram from "../../img/instagram.png";
import linkedin from "../../img/linkedin.png";
import mainFormImg from "../../img/loginFormImg.png";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 2) {
    errors.name = "Must be 2 or more";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 or less";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.name.password < 2) {
    errors.name = "Must be 2 or more";
  } else if (values.name.password > 15) {
    errors.name = "Must be 15 or less";
  }

  return errors;
};

function LogInForm() {
  // const [redirect, onRedirect] = useState(localStorage.getItem("authorized"));
  const [redirect, onRedirect] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: () => {
      onRedirect(true);
      localStorage.setItem("authorized", true);
    },
  });

  if (redirect) {
    return <Redirect to="/home" />;
  }

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
        <Form onSubmit={formik.handleSubmit} action="#">
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && <div>{formik.errors.name}</div>}
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && <div>{formik.errors.password}</div>}
          <BtnGroup>
            <Button value="Sign Up" to="/signup" />
            <SubmitButton value="Sign In" to="/home" isActive />
          </BtnGroup>
        </Form>
      </div>
      <img src={mainFormImg} className="formImg" />
    </div>
  );
}

export default LogInForm;
