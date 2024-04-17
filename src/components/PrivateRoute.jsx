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

const PrivateRoute = (props) => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
