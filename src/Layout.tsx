import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import DisabledNavbar from "./components/DisabledNavbar/DisabledNavbar";
import { DisabledPaths } from "./components/DisabledNavbar/DisabledNavbarPaths";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Footer from "./components/Footer/Footer";
import DisabledFooter from "./components/DisabledFooter/DisabledFooter";
import Container from "./components/Container/Container";

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <DisabledNavbar paths={DisabledPaths}>
        <Navbar />
      </DisabledNavbar>
      <Container>
        <div className="w-full flex flex-col justify-start items-start xl:p-0 gap-10">
          <Outlet />
        </div>
      </Container>
      <DisabledFooter paths={DisabledPaths}>
        <Footer />
      </DisabledFooter>
    </>
  );
}
