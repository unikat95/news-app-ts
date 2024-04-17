import React from "react";
import { PiSpinnerBold } from "react-icons/pi";

type FormButtonProps = {
  text: string;
  handleClick: (e: { preventDefault: () => void }) => void;
  loading: boolean;
};

export default function FormButton({
  text,
  handleClick,
  loading,
}: FormButtonProps) {
  return (
    <button
      className="flex justify-center items-center gap-3 border-2 border-black bg-black hover:bg-slate-500 hover:border-slate-500 text-white px-3 py-1 rounded-md"
      onClick={handleClick}
    >
      {text}
      {loading && <PiSpinnerBold size="15" className="animate-spin" />}
    </button>
  );
}
