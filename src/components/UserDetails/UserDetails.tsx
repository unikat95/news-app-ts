import React, { useContext } from "react";
import { NewsContext } from "../../context/NewsContext";
import UserDetail from "../UserDetail/UserDetail";
import UserAvatar from "../UserAvatar/UserAvatar";

import { MdEmail } from "react-icons/md";
import { FaPen, FaUser } from "react-icons/fa";
import { MdAddModerator } from "react-icons/md";

export default function UserDetails() {
  const { currentUser } = useContext(NewsContext) || {};
  return (
    <>
      <UserAvatar width="3em" height="3em" fontSize="4em" />
      <div className="w-full grid lg:grid-cols-2 gap-2">
        <UserDetail
          name="First Name"
          value={currentUser?.firstName}
          Icon={FaUser}
        />
        <UserDetail
          name="Last Name"
          value={currentUser?.lastName}
          Icon={FaUser}
        />
        <UserDetail name="Age" value={currentUser?.age} Icon={FaUser} />
        <UserDetail name="Email" value={currentUser?.email} Icon={MdEmail} />
        <UserDetail
          name="Rank"
          value={currentUser?.isAdmin ? "Admin" : "User"}
          Icon={FaUser}
          IconAdmin={MdAddModerator}
        />
        <UserDetail name="Posts" value={"0"} Icon={FaPen} />
      </div>
    </>
  );
}
