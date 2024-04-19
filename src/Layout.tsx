import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Container from "./components/Container/Container";
import DisabledNavbar from "./components/DisabledNavbar/DisabledNavbar";
import { DisabledPaths } from "./components/DisabledNavbar/DisabledNavbarPaths";

export default function Layout() {
  return (
    <Container>
      <DisabledNavbar paths={DisabledPaths}>
        <Navbar />
      </DisabledNavbar>
      <Outlet />
    </Container>
  );
}
