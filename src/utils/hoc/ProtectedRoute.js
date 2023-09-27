import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetCookie } from "../hooks/useGetCookie";

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  //token
  if (!useGetCookie()) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};
