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
      className="bg-gradient-to-tr from-blue-500 to-purple-500 px-4 py-2 rounded-md text-white hover:from-blue-600 hover:to-purple-600"
      onClick={handleCloseMenu}
    >
      {text}
    </Link>
  );
}
