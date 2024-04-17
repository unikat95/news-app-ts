import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";

export default function Navbar() {
  const { currentUser } = useContext(NewsContext) || {};
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {currentUser && (
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        )}
        {!currentUser && (
          <li>
            <NavLink to="/auth">Join us!</NavLink>
          </li>
        )}
        {currentUser?.isAdmin === true && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
