import React from "react";
import { useFormik } from "formik";

import auth from "../../firebase-config";

import { signInWithEmailAndPassword } from "firebase/auth";

import {
  Input,
  BtnGroup,
  Button,
  SubmitButton,
  SocialNetworks,
  SocialIcon,
  Form,
} from "../common";

import "./LogInForm.css";

import facebook from "../../img/facebook.png";
import google from "../../img/google.png";
import instagram from "../../img/instagram.png";
import linkedin from "../../img/linkedin.png";
import mainFormImg from "../../img/loginFormImg.png";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 or more";
  } else if (values.password.length > 15) {
    errors.password = "Must be 15 or less";
  }

  return errors;
};

function LogInForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async ({ email, password }) => {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
        console.log("done");
      } catch (error) {
        console.log(error.message);
      }
    },
  });

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
            id="email"
            name="email"
            type="text"
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
