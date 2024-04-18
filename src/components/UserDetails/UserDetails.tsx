import React, { useContext } from "react";
import { NewsContext } from "../../context/NewsContext";
import UserDetail from "../UserDetail/UserDetail";

export default function UserDetails() {
  const { currentUser } = useContext(NewsContext) || {};
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <div className="w-40 h-40 bg-blue-500 border-8 border-slate-100 rounded-full flex justify-center items-center text-6xl font-bold text-white">
        {currentUser?.firstName.slice(0, 1).toUpperCase()}
        {currentUser?.lastName.slice(0, 1).toUpperCase()}
      </div>
      <div className="w-full grid grid-cols-2 gap-2">
        <UserDetail name="First Name" value={currentUser?.firstName} />
        <UserDetail name="Last Name" value={currentUser?.lastName} />
        <UserDetail name="Age" value={currentUser?.age} />
        <UserDetail name="Email" value={currentUser?.email} />
        <UserDetail
          name="Role"
          value={currentUser?.isAdmin ? "Admin" : "User"}
        />
      </div>
    </div>
  );
}
