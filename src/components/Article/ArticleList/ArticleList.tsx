import React, { useContext } from "react";
import { NewsContext } from "../../../context/NewsContext";
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import ArticleSidebarLatest from "../ArticleSidebarLatest/ArticleSidebarLatest";
import ArticleListCategory from "../ArticleListCategory/ArticleListCategory";
import { Link } from "react-router-dom";

export default function ArticleList() {
  const { sortedArticles } = useContext(NewsContext) || {};

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-5">
      <div className="w-full flex flex-col">
        <h1 className="w-full h-auto relative after:absolute after:w-full after:h-1 after:bg-amber-500 after:-bottom-0 after:left-0 py-2">
          <span className="bg-amber-500 px-4 py-2 text-base text-white font-medium">
            Other articles
          </span>
        </h1>
        <div className="w-full flex flex-col">
          {sortedArticles
            ?.map((art) => <ArticleListItem key={art.id} art={art} />)
            .slice(3, 8)}
        </div>
        <Link to="/articles" className="w-full text-lg underline text-end mt-5">
          See all articles
        </Link>
      </div>
      <div className="w-full flex flex-col lg:max-w-[360px] gap-7">
        <ArticleListCategory />
        <ArticleSidebarLatest
          articles={sortedArticles}
          text="Recent articles"
          recommend={false}
        />
      </div>
    </div>
  );
}
