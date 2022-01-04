import React, { useState } from "react";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";

import "./SignUpForm.css";

import Input from "../common/Input";
import BtnGroup from "../common/BtnGroup";
import Button from "../common/Button";
import SubmitButton from "../common/SubmitButton";
import SocialNetworks from "../common/SocialNetworks";
import SocialIcon from "../common/SocialIcon";
import FormCheckBox from "../common/FormCheckBox";
import Form from "../common/Form/Form";

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

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
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

function SignUpForm() {
  const [redirect, onRedirect] = useState(
    JSON.parse(localStorage.getItem("authorized"))
  );

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
    <div className="signUpForm">
      <div className="formContainer">
        <h2 className="formTitle">Create account</h2>
        <SocialNetworks>
          <SocialIcon icon={facebook} link="#" />
          <SocialIcon icon={google} link="#" />
          <SocialIcon icon={instagram} link="#" />
          <SocialIcon icon={linkedin} link="#" />
        </SocialNetworks>
        <span className="formLable">or use your email for registration:</span>
        <Form onSubmit={formik.handleSubmit} action="#">
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && (
            <div className="errorForm">{formik.errors.name}</div>
          )}
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <div className="errorForm">{formik.errors.email}</div>
          )}
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && (
            <div className="errorForm">{formik.errors.password}</div>
          )}
          <FormCheckBox>
            I agree with <a href="#"> Terms </a> and
            <a href="#"> Privat Police </a>
          </FormCheckBox>
          <BtnGroup>
            <SubmitButton value="Sign Up" isActive />
            <Button value="Sign In" to="signin" />
          </BtnGroup>
        </Form>
      </div>
      <img src={mainFormImg} className="formImg" />
    </div>
  );
}

export default SignUpForm;
