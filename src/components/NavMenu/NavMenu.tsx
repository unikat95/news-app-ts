import React, { useContext } from "react";
import NavLinkItem from "../NavLinkItem/NavLinkItem";
import { NavLinks } from "../../config/NavLinks";
import { IoMdArrowDropdown } from "react-icons/io";
import { NewsContext } from "../../context/NewsContext";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import UserAvatar from "../UserAvatar/UserAvatar";

type NavMenuProps = {
  open: boolean;
  handleCloseMenu: () => void;
};

export default function NavMenu({ open, handleCloseMenu }: NavMenuProps) {
  const { currentUser, openDropdown, handleOpenDropdown } =
    useContext(NewsContext) || {};

  return (
    <ul
      className={`w-screen h-[100dvh] md:h-auto fixed bg-white top-0 left-0 transition-all duration-300 ${
        open
          ? "translate-y-0"
          : "translate-y-[-150dvh] md:translate-y-0 md:duration-0"
      } flex flex-col justify-center items-center md:relative md:w-auto md:h-auto md:flex md:flex-row md:justify-end md:items-center md:bg-transparent gap-10`}
    >
      {NavLinks.map((link) => (
        <NavLinkItem
          key={link.id}
          href={link.href}
          name={link.name}
          handleCloseMenu={handleCloseMenu}
        />
      ))}
      {currentUser && (
        <>
          <NavLinkItem
            href="/profile"
            name="Profile"
            handleCloseMenu={handleCloseMenu}
          />
          <li className="hidden md:flex">
            <button className="relative group" onClick={handleOpenDropdown}>
              <UserAvatar width="3.6em" height="3.6em" fontSize="1em" />
              <span className=" bg-white justify-center items-center absolute bottom-1 right-2 rounded-sm">
                <IoMdArrowDropdown
                  className={`${openDropdown && "rotate-180"}`}
                />
              </span>
            </button>
            {openDropdown && <DropdownMenu />}
          </li>
        </>
      )}
      {!currentUser && (
        <NavLinkItem
          href="/auth"
          name="Join Us!"
          handleCloseMenu={handleCloseMenu}
        />
      )}
    </ul>
  );
}
