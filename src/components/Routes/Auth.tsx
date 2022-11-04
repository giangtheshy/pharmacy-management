import React from "react";
import ChangePassword from "../../pages/Auth/ChangePassword";
import ForgotPassword from "../../pages/Auth/ForgotPassword";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import RegisterSuccess from "../../pages/Auth/RegisterSuccess";
import VerifyAccount from "../../pages/Auth/VerifyAccount";
import LayoutLogin from "../Layout/LayoutLogin";

const routerAuth = [
  {
    path: "/login",
    element: (
      <LayoutLogin>
        <Login />
      </LayoutLogin>
    ),
  },
  {
    path: "/register",
    element: (
      <LayoutLogin>
        <Register />
      </LayoutLogin>
    ),
  },
  {
    path: "/verify-account",
    element: (
      <LayoutLogin>
        <VerifyAccount />
      </LayoutLogin>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <LayoutLogin>
        <ForgotPassword />
      </LayoutLogin>
    ),
  },
  {
    path: "/change-password",
    element: (
      <LayoutLogin>
        <ChangePassword />
      </LayoutLogin>
    ),
  },
  {
    path: "/register-success",
    element: (
      <LayoutLogin>
        <RegisterSuccess />
      </LayoutLogin>
    ),
  },
];

export default routerAuth;
