import React, { useContext } from "react";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";

import { AuthorizedContext } from "../../Context/AuthorizedProvider";

import request from "../../Api/Services/request";

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

import facebook from "../../Img/facebook.png";
import google from "../../Img/google.png";
import instagram from "../../Img/instagram.png";
import linkedin from "../../Img/linkedin.png";
import mainFormImg from "../../Img/loginFormImg.png";

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
  const { authorized, setAuthorized } = useContext(AuthorizedContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async ({ email, password }) => {
      try {
        const responce = await request(
          "http://localhost:5000/api/signin",
          "POST",
          {
            email,
            password,
          }
        );

        const data = await responce.json();

        localStorage.setItem("accessToken", data.token);

        if (!responce.ok) {
          throw new Error(data);
        }

        setAuthorized(true);
      } catch (error) {
        alert(error.message);
      }
    },
  });

  if (authorized) {
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
            <SubmitButton value="Sign In" isActive />
          </BtnGroup>
        </Form>
      </div>
      <img src={mainFormImg} className="formImg" />
    </div>
  );
}

export default LogInForm;
