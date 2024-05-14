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
    <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-5">
      <div className="w-full lg:max-w-[1140px] flex flex-col justify-center items-center xl:p-0 gap-10">
        <div className="w-full flex flex-col gap-10 py-10 relative border-b-[1px]">
          <div className="w-auto h-auto bg-amber-600 p-2 text-xs uppercase px-4 rounded-sm text-white font-bold absolute top-0 left-0">
            <button type="button" className="text-white" onClick={goToCategory}>
              {article.category}
            </button>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col justify-center items-start gap-3 mt-5">
              <div className="text-xs uppercase font-bold text-slate-400">
                Posted: {new Date(article.createdAt).toLocaleString()}
              </div>
              <h1 className="text-3xl text-slate-700 font-bold">
                {article?.title}
              </h1>
            </div>
            <div className="w-full flex justify-start items-center gap-3">
              by
              <AuthorCard
                author={author}
                vertical={false}
                width="1.3rem"
                height="1.3rem"
                border="0"
                rank={true}
              />
            </div>
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
