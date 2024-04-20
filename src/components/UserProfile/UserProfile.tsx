import React, { useContext } from "react";

import UserDetails from "../UserDetails/UserDetails";
import ProfileButton from "../ProfileButton/ProfileButton";

import { NewsContext } from "../../context/NewsContext";
import EditProfile from "../EditProfile/EditProfile";

import { FaUserEdit } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdMessage } from "react-icons/md";

type UserProfileProps = {
  handleEditProfile: () => Promise<void>;
  handleSignOut: () => Promise<void>;
};

export default function UserProfile({
  handleEditProfile,
  handleSignOut,
}: UserProfileProps) {
  const { currentUser } = useContext(NewsContext) || {};

  return (
    <div className="w-full lg:w-2/3 flex flex-col gap-5 md:p-5 xl:p-0">
      <h1 className="hidden md:block">User details:</h1>
      <div className="w-full bg-white flex justify-center items-center rounded-lg">
        <div className="w-full flex flex-col justify-center items-center gap-7 p-3 md:p-7">
          <UserDetails />
          <div className="w-full flex justify-end items-end gap-3">
            <ProfileButton href="/" text="Messages" Icon={MdMessage} />
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
  );
}
