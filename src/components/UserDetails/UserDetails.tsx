import React, { useContext } from "react";
import { NewsContext } from "../../context/NewsContext";
import UserDetail from "../UserDetail/UserDetail";
import UserAvatar from "../UserAvatar/UserAvatar";

import { MdEmail } from "react-icons/md";
import { FaPen, FaUser } from "react-icons/fa";
import UserRank from "../UserRank/UserRank";

export default function UserDetails() {
  const { currentUser } = useContext(NewsContext) || {};
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <UserAvatar width="3em" height="3em" fontSize="4em" />
      <UserRank />
      <div className="w-full flex gap-x-3 gap-y-1">
        <UserDetail
          name="Full Name"
          value={currentUser?.firstName + " " + currentUser?.lastName}
          Icon={FaUser}
        />
      </div>
      <div className="w-full flex gap-x-3 gap-y-1">
        <UserDetail name="Email" value={currentUser?.email} Icon={MdEmail} />
      </div>
      <div className="w-full grid lg:grid-cols-2 gap-x-3 gap-y-1">
        <UserDetail name="Age" value={currentUser?.age} Icon={FaUser} />
        <UserDetail name="Posts" value={"0"} Icon={FaPen} />
      </div>
    </div>
  );
}
