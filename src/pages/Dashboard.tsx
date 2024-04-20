import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import { Link, Navigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useContext(NewsContext) || {};

  if (!currentUser?.isAdmin) return <Navigate to="/"></Navigate>;

  return (
    <div className="w-full h-screen flex flex-col justify-between p-5 md:p-0">
      <div> Welcome Admin {currentUser.firstName}</div>
      <div>
        <Link to="/">Back</Link>
      </div>
    </div>
  );
}
