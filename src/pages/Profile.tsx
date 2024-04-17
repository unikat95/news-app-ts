import React, { useContext } from "react";

import { NewsContext } from "../context/NewsContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { IoIosLogOut } from "react-icons/io";
import EditProfile from "../components/EditProfile/EditProfile";
import { doc, updateDoc } from "firebase/firestore";

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

  const handleEditProfile = async () => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.id);
      await updateDoc(userRef, {
        inEditing: true,
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col gap-5">
        <div>Welcome, {user?.email}</div>
        <div>
          {" "}
          <div>First name: {currentUser?.firstName}</div>
          <div>Last name: {currentUser?.lastName}</div>
          <div>Age: {currentUser?.age}</div>
          <div>Role: {currentUser?.isAdmin ? "Admin" : "User"}</div>
          <div>
            <button
              className="bg-lime-500 text-white px-4 py-1 rounded-md"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
          </div>
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
      {!currentUser?.completed || currentUser?.inEditing ? (
        <EditProfile user={currentUser} />
      ) : null}
    </div>
  );
}
