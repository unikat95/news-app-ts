import React, { useContext } from "react";
import { IconType } from "react-icons";
import { NewsContext } from "../../context/NewsContext";

type UserDetailProps = {
  name: string;
  value: string | undefined;
  Icon: IconType;
  IconAdmin?: IconType | undefined;
};

export default function UserDetail({
  name,
  value,
  Icon,
  IconAdmin,
}: UserDetailProps) {
  const { currentUser } = useContext(NewsContext) || {};

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="text-xs text-slate-500">{name}:</div>
      <div className="w-full bg-gray-100 flex justify-between items-center gap-2 rounded-md overflow-hidden">
        <div className="w-auto bg-gray-200 text-gray-400 p-3">
          {IconAdmin && currentUser?.isAdmin ? (
            <IconAdmin size={14} />
          ) : (
            <Icon size={14} />
          )}
        </div>
        <div className="w-full text-sm">{value}</div>
      </div>
    </div>
  );
}
