import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { UserProps } from "../../../context/ContextType";

type APUsersItemProps = {
  user: UserProps;
};

export default function APUsersItem({ user }: APUsersItemProps) {
  return (
    <div className="w-full grid grid-cols-[4fr,1fr,auto] md:grid-cols-[2fr,1fr,1fr,1fr,auto] lg:grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] xl:grid-cols-[3fr,2fr,2fr,2fr,2fr,4fr,auto] items-center justify-items-start bg-neutral-100 hover:bg-neutral-200 relative gap-2 px-2 py-4 md:py-3 lg:py-2 rounded-md transition-all duration-100 origin-center">
      <div>
        <p className="text-sm text-slate-500 font-medium">{user.email}</p>
      </div>
      <div>
        {!user.avatar ? (
          <span className="w-8 h-8 bg-gray-500 flex justify-center items-center rounded-full uppercase text-white text-sm font-bold">
            {user.firstName.slice(0, 1)}
            {user.lastName.slice(0, 1)}
          </span>
        ) : (
          <img
            src={user.avatar}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
      </div>
      <div className="hidden md:flex">
        <p className="text-sm text-slate-500 font-medium">
          {user.firstName !== "" ? user.firstName : "---"}
        </p>
      </div>
      <div className="hidden md:flex">
        <p className="text-sm text-slate-500 font-medium">
          {user.lastName !== "" ? user.lastName : "---"}
        </p>
      </div>
      <div className="hidden lg:flex">
        <p className="text-sm text-slate-500 font-medium">
          {user.age !== "" ? user.age : "---"}
        </p>
      </div>
      <div className="hidden xl:flex">
        <p className="text-sm text-slate-500 font-medium">
          {user.isAdmin ? "Administrator" : "User"}
        </p>
      </div>
      <button className="px-2 bg-white hover:bg-slate-300 w-[2em] h-[2em] rounded-full flex justify-center items-center">
        <BsThreeDotsVertical size="20" />
      </button>
    </div>
  );
}
