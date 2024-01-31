// Login.tsx
import React, { useState } from "react";
import styles from "./Login.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useHttpRequest from "../hooks/useHttpRequest";
import { HttpRequest } from "../hooks/useHttpRequest";
import { UseDispatch, useDispatch } from "react-redux";
import { setUser } from "../store/authSlice"; 
import Loader from "./Loader";
import toastr from "toastr";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name is Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
});

const Signup: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const {
    loading,
    error,
    sendRequest: signUpUser,
  } = useHttpRequest(transformSignUpData);

  const handleSignup = (values: any) => {
    const httpRequest: HttpRequest = {
      url: `${process.env.NEXT_PUBLIC_API_URL}users/register`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    };

    signUpUser(httpRequest);
  };

  function transformSignUpData(data: any) {
    console.log("registered user", data)
    if (data.status === "ok") {
      toastr.success(data.message, "Success");
      //@ts-ignore
      dispatch(setUser(data.data))
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className={styles.loginForm}>
        <h2
          className="text-center"
          style={{
            marginTop: "0px",
          }}
        >
          Signup
        </h2>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            handleSignup(values);
            // console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.loginInput}>
                <label htmlFor="firstName" className={styles.loginLabel}>
                  First Name
                </label>
                <Field
                  name="firstName"
                  id="firstName"
                  placeholder="Enter First Name"
                  className={styles.textInput}
                />
                {errors.firstName && touched.firstName ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginTop: "10px",
                    }}
                  >
                    {errors.firstName}
                  </div>
                ) : null}
              </div>
              <div className={styles.loginInput}>
                <label htmlFor="lastName" className={styles.loginLabel}>
                  Last Name
                </label>
                <Field
                  name="lastName"
                  id="lastName"
                  placeholder="Enter Last Name"
                  className={styles.textInput}
                />
                {errors.lastName && touched.lastName ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginTop: "10px",
                    }}
                  >
                    {errors.lastName}
                  </div>
                ) : null}
              </div>
              <div className={styles.loginInput}>
                <label htmlFor="email" className={styles.loginLabel}>
                  Email Address
                </label>
                <Field
                  placeholder="Enter Email Address"
                  name="email"
                  id="email"
                  type="email"
                  className={styles.textInput}
                />
                {errors.email && touched.email ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginTop: "10px",
                    }}
                  >
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <div className={styles.loginInput}>
                <label htmlFor="password" className={styles.loginLabel}>
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  className={styles.textInput}
                />
                {errors.password && touched.password ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginTop: "10px",
                    }}
                  >
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <div className={styles.midBtn}>
                <button type="submit" className={styles.loginBtn}>
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Signup;
