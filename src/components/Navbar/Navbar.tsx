import React, { useContext, useState } from "react";

import Logo from "../Logo/Logo";

import NavMenu from "../NavMenu/NavMenu";
import { NewsContext } from "../../context/NewsContext";

export default function Navbar() {
  const { openMenu, handleOpenMenu } = useContext(NewsContext) || {};
  const [scroll, setScroll] = useState<boolean>(false);

  if (openMenu) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  window.addEventListener("scroll", () => {
    window.scrollY > 30 ? setScroll(true) : setScroll(false);
  });

  return (
    <nav
      className={`w-full h-auto bg-white ${
        scroll ? "shadow-sm border-none" : "shadow-none border-b lg:py-6"
      } flex justify-center items-center fixed top-0 py-5 px-3 lg:p-2 transition-[background,_padding] duration-300 z-[9999]`}
    >
      <div className="max-w-[1240px] w-full h-auto flex justify-between items-center">
        <Logo />
        <NavMenu />
        <button
          className={`md:hidden flex hamburger-menu ${openMenu && "active"}`}
          onClick={handleOpenMenu}
        ></button>
      </div>
    </nav>
  );
}
