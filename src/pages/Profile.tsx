import React, { useContext } from "react";

import { NewsContext } from "../context/NewsContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import { doc, updateDoc } from "firebase/firestore";

import EditProfile from "../components/EditProfile/EditProfile";
import UserDetails from "../components/UserDetails/UserDetails";

export default function Profile() {
  const { currentUser, setUser, setCurrentUser } =
    useContext(NewsContext) || {};

  const handleSignOut = async () => {
    await signOut(auth);
    if (setUser && setCurrentUser) {
      setUser(null);
      setCurrentUser(null);
    }
  };

  const handleEditProfile = async () => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.id);
      await updateDoc(userRef, {
        inEditing: true,
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full h-full lg:max-w-[50%] flex flex-col justify-center items-center bg-white shadow-md gap-5 p-5 rounded-md">
        <UserDetails />
        <div className="w-full flex justify-end items-end gap-3">
          <button
            className="w-full flex justify-center bg-slate-200 px-2 py-1 rounded-md items-center gap-1 text-slate-600 hover:text-slate-950 font-medium"
            onClick={handleEditProfile}
          >
            <IoMdSettings size="16" />
            Edit
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex justify-center bg-slate-200 px-2 py-1 rounded-md items-center gap-1 text-slate-600 hover:text-slate-950 font-medium"
          >
            <IoIosLogOut size="16" />
            Logout
          </button>
        </div>
      </div>
      {!currentUser?.completed || currentUser?.inEditing ? (
        <EditProfile user={currentUser} />
      ) : null}
    </div>
  );
}
