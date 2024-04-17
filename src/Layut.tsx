import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Container from "./components/Container/Container";

export default function Layut() {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
}
