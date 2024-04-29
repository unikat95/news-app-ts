import React, { useContext } from "react";

import NavLinkItem from "../NavLinkItem/NavLinkItem";
import { NavLinks } from "../../config/NavLinks";
import { NewsContext } from "../../context/NewsContext";
import CTAButton from "../CTAButton/CTAButton";
import UserNavLink from "../UserNavLink/UserNavLink";

export default function NavMenu() {
  const { currentUser, handleCloseMenu, openMenu } =
    useContext(NewsContext) || {};

  if (!handleCloseMenu) return;

  return (
    <ul
      className={`w-screen h-[100dvh] md:h-auto fixed bg-white top-0 left-0 transition-all duration-300 ${
        openMenu
          ? "translate-y-0"
          : "translate-y-[-150dvh] md:translate-y-0 md:duration-0"
      } flex flex-col justify-center items-center md:relative md:w-auto md:h-auto md:flex md:flex-row md:justify-end md:items-center md:bg-transparent gap-10 list-none`}
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
          <UserNavLink adminPanel={false} />
        </>
      )}
      {currentUser?.isAdmin && (
        <NavLinkItem
          href="/admin-panel"
          name="Admin Panel"
          handleCloseMenu={handleCloseMenu}
          hidden="md:hidden"
        />
      )}
      {!currentUser && (
        <CTAButton text="Sign in" handleCloseMenu={handleCloseMenu} />
      )}
    </ul>
  );
}
