import React, { useContext } from "react";

import { NewsContext } from "../context/NewsContext";
import UserCard from "../components/UserCard/UserCard";

export default function Users() {
  const { usersList } = useContext(NewsContext) || {};

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-start items-center gap-5">
        {usersList?.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            avatar={user.avatar}
            firstName={user.firstName}
            lastName={user.lastName}
            rank={user.isAdmin}
          />
        ))}
      </div>
    </>
  );
}
