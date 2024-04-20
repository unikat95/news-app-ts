import React, { useContext } from "react";
import { NewsContext } from "../../context/NewsContext";

type UserAvatarProps = {
  width: string;
  height: string;
  fontSize: string;
};

export default function UserAvatar({
  width,
  height,
  fontSize,
}: UserAvatarProps) {
  const { currentUser } = useContext(NewsContext) || {};
  return (
    <>
      <div
        className="bg-lime-400 bg-center bg-cover border-8 border-slate-50 rounded-full flex justify-center items-center font-bold text-white shadow-sm"
        style={{ width: width, height: height, fontSize: fontSize }}
      >
        {currentUser?.firstName.slice(0, 1).toUpperCase()}
        {currentUser?.lastName.slice(0, 1).toUpperCase()}
      </div>
    </>
  );
}
