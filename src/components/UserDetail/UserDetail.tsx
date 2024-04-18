import React from "react";

type UserDetailProps = {
  name: string;
  value: string | undefined;
};

export default function UserDetail({ name, value }: UserDetailProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="text-sm text-slate-600">{name}</div>
      <div className="w-full bg-gray-100 border-b-[3px] border-gray-300 p-2 rounded-md text-sm text-slate-700 font-normal">
        {value}
      </div>
    </div>
  );
}
