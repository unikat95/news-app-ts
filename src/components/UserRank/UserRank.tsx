import React from "react";
import { MdAddModerator } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { UserProps } from "../../context/ContextType";

type UserRankProps = {
  user: UserProps | null;
};

export default function UserRank({ user }: UserRankProps) {
  return (
    <>
      <div
        className="w-auto flex justify-center items-center px-4 py-2 rounded-md text-sm gap-3 font-medium mt-2"
        style={{
          background: `${user?.isAdmin ? "#90fda4" : "#eeeeee"}`,
          color: `${user?.isAdmin ? "#3f6d48" : "#787878"}`,
        }}
      >
        {user?.isAdmin ? (
          <MdAddModerator
            size={16}
            style={{ color: `${user?.isAdmin ? "#3f6d48" : "#787878"}` }}
          />
        ) : (
          <FaUser size={14} className="text-slate-600" />
        )}
        {user?.isAdmin ? "Administrator" : "User"}
      </div>
    </>
  );
}
