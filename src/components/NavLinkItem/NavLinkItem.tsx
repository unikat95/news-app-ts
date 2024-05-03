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
    <li className={`${name === "Profile" && "md:hidden flex"} ${hidden}`}>
      <NavLink
        to={href}
        onClick={handleCloseMenu}
        className="text-4xl md:text-base font-medium"
      >
        {name}
      </NavLink>
    </li>
  );
}
