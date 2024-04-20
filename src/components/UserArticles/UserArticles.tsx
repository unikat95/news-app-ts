import React from "react";

export default function UserArticles() {
  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="hidden md:block">User Articles:</h1>
      <div className="flex justify-center items-center md:justify-start">
        This user has no articles yet.
      </div>
    </div>
  );
}
