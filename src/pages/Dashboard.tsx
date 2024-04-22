import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import { Link, Navigate } from "react-router-dom";
import CreateArticle from "../components/Dashboard/CreateArticle";

export default function Dashboard() {
  const { currentUser } = useContext(NewsContext) || {};

  if (!currentUser?.isAdmin) return <Navigate to="/"></Navigate>;

  return (
    <div className="w-full h-screen flex flex-col p-5 gap-10">
      <div>
        Welcome {currentUser.firstName}, back to <Link to="/">Homepage</Link>
      </div>
      <div>
        <CreateArticle user={currentUser} />
      </div>
    </div>
  );
}
