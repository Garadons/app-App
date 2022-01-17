import React, { useContext } from "react";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";

import auth from "../../Configs/firebase-config";

import authorizedContext from "../../Context/AuthorizedProvider";

import "./SignUpForm.css";

import {
  Input,
  BtnGroup,
  Button,
  SubmitButton,
  SocialNetworks,
  SocialIcon,
  Form,
  FormCheckBox,
} from "../common";

import facebook from "../../Img/facebook.png";
import google from "../../Img/google.png";
import instagram from "../../Img/instagram.png";
import linkedin from "../../Img/linkedin.png";
import mainFormImg from "../../Img/loginFormImg.png";

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
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 or more";
  } else if (values.password.length > 15) {
    errors.password = "Must be 15 or less";
  }

  return errors;
};

function SignUpForm() {
  const { authorized, setAuthorized } = useContext(authorizedContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async ({ email, password }) => {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setAuthorized(auth.currentUser);
      } catch (error) {
        alert(error.message);
      }
    },
  });

  if (authorized) {
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
