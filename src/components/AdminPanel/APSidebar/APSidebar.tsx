import React, { useState } from "react";

import { APLinks } from "../../../config/APLinks";
import APLinkItem from "../APLinkItem/APLinkItem";

import { MdAdminPanelSettings } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHome } from "react-icons/io5";

export default function APSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleCloseSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div
        className={`${
          !sidebarOpen
            ? "lg:translate-x-0 lg:w-[20em] translate-x-[-6rem] w-[6rem]"
            : "w-[20em] translate-x-0 lg:w-[6em] lg:translate-x-0"
        }  h-full flex flex-col justify-between items-start bg-zinc-900 text-white px-5 py-[1.3rem] absolute lg:-translate-x-0 lg:relative z-[980] transition-width duration-300`}
      >
        <div className="w-full flex flex-col gap-16 py-2">
          <button
            onClick={handleCloseSidebar}
            className="absolute top-[1.8rem] -right-7 md:-right-5 text-white bg-zinc-900 p-2 rounded-lg"
          >
            <GiHamburgerMenu className="text-2xl" />
          </button>
          <APLinkItem
            href="/admin-panel"
            text="Admin Panel"
            Icon={MdAdminPanelSettings}
            open={sidebarOpen}
          />
          <ul className="w-full text-nowrap flex flex-col gap-2">
            {APLinks.map((link) => (
              <APLinkItem
                key={link.id}
                href={link.href}
                text={link.text}
                Icon={link.linkIcon}
                open={sidebarOpen}
              />
            ))}
          </ul>
        </div>
        <div className="w-full">
          <APLinkItem
            href="/"
            text="Home page"
            Icon={IoHome}
            open={sidebarOpen}
          />
        </div>
      </div>
    </>
  );
}
