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
      className="w-full bg-gradient-to-tr from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-md disabled:cursor-not-allowed flex justify-center items-center gap-1"
      onClick={handleClick}
    >
      {text}
      {loading && <PiSpinnerBold size="15" className="animate-spin" />}
    </button>
  );
}
