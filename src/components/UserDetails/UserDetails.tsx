import React from "react";
import UserDetail from "../UserDetail/UserDetail";
import UserAvatar from "../UserAvatar/UserAvatar";
import { UserProps } from "../../context/ContextType";

import { MdEmail } from "react-icons/md";
import { FaPen, FaUser } from "react-icons/fa";
import UserRank from "../UserRank/UserRank";

type UserDetailsProps = {
  user: UserProps | null;
};

export default function UserDetails({ user }: UserDetailsProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <UserAvatar user={user} width="3em" height="3em" fontSize="4em" />
      <UserRank user={user} />
      <div className="w-full flex gap-x-3 gap-y-1">
        <UserDetail
          name="Full Name"
          value={user?.firstName + " " + user?.lastName}
          Icon={FaUser}
        />
      </div>
      <div className="w-full flex gap-x-3 gap-y-1">
        <UserDetail name="Email" value={user?.email} Icon={MdEmail} />
      </div>
      <div className="w-full grid lg:grid-cols-2 gap-x-3 gap-y-1">
        <UserDetail name="Age" value={user?.age} Icon={FaUser} />
        <UserDetail name="Posts" value={"0"} Icon={FaPen} />
      </div>
    </div>
  );
}
