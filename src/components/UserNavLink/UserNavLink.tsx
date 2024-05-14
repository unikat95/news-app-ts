import React, { useContext } from "react";

import UserAvatar from "../UserAvatar/UserAvatar";
import { NewsContext } from "../../context/NewsContext";
import { IoMdArrowDropdown } from "react-icons/io";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

type UserNavLinkProps = {
  adminPanel: boolean;
};

export default function UserNavLink({ adminPanel }: UserNavLinkProps) {
  const {
    currentUser,
    openDropdown,
    handleOpenDropdown,
    handleCloseMenu,
    dot,
  } = useContext(NewsContext) || {};

  if (!currentUser || !handleCloseMenu) return;
  return (
    <>
      <li
        className={`${
          adminPanel ? "flex" : "hidden md:flex"
        } relative text-nowrap`}
      >
        <button
          className="relative group user-dropdown"
          onClick={handleOpenDropdown}
        >
          <UserAvatar user={currentUser} width="3.6em" height="3.6em" />
          <span className="justify-center bg-white items-center absolute bottom-0 right-2 rounded-sm">
            <IoMdArrowDropdown className={`${openDropdown && "rotate-180"}`} />
          </span>
          {dot && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
          )}
        </button>
        {openDropdown && <DropdownMenu />}
      </li>
    </>
  );
}
