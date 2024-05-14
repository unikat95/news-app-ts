import React, { useContext, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";

import { CgProfile } from "react-icons/cg";
import { BiMessageSquareDots } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function DropdownMenu() {
  const { handleCloseDropdown, handleSignOut, currentUser, dot } =
    useContext(NewsContext) || {};

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        event.target &&
        !(event.target as HTMLElement).closest(".user-dropdown")
      ) {
        handleCloseDropdown?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseDropdown]);

  return (
    <div
      ref={dropdownRef}
      className="bg-white rounded-md absolute top-14 right-0 p-2 shadow-md z-[9999]"
    >
      <ul className="w-full h-full text-sm list-none">
        <li className="flex">
          <Link
            to="/profile"
            className="w-full px-6 py-2 hover:bg-zinc-200 flex justify-start items-center gap-2 rounded-md"
            onClick={handleCloseDropdown}
          >
            <CgProfile size={16} className="text-slate-600" />
            Profile
          </Link>
        </li>
        <li className="flex">
          <Link
            to="/messages"
            className={`w-full px-6 py-2 hover:bg-zinc-200 flex justify-start items-center gap-2 rounded-md relative ${
              dot && " text-sky-600"
            }`}
            onClick={handleCloseDropdown}
          >
            <BiMessageSquareDots size={16} />
            Messages
          </Link>
        </li>
        {currentUser?.isAdmin && (
          <li className="flex">
            <Link
              to="/admin-panel"
              className="w-full px-6 py-2 hover:bg-zinc-200 flex justify-start items-center gap-2 rounded-md"
              onClick={handleCloseDropdown}
            >
              <MdAdminPanelSettings size={16} className="text-slate-600" />
              Admin Panel
            </Link>
          </li>
        )}
        <li className="flex group">
          <Link
            to=""
            className="w-full px-6 py-2  hover:bg-slate-900 hover:text-white flex justify-start items-center gap-2 rounded-md"
            onClick={handleSignOut}
          >
            <RiLogoutCircleRLine
              size={16}
              className="text-slate-600 group-hover:text-white"
            />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
