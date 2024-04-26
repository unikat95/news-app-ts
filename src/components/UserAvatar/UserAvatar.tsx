import React from "react";
import { UserProps } from "../../context/ContextType";

type UserAvatarProps = {
  user: UserProps | null;
  width: string;
  height: string;
  fontSize?: string;
  borderColor?: string;
};

export default function UserAvatar({
  user,
  width,
  height,
  fontSize,
}: UserAvatarProps) {
  return (
    <>
      {user?.avatar ? (
        <div
          className="bg-gray-500 bg-center bg-cover border-8 border-slate-100 rounded-full flex justify-center items-center font-bold text-white shadow-sm overflow-hidden"
          style={{
            width: width,
            height: height,
            fontSize: fontSize,
          }}
        >
          <img src={user.avatar} />
        </div>
      ) : (
        <div
          className="bg-gray-500 bg-center bg-cover border-8 border-slate-50 rounded-full flex justify-center items-center font-bold text-white shadow-sm"
          style={{ width: width, height: height, fontSize: fontSize }}
        >
          {user?.firstName.slice(0, 1).toUpperCase()}
          {user?.lastName.slice(0, 1).toUpperCase()}
        </div>
      )}
    </>
  );
}
