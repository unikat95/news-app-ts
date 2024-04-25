import React, { useContext } from "react";
import LatestArticle from "../LatestArticle/LatestArticle";
import { NewsContext } from "../../context/NewsContext";

export default function LatestArticles() {
  const { sortedArticles } = useContext(NewsContext) || {};

  return (
    <div className="w-full flex flex-col gap-10">
      <h1 className="text-3xl text-slate-700 font-medium">Latest articles:</h1>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {sortedArticles
          ?.map((article) => (
            <LatestArticle key={article.id} article={article} />
          ))
          .slice(0, 3)}
      </div>
    </div>
  );
}
