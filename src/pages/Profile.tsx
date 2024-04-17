import React, { useContext } from "react";

import { NewsContext } from "../context/NewsContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import { IoIosLogOut } from "react-icons/io";

export default function Profile() {
  const { user, currentUser, setUser, setCurrentUser } =
    useContext(NewsContext) || {};

  const handleSignOut = async () => {
    await signOut(auth);
    if (setUser && setCurrentUser) {
      setUser(null);
      setCurrentUser(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>Welcome, {user?.email}</div>
      <div>
        {" "}
        <div>First name: {currentUser?.firstName}</div>
        <div>Last name: {currentUser?.lastName}</div>
        <div>Role: {currentUser?.isAdmin ? "Admin" : "User"}</div>
      </div>
      <div>
        <button
          onClick={handleSignOut}
          className="flex justify-center items-center gap-1 hover:text-red-400 font-medium"
        >
          Logout
          <IoIosLogOut size="16" className="mt-[2px]" />
        </button>
      </div>
    </div>
  );
}
