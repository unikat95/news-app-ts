import React from "react";
import { Link } from "react-router-dom";

export default function CTAButton() {
  return (
    <Link
      to="/auth"
      className="bg-gradient-to-tr from-blue-500 to-purple-500 px-4 py-2 rounded-md text-white hover:from-blue-600 hover:to-purple-600"
    >
      Sign in
    </Link>
  );
}
