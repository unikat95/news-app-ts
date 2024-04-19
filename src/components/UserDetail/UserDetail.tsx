import React from "react";

type UserDetailProps = {
  name: string;
  value: string | undefined;
};

export default function UserDetail({ name, value }: UserDetailProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="text-sm text-slate-600">{name}:</div>
      <div className="w-full bg-slate-50 border border-slate-200 text-slate-600 rounded-md p-2 outline-none">
        {value}
      </div>
    </div>
  );
}
