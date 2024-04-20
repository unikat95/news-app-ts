import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Container from "./components/Container/Container";
import DisabledNavbar from "./components/DisabledNavbar/DisabledNavbar";
import { DisabledPaths } from "./components/DisabledNavbar/DisabledNavbarPaths";

export default function Layout() {
  const [navHeight, setNavHeight] = useState<number>(0);

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      const height = navbar.offsetHeight;
      setNavHeight(height);
    }
  }, []);

  return (
    <Container height={navHeight}>
      <DisabledNavbar paths={DisabledPaths}>
        <Navbar />
      </DisabledNavbar>
      <Outlet />
    </Container>
  );
}
