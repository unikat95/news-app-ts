import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";
import { UserProps } from "../../context/ContextType";
import UserAvatar from "../UserAvatar/UserAvatar";

type AuthorCardProps = {
  author: UserProps;
  vertical?: boolean;
  rank?: boolean;
  width?: string;
  height?: string;
  border?: string;
};

export default function AuthorCard({
  author,
  vertical,
  rank,
  width,
  height,
  border,
}: AuthorCardProps) {
  const { currentUser } = useContext(NewsContext) || {};
  return (
    <Link
      to={`${
        currentUser?.id === author.id ? "/profile" : `/users/user/${author?.id}`
      }`}
      className={`w-auto flex ${
        vertical && "flex-col"
      }  justify-center items-center group hover:brightness-110 gap-2`}
    >
      <UserAvatar
        user={author}
        width={`${width ? width : "4em"}`}
        height={`${height ? height : "4em"}`}
        border={border}
      />
      <div
        className={`flex flex-col justify-center ${
          vertical ? "items-center" : "items-start"
        }`}
      >
        <div className="text-sm text-slate-600 font-bold">
          {author?.firstName} {author?.lastName}
        </div>
        {!rank && (
          <div className="text-xs text-slate-500 font-bold">
            {author?.isAdmin ? "Administrator" : "User"}
          </div>
        )}
      </div>
    </Link>
  );
}
