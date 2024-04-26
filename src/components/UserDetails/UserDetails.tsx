import React, { useContext } from "react";
import UserDetail from "../UserDetail/UserDetail";
import UserAvatar from "../UserAvatar/UserAvatar";
import { UserProps } from "../../context/ContextType";

import { MdEmail } from "react-icons/md";
import { FaPen, FaUser } from "react-icons/fa";
import UserRank from "../UserRank/UserRank";
import { NewsContext } from "../../context/NewsContext";

type UserDetailsProps = {
  user: UserProps | null;
};

export default function UserDetails({ user }: UserDetailsProps) {
  const { articles } = useContext(NewsContext) || {};

  const userArticles = articles?.filter((art) => art.author === user?.id);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 mt-2 md:mt-0">
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
        <UserDetail name="Posts" value={userArticles?.length} Icon={FaPen} />
      </div>
    </div>
  );
}
