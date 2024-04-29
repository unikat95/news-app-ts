import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";

import { CgProfile } from "react-icons/cg";
import { BiMessageSquareDots } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function DropdownMenu() {
  const { handleCloseDropdown, handleSignOut, currentUser } =
    useContext(NewsContext) || {};

  return (
    <div className="bg-white rounded-md absolute top-[3.3rem] right-0 shadow-md z-[9999]">
      <ul className="w-full h-full py-3 text-sm list-none">
        <li className="flex">
          <Link
            to="/profile"
            className="w-full px-6 py-2 border-t hover:bg-zinc-50 flex justify-start items-center gap-2"
            onClick={handleCloseDropdown}
          >
            <CgProfile size={16} className="text-slate-500" />
            Profile
          </Link>
        </li>
        <li className="flex">
          <Link
            to=""
            className="w-full px-6 py-2 border-t hover:bg-zinc-50 flex justify-start items-center gap-2"
            onClick={handleCloseDropdown}
          >
            <BiMessageSquareDots size={16} className="text-slate-500" />
            Messages
          </Link>
        </li>
        {currentUser?.isAdmin && (
          <li className="flex">
            <Link
              to="/admin-panel"
              className="w-full px-6 py-2 border-t hover:bg-zinc-50 flex justify-start items-center gap-2"
              onClick={handleCloseDropdown}
            >
              <MdAdminPanelSettings size={16} className="text-slate-500" />
              Admin Panel
            </Link>
          </li>
        )}
        <li className="flex group">
          <Link
            to=""
            className="w-full px-6 py-2 border-y hover:bg-slate-900 hover:text-white flex justify-start items-center gap-2"
            onClick={handleSignOut}
          >
            <RiLogoutCircleRLine
              size={16}
              className="text-slate-500 group-hover:text-white"
            />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
