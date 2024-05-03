import React from "react";
import { BsPen } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="z-[100]">
      <Link
        to="/"
        className="text-xl font-bold text-black flex justify-center items-center gap-2"
      >
        <BsPen size={22} />
        NewsApp_
      </Link>
    </div>
  );
}
