import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import APNavbar from "../components/AdminPanel/APNavbar/APNavbar";
import APSidebar from "../components/AdminPanel/APSidebar/APSidebar";

export default function AdminPanel() {
  const { currentUser } = useContext(NewsContext) || {};

  if (!currentUser?.isAdmin) return <Navigate to="/"></Navigate>;

  return (
    <div className="w-full h-[100dvh] bg-neutral-200 flex overflow-hidden">
      <APSidebar />
      <div className="w-full h-full flex flex-col">
        <APNavbar />
        <div className="w-full h-full flex justify-start items-start p-5 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
