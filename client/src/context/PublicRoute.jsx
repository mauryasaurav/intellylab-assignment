import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = ({ redirectTo }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to={redirectTo ?? "/"} />;
  }

  return <Outlet />;
};

export default PublicRoute;
