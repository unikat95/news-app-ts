import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import DisabledNavbar from "./components/DisabledNavbar/DisabledNavbar";
import { DisabledPaths } from "./components/DisabledNavbar/DisabledNavbarPaths";

export default function Layout() {
  return (
    <>
      <DisabledNavbar paths={DisabledPaths}>
        <Navbar />
      </DisabledNavbar>
      <Outlet />
    </>
  );
}
