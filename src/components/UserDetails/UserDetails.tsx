import React, { useContext } from "react";
import { NewsContext } from "../../context/NewsContext";

export default function UserDetails() {
  const { currentUser } = useContext(NewsContext) || {};
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <div className="w-14 h-14 bg-orange-500 rounded-full flex justify-center items-center text-xl font-bold text-white">
        {currentUser?.firstName.slice(0, 1)}
        {currentUser?.lastName.slice(0, 1)}
      </div>
      <div>
        <div>First name: {currentUser?.firstName}</div>
        <div>Last name: {currentUser?.lastName}</div>
        <div>Age: {currentUser?.age}</div>
        <div>Role: {currentUser?.isAdmin ? "Admin" : "User"}</div>
      </div>
    </div>
  );
}
