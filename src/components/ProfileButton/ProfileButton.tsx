import React from "react";
import { IconType } from "react-icons";

type ProfileButtonProps = {
  handleClick: () => Promise<void>;
  text: string;
  Icon: IconType;
};

export default function ProfileButton({
  handleClick,
  text,
  Icon,
}: ProfileButtonProps) {
  return (
    <button
      className="w-full flex justify-center bg-slate-100 hover:bg-slate-700 text-slate-800 hover:text-zinc-100 px-2 py-2 rounded-md items-center gap-2"
      onClick={handleClick}
    >
      <Icon size="17" className="mb-[1px]" />
      {text}
    </button>
  );
}
