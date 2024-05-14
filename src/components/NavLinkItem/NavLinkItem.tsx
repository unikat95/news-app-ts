import React from "react";
import { NavLink } from "react-router-dom";

type NavLinkItemProps = {
  href: string;
  handleCloseMenu: () => void;
  name: string;
  hidden?: string;
};

export default function NavLinkItem({
  href,
  handleCloseMenu,
  name,
  hidden,
}: NavLinkItemProps) {
  return (
    <li
      className={`w-full flex flex-col justify-center items-center ${
        (name === "Profile" || name === "Messages") && "md:hidden flex"
      } ${hidden}`}
    >
      <NavLink
        to={href}
        onClick={handleCloseMenu}
        className="text-2xl md:text-base font-medium"
      >
        {name}
      </NavLink>
    </li>
  );
}
