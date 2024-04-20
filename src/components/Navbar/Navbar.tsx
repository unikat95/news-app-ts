import React, { useState } from "react";

import Logo from "../Logo/Logo";

import NavMenu from "../NavMenu/NavMenu";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setOpen(!open);
  };

  const handleCLoseMenu = () => {
    setOpen(false);
  };

  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  window.addEventListener("scroll", () => {
    window.scrollY > 30 ? setScroll(true) : setScroll(false);
  });

  return (
    <nav
      className={`w-screen h-auto ${
        scroll
          ? "bg-white shadow-sm md:py-2"
          : "bg-transparent shadow-none md:py-8"
      } flex justify-center items-center fixed top-0 p-5 transition-[background,_padding] duration-300`}
    >
      <div className="max-w-[1300px] w-full h-auto flex justify-between items-center">
        <Logo />
        <NavMenu open={open} handleCloseMenu={handleCLoseMenu} />
        <button
          className={`md:hidden flex hamburger-menu ${open && "active"}`}
          onClick={handleOpenMenu}
        ></button>
      </div>
    </nav>
  );
}
