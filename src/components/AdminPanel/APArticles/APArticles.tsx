import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../../../context/NewsContext";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

export default function APArticles() {
  const { sortedArticles } = useContext(NewsContext) || {};
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center bg-white p-5 gap-5 md:p-10 md:gap-10 overflow-auto">
      <h1 className="w-full h-auto text-2xl text-slate-700 font-medium">
        Articles
      </h1>
      <div className="w-full flex flex-col gap-2">
        {loading ? (
          <div className="flex justify-center items-center gap-2 mt-5">
            <LoadingSpinner /> loading article list...
          </div>
        ) : (
          <>
            {sortedArticles?.map((art) => (
              <div
                key={art.id}
                className="w-full flex bg-neutral-100 justify-between p-2 text-sm"
              >
                {art.title}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
