import React, { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";

export default function Dashboard() {
  const { currentUser } = useContext(NewsContext) || {};

  if (!currentUser?.isAdmin) return <Navigate to="/"></Navigate>;

  return (
    <div className="w-full h-[100dvh] flex flex-col justify-start items-start overflow-hidden">
      <div className="w-full flex justify-between h-auto p-5 bg-white">
        <div>
          Welcome{" "}
          <span className="font-bold">
            {currentUser.firstName} {currentUser.lastName}
          </span>
        </div>
        <div>
          <Link to="/">Homepage</Link>
        </div>
      </div>
      <div className="w-full h-full flex">
        <div className="w-auto h-full bg-slate-800 flex flex-col p-2 gap-2">
          <Link
            to="/dashboard"
            className="text-white text-nowrap px-10 py-2 bg-slate-700 rounded-md"
          >
            Main page
          </Link>
          <Link
            to="/dashboard/create-article"
            className="text-white text-nowrap px-10 py-2 bg-slate-700 rounded-md"
          >
            Create article
          </Link>
        </div>

        <div className="w-full h-full p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
