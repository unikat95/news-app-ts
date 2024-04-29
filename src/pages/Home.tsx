import React from "react";
import LatestArticles from "../components/LatestArticles/LatestArticles";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <LatestArticles />
      <div className="flex flex-col justify-center items-start gap-10">
        <h1 className="text-3xl text-slate-700 font-medium">Other articles:</h1>

        <Link to="/articles" className="w-full text-lg underline text-center">
          See all articles...
        </Link>
      </div>
    </div>
  );
}
