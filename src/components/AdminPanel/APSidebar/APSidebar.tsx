import React, { useContext, useState } from "react";

import { APLinks } from "../../../config/APLinks";
import APLinkItem from "../APLinkItem/APLinkItem";

import { MdAdminPanelSettings } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { NewsContext } from "../../../context/NewsContext";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function APSidebar() {
  const { handleSignOut } = useContext(NewsContext) || {};
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div
        className={`${
          !sidebarOpen
            ? "translate-x-[-6rem] w-[6rem]"
            : "w-[20em] translate-x-0"
        }  h-full flex flex-col justify-between items-start bg-neutral-900 bg- text-white px-5 py-[1.3rem] absolute lg:translate-x-0 lg:w-[20em] lg:relative z-[980] transition-width duration-300`}
      >
        <div className="w-full flex flex-col gap-16 py-2">
          <button
            onClick={handleToggleSidebar}
            className="absolute lg:hidden top-[1.8rem] -right-9 lg:-right-5 text-white bg-neutral-900 py-2 pr-2 pl-3 rounded-lg"
          >
            <GiHamburgerMenu className="text-2xl" />
          </button>
          <APLinkItem
            href="/admin-panel"
            text="Admin Panel"
            Icon={MdAdminPanelSettings}
            open={sidebarOpen}
            handleToggleSidebar={handleToggleSidebar}
          />
          <ul className="w-full text-nowrap flex flex-col gap-2 list-none">
            {APLinks.map((link) => (
              <APLinkItem
                key={link.id}
                href={link.href}
                text={link.text}
                Icon={link.linkIcon}
                open={sidebarOpen}
                handleToggleSidebar={handleToggleSidebar}
              />
            ))}
          </ul>
        </div>
        <div className="w-full flex flex-col gap-2">
          <APLinkItem
            href="/"
            text="Home page"
            Icon={IoHome}
            open={sidebarOpen}
          />
          <APLinkItem
            href="/"
            text="Logout"
            Icon={RiLogoutCircleRLine}
            open={sidebarOpen}
            signOut={handleSignOut}
          />
        </div>
      </div>
    </>
  );
}
