import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import { Link, Navigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useContext(NewsContext) || {};

  if (!currentUser?.isAdmin) return <Navigate to="/"></Navigate>;

  return (
    <div className="w-full h-screen flex flex-col justify-between p-5">
      <div> Welcome Admin {currentUser.firstName}</div>
      <div>
        <Link
          to="/"
          className="border-2 border-black px-6 py-2 rounded-md text-black hover:bg-black hover:text-white transition-colors "
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
