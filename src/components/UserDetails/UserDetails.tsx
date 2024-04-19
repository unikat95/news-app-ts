import React, { useContext } from "react";
import { NewsContext } from "../../context/NewsContext";
import UserDetail from "../UserDetail/UserDetail";

export default function UserDetails() {
  const { currentUser } = useContext(NewsContext) || {};
  return (
    <>
      <div className="w-40 h-40 bg-blue-400 border-8 border-slate-100 rounded-full flex justify-center items-center text-6xl font-bold text-white">
        {currentUser?.firstName.slice(0, 1).toUpperCase()}
        {currentUser?.lastName.slice(0, 1).toUpperCase()}
      </div>
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-2">
        <UserDetail name="First Name" value={currentUser?.firstName} />
        <UserDetail name="Last Name" value={currentUser?.lastName} />
        <UserDetail name="Age" value={currentUser?.age} />
        <UserDetail name="Email" value={currentUser?.email} />
        <UserDetail
          name="Rank"
          value={currentUser?.isAdmin ? "Admin" : "User"}
        />
        <UserDetail name="Posts" value={"0"} />
      </div>
    </>
  );
}
