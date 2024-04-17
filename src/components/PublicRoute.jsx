import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const useAuth = () => {
  const user = localStorage.getItem("token");
  if (user) {
    return true;
  } else {
    return false;
  }
};

const PublicRoute = (props) => {
  const auth = useAuth();
  return auth ?<Navigate to="/dashboard" />: <Outlet />
};

export default PublicRoute;
