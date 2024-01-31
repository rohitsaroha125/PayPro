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
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const {loading, error, sendRequest:loginUser} = useHttpRequest(transformData)

  function transformData(data:any) {
    if (data.status === "ok") {
      if (data.status === "ok") {
        toastr.success(data.message, "Success");
        //@ts-ignore
        dispatch(setUser(data.data))
      }
    }
  }

  const handleLogin = (values: any) => {
    const httpRequest: HttpRequest = {
      url: `${process.env.NEXT_PUBLIC_API_URL}users/login`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    };

    loginUser(httpRequest);
  };

  return (
    <div className={styles.loginForm}>
      <h2 className="text-center" style={{
        marginTop:'0px'
      }}>Login</h2>
      <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            handleLogin(values);
            // console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
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
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
    </div>
  );
};

export default Login;
