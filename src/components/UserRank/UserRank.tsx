import React, { useContext } from "react";
import { NewsContext } from "../../context/NewsContext";
import { MdAddModerator } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export default function UserRank() {
  const { currentUser } = useContext(NewsContext) || {};

  return (
    <>
      <div
        className="w-auto flex justify-center items-center px-3 py-2 rounded-md text-sm gap-2 font-medium mt-2"
        style={{
          background: `${currentUser?.isAdmin ? "#90fda4" : "#eeeeee"}`,
          color: `${currentUser?.isAdmin ? "#3f6d48" : "#787878"}`,
        }}
      >
        {currentUser?.isAdmin ? (
          <MdAddModerator
            size={16}
            style={{ color: `${currentUser?.isAdmin ? "#3f6d48" : "#787878"}` }}
          />
        ) : (
          <FaUser size={14} className="text-slate-600" />
        )}
        {currentUser?.isAdmin ? "Administrator" : "User"}
      </div>
    </>
  );
}
