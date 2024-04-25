import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";
import { UserProps } from "../../context/ContextType";
import UserAvatar from "../UserAvatar/UserAvatar";

type AuthorCardProps = {
  author: UserProps;
  vertical?: boolean;
};

export default function AuthorCard({ author, vertical }: AuthorCardProps) {
  const { currentUser } = useContext(NewsContext) || {};
  return (
    <Link
      to={`${
        currentUser?.id === author.id ? "/profile" : `/users/user/${author?.id}`
      }`}
      className={`w-auto flex ${
        vertical && "flex-col"
      }  justify-center items-center group hover:brightness-110`}
    >
      <UserAvatar user={author} width="4em" height="4em" />
      <div
        className={`flex flex-col justify-center ${
          vertical ? "items-center" : "items-start"
        }`}
      >
        <div className="text-sm text-slate-600 font-bold">
          {author?.firstName} {author?.lastName}
        </div>
        <div className="text-xs text-slate-500 font-bold">
          {author?.isAdmin ? "Administrator" : "User"}
        </div>
      </div>
    </Link>
  );
}
