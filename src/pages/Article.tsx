import React, { useContext } from "react";

import { useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";

import ArticleImage from "../components/ArticleImage/ArticleImage";
import AuthorCard from "../components/AuthorCard/AuthorCard";

export default function Article() {
  const { articles, usersList } = useContext(NewsContext) || {};
  const { id } = useParams();

  const article = articles?.find((art) => art.id === id);
  const author = usersList?.find((user) => user.id === article?.author);

  if (!article || !author) return;

  return (
    <>
      <div className="w-full max-w-[1300px] flex flex-col justify-center items-center lg:p-5 xl:p-0 gap-10">
        <AuthorCard author={author} vertical={true} />
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <div className="text-xs uppercase font-bold text-slate-400">
            Posted: {new Date(article.createdAt).toLocaleString()}
          </div>
          <h1 className="text-3xl text-slate-700 font-bold">
            {article?.title}
          </h1>
        </div>
        <ArticleImage article={article} />
        <div>{article?.text}</div>
      </div>
    </>
  );
}
