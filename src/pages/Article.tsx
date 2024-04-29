import React, { useContext } from "react";

import HTMLReactParser from "html-react-parser/lib/index";
import { useNavigate, useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";

import ArticleImage from "../components/Article/ArticleImage/ArticleImage";
import ArticleSidebar from "../components/Article/ArticleSidebar/ArticleSidebar";
import ArticleComments from "../components/Article/ArticleComments/ArticleComments";
import AuthorCard from "../components/AuthorCard/AuthorCard";

export default function Article() {
  const { articles, usersList, setCategory } = useContext(NewsContext) || {};
  const { id } = useParams();
  const navigate = useNavigate();

  const article = articles?.find((art) => art.id === id);
  const author = usersList?.find((user) => user.id === article?.author);

  if (!article || !author || !setCategory) return null;

  const goToCategory = () => {
    setCategory(article.category);
    navigate("/articles");
  };

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-7">
      <div className="w-full lg:max-w-[900px] flex flex-col justify-center items-center xl:p-0 gap-10">
        <div className="w-full bg-white flex flex-col gap-10 p-5 py-10 lg:gap-10 lg:p-10 rounded-md shadow-sm relative">
          <div className="w-full text-sm text-slate-800 absolute top-5 left-5">
            Category:{" "}
            <button
              type="button"
              className="underline text-slate-600"
              onClick={goToCategory}
            >
              {article.category}
            </button>
          </div>
          <div className="w-full bg-white flex flex-col justify-center items-center gap-3">
            <AuthorCard author={author} vertical={true} />
            <div className="text-xs uppercase font-bold text-slate-400 mt-2">
              Posted: {new Date(article.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl text-slate-700 font-bold">
              {article?.title}
            </h1>
          </div>
          <ArticleImage article={article} />
          <div className="text-lg text-slate-600 text-wrap">
            {HTMLReactParser(article?.text)}
          </div>
        </div>
        <ArticleComments article={article} />
      </div>
      <ArticleSidebar article={article} />
    </div>
  );
}
