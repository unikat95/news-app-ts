import React from "react";
import { Link } from "react-router-dom";

type CTAButtonProps = {
  text: string;
  handleCloseMenu?: () => void;
};

export default function CTAButton({ text, handleCloseMenu }: CTAButtonProps) {
  return (
    <Link
      to="/auth"
      className="bg-black px-4 py-2 rounded-md text-white hover:bg-blue-500 text-nowrap"
      onClick={handleCloseMenu}
    >
      {text}
    </Link>
  );
}
