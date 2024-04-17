import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useContext(NewsContext) || {};

  if (!currentUser?.isAdmin) return <Navigate to="/"></Navigate>;

  return <div>Welcome Admin {currentUser.firstName}</div>;
}
