import React, { useContext, useEffect } from "react";

import { NewsContext } from "../context/NewsContext";

import PopoutMsg from "../components/PopoutMsg/PopoutMsg";
import UserArticles from "../components/UserArticles/UserArticles";
import UserProfile from "../components/UserProfile/UserProfile";

export default function Profile() {
  const { currentUser, handleSignOut, handleEditProfile } =
    useContext(NewsContext) || {};

  useEffect(() => {
    if (currentUser?.inEditing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [currentUser?.inEditing]);

  return (
    <>
      {currentUser && (
        <>
          <PopoutMsg message="User information successfully saved" />
          <div className="w-full flex flex-col lg:flex-row gap-4 justify-start items-start">
            <UserProfile
              user={currentUser}
              handleEditProfile={handleEditProfile}
              handleSignOut={handleSignOut}
            />
            <UserArticles user={currentUser} />
          </div>
        </>
      )}
    </>
  );
}
