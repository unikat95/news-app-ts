import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";

type UserCardProps = {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  rank: boolean;
};

export default function UserCard({
  id,
  avatar,
  firstName,
  lastName,
  rank,
}: UserCardProps) {
  const { currentUser } = useContext(NewsContext) || {};
  return (
    <Link
      to={`${currentUser?.id === id ? "/profile" : `/users/user/${id}`}`}
      className="w-full h-full bg-white hover:bg-slate-50 flex flex-col justify-center items-center rounded-md shadow-sm p-10 gap-5"
    >
      {avatar ? (
        <img src={avatar} className="w-24 h-24 rounded-full" />
      ) : (
        <div className="w-24 h-24 bg-slate-500 rounded-full flex justify-center items-center text-2xl text-white font-bold">
          {firstName.slice(0, 1).toUpperCase()}
          {lastName.slice(0, 1).toUpperCase()}
        </div>
      )}
      <div className="w-full flex flex-col justify-center items-center">
        <div className="text-regular font-bold text-slate-500">
          {firstName} {lastName}
        </div>
        <div className="text-sm font-medium text-slate-500">
          {rank ? "Administrator" : "User"}
        </div>
      </div>
    </Link>
  );
}
