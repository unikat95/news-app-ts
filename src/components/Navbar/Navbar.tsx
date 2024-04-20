import React, { useContext, useState } from "react";

import { Link, NavLink } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";

import { BsPen } from "react-icons/bs";

import UserAvatar from "../UserAvatar/UserAvatar";
import { IoMdArrowDropdown } from "react-icons/io";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

export default function Navbar() {
  const { currentUser } = useContext(NewsContext) || {};
  const [open, setOpen] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);

  window.addEventListener("scroll", () => {
    window.scrollY > 30 ? setScroll(true) : setScroll(false);
  });

  const handleOpenMenu = () => {
    setOpen(!open);
  };

  const handleCLoseMenu = () => {
    setOpen(false);
  };

  const handleOpenDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleCloseDropdown = () => {
    setDropdown(false);
  };

  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <nav
      className={`w-screen h-auto ${
        scroll
          ? "bg-white shadow-sm md:py-2"
          : "bg-transparent shadow-none md:py-8"
      } flex justify-center items-center fixed top-0 p-5 transition-[background,_padding] duration-300`}
    >
      <div className="max-w-[1300px] w-full h-auto flex justify-between items-center">
        <div className="z-[100]">
          <Link
            to="/"
            className="text-xl font-bold text-slate-700 flex justify-center items-center gap-2"
          >
            <BsPen size={24} />
            NewsApp_
          </Link>
        </div>
        <ul
          className={`w-screen h-[100dvh] md:h-auto fixed bg-white top-0 left-0 transition-all duration-300 ${
            open
              ? "translate-y-0"
              : "translate-y-[-150dvh] md:translate-y-0 md:duration-0"
          } flex flex-col justify-center items-center md:relative md:w-auto md:h-auto md:flex md:flex-row md:justify-end md:items-center md:bg-transparent gap-10`}
        >
          <li>
            <NavLink
              to="/"
              onClick={handleCLoseMenu}
              className="text-2xl md:text-base"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              onClick={handleCLoseMenu}
              className="text-2xl md:text-base"
            >
              Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              onClick={handleCLoseMenu}
              className="text-2xl md:text-base"
            >
              Users
            </NavLink>
          </li>
          {currentUser && (
            <li className="md:hidden">
              <NavLink
                to="/profile"
                onClick={handleCLoseMenu}
                className="text-2xl md:text-base"
              >
                Profile
              </NavLink>
            </li>
          )}
          {!currentUser && (
            <li>
              <NavLink to="/auth" className="text-2xl md:text-base">
                Join us!
              </NavLink>
            </li>
          )}
          <div className="hidden md:flex">
            <button className="relative group" onClick={handleOpenDropdown}>
              <UserAvatar width="3.6em" height="3.6em" fontSize="1em" />
              <span className="hidden group-hover:flex bg-white justify-center items-center absolute bottom-1 right-2 rounded-sm ">
                <IoMdArrowDropdown />
              </span>
            </button>
            {dropdown && (
              <DropdownMenu handleCloseDropdown={handleCloseDropdown} />
            )}
          </div>
        </ul>
        <button
          className={`md:hidden flex hamburger-menu ${open && "active"}`}
          onClick={handleOpenMenu}
        ></button>
      </div>
    </nav>
  );
}
