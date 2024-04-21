import React, { useContext } from "react";

import { NewsContext } from "../context/NewsContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { doc, updateDoc } from "firebase/firestore";

import PopoutMsg from "../components/PopoutMsg/PopoutMsg";
import Container from "../components/Container/Container";
import UserArticles from "../components/UserArticles/UserArticles";
import UserProfile from "../components/UserProfile/UserProfile";

export default function Profile() {
  const { currentUser, setUser, setCurrentUser } =
    useContext(NewsContext) || {};

  const handleSignOut = async () => {
    await signOut(auth);
    if (setUser && setCurrentUser) {
      setUser(null);
      setCurrentUser(null);
    }
  };

  const handleEditProfile = async () => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.id);
      await updateDoc(userRef, {
        inEditing: true,
      });
    }
  };

  return (
    <>
      {currentUser && (
        <Container>
          <PopoutMsg message="User information successfully saved" />
          <div className="w-full flex flex-col lg:flex-row gap-10 justify-start items-start">
            <UserProfile
              user={currentUser}
              handleEditProfile={handleEditProfile}
              handleSignOut={handleSignOut}
            />
            <UserArticles />
          </div>
        </Container>
      )}
    </>
  );
}
