import React, { useContext } from "react";
import { NewsContext } from "../../context/NewsContext";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useContext(NewsContext) || {};
  return user ? children : <Navigate to="/"></Navigate>;
}
