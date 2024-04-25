import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";

export default function DropdownMenu() {
  const { handleCloseDropdown, handleSignOut } = useContext(NewsContext) || {};

  return (
    <div className="bg-white rounded-md absolute top-12 right-0 shadow-md z-[9999]">
      <ul className="w-full h-full py-3 text-sm">
        <li className="flex">
          <Link
            to="/profile"
            className="w-full px-6 py-2 border-t hover:bg-zinc-50"
            onClick={handleCloseDropdown}
          >
            Profile
          </Link>
        </li>
        <li className="flex">
          <Link
            to=""
            className="w-full px-6 py-2 border-t hover:bg-zinc-50"
            onClick={handleCloseDropdown}
          >
            Messages
          </Link>
        </li>
        <li className="flex">
          <Link
            to="/dashboard"
            className="w-full px-6 py-2 border-t hover:bg-zinc-50"
            onClick={handleCloseDropdown}
          >
            Dashboard
          </Link>
        </li>
        <li className="flex">
          <Link
            to=""
            className="w-full px-6 py-2 border-y hover:bg-slate-900 hover:text-white"
            onClick={handleSignOut}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
