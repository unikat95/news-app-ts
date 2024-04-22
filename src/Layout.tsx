import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import DisabledNavbar from "./components/DisabledNavbar/DisabledNavbar";
import { DisabledPaths } from "./components/DisabledNavbar/DisabledNavbarPaths";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Footer from "./components/Footer/Footer";
import DisabledFooter from "./components/DisabledFooter/DisabledFooter";

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <DisabledNavbar paths={DisabledPaths}>
        <Navbar />
      </DisabledNavbar>
      <Outlet />
      <DisabledFooter paths={DisabledPaths}>
        <Footer />
      </DisabledFooter>
    </>
  );
}
