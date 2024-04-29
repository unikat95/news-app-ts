import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-auto max-w-[1300px] flex flex-col md:flex-row justify-start items-start gap-10 px-5 md:p-3 2xl:p-0">
      <div className="w-full h-[50vh] flex flex-col justify-center items-center gap-3">
        <h1 className="text-slate-800 font-black text-9xl">404</h1>
        <h2 className="text-slate-700 font-bold">
          Oops! This Page Could Not Be Found
        </h2>
        <h3 className="w-full max-w-[30em] text-slate-600 font-medium text-center">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable
        </h3>
        <Link
          to="/"
          className="bg-black hover:bg-blue-500 p-[.75em_1.75em] text-white font-bold uppercase rounded-full mt-5"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
