import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";

export default function Navbar() {
  const { currentUser } = useContext(NewsContext) || {};
  return (
    <nav className="w-full h-auto flex justify-between p-5 md:p-0">
      <div>
        <Link to="/">NewsApp_</Link>
      </div>
      <ul className="w-auto h-auto flex gap-5">
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
