import React, { useContext } from "react";

import { NewsContext } from "../context/NewsContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { doc, updateDoc } from "firebase/firestore";

import { IoIosLogOut } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";

import EditProfile from "../components/EditProfile/EditProfile";
import UserDetails from "../components/UserDetails/UserDetails";
import PopoutMsg from "../components/PopoutMsg/PopoutMsg";
import ProfileButton from "../components/ProfileButton/ProfileButton";

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
    <>
      <PopoutMsg message="User information successfully saved" />
      <div className="w-full flex flex-col lg:flex-row gap-10 justify-start items-start">
        <div className="w-full lg:w-2/3 flex flex-col gap-5 md:p-5 xl:p-0">
          <h1 className="hidden md:block">User details:</h1>
          <div className="w-full bg-white flex justify-center items-center rounded-lg">
            <div className="w-full flex flex-col justify-center items-center gap-5 p-5">
              <UserDetails />
              <div className="w-full flex justify-end items-end gap-3">
                <ProfileButton
                  handleClick={handleEditProfile}
                  text="Edit"
                  Icon={FaUserEdit}
                />
                <ProfileButton
                  handleClick={handleSignOut}
                  text="Logout"
                  Icon={IoIosLogOut}
                />
              </div>
            </div>
            {!currentUser?.completed || currentUser?.inEditing ? (
              <EditProfile user={currentUser} />
            ) : null}
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          <h1 className="hidden md:block">User Articles:</h1>
          <div className="flex justify-center items-center md:justify-start">
            This user has no articles yet.
          </div>
        </div>
      </div>
    </>
  );
}
