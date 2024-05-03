import React from "react";
import LatestArticles from "../components/LatestArticles/LatestArticles";
import ArticleList from "../components/Article/ArticleList/ArticleList";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-10">
      <LatestArticles />
      <div className="w-full flex flex-col justify-center items-center gap-10 overflow-x-hidden">
        <ArticleList />
      </div>
    </div>
  );
}
