import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";

export default function Profile() {
  const { user, currentUser, setUser, setCurrentUser } =
    useContext(NewsContext) || {};

  const handleSignOut = async () => {
    await signOut(auth);
    if (setUser && setCurrentUser) {
      setUser(null);
      setCurrentUser(null);
    }
  };

  return (
    <div>
      <div>Welcome, {user?.email}</div>
      <div>First name: {currentUser?.firstName}</div>
      <div>Last name: {currentUser?.lastName}</div>
      <div>Role: {currentUser?.isAdmin ? "Admin" : "User"}</div>
      <div>
        <button onClick={handleSignOut}>Logout</button>
      </div>
    </div>
  );
}
