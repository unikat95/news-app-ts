import React from "react";
import { NavLink } from "react-router-dom";

type NavLinkItemProps = {
  href: string;
  handleCloseMenu: () => void;
  name: string;
};

export default function NavLinkItem({
  href,
  handleCloseMenu,
  name,
}: NavLinkItemProps) {
  return (
    <li className={`${name === "Profile" && "md:hidden flex"}`}>
      <NavLink
        to={href}
        onClick={handleCloseMenu}
        className="text-2xl md:text-base"
      >
        {name}
      </NavLink>
    </li>
  );
}
