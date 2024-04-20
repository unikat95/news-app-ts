import React from "react";
import { BsPen } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="z-[100]">
      <Link
        to="/"
        className="text-xl font-semibold text-slate-700 flex justify-center items-center gap-2"
      >
        <BsPen size={20} />
        NewsApp_
      </Link>
    </div>
  );
}
