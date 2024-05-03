import React from "react";

import UserDetails from "../UserDetails/UserDetails";
import ProfileButton from "../ProfileButton/ProfileButton";

import EditProfile from "../EditProfile/EditProfile";

import { IoLogOutSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { UserProps } from "../../context/ContextType";
import { useLocation } from "react-router-dom";

type UserProfileProps = {
  user: UserProps | null;
  handleEditProfile?: () => Promise<void>;
  handleSignOut?: (() => Promise<void>) | undefined;
};

export default function UserProfile({
  user,
  handleEditProfile,
  handleSignOut,
}: UserProfileProps) {
  const location = useLocation();

  return (
    <div className="w-full lg:w-2/3 flex flex-col gap-5 xl:p-0">
      <h1 className="hidden md:block">User information:</h1>
      <div className="w-full flex justify-center items-center relative border-[1px]">
        <div className="w-full flex flex-col justify-center items-center gap-3 md:gap-7 p-5">
          <UserDetails user={user} />
          {location.pathname === "/profile" && (
            <div className="w-full flex flex-wrap sm:flex-nowrap justify-end items-end gap-3">
              <button
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 hover:rotate-90 transition-[transform,color] duration-100"
                onClick={handleEditProfile}
              >
                <IoMdSettings size={24} />
              </button>
              <ProfileButton href="/" text="Messages" Icon={MdMessage} />
              <ProfileButton
                handleClick={handleSignOut}
                text="Logout"
                Icon={IoLogOutSharp}
              />
            </div>
          )}
        </div>
        {!user?.completed || user?.inEditing ? (
          <EditProfile user={user} />
        ) : null}
      </div>
    </div>
  );
}
