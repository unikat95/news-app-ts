import React, { useContext } from "react";
import { ArticleProps, UserProps } from "../../../context/ContextType";
import { Link } from "react-router-dom";
import { BiLinkExternal, BiSolidCategory } from "react-icons/bi";
import { NewsContext } from "../../../context/NewsContext";
import HTMLReactParser from "html-react-parser/lib/index";
import { removeStyles } from "../../../context/UIFunctios";
import { FaUser } from "react-icons/fa";

type ArticlesItemProps = {
  article: ArticleProps;
  author: UserProps | undefined;
  handleSetCategory: (category: string) => void;
  setImageLoaded: (articleId: string, loaded: boolean) => void;
  imageLoadedStates: {
    [key: string]: boolean;
  };
};

export default function ArticlesItem({
  article,
  author,
  handleSetCategory,
  setImageLoaded,
  imageLoadedStates,
}: ArticlesItemProps) {
  const { currentUser } = useContext(NewsContext) || {};

  return (
    <div
      key={article.id}
      className="w-full grid grid-cols-1 md:grid-cols-[30%,1fr] lg:grid-cols-[23%,1fr] overflow-hidden group gap-5 border-b pb-5"
    >
      <Link
        to={`/articles/${article.id}`}
        className="w-full h-full overflow-hidden"
      >
        {!imageLoadedStates[article.id] && (
          <div className="w-full h-full bg-gray-400 animate-pulse"></div>
        )}
        <img
          src={article.image}
          alt=""
          className="w-full md:max-w-[22rem] h-full min-h-[10rem] max-h-[10rem] md:min-h-[14rem] md:max-h-[14rem] object-cover group-hover:scale-110 group-hover:rotate-2 duration-200"
          onLoad={() => setImageLoaded(article.id, true)}
        />
      </Link>
      <div className="w-full flex flex-col justify-between items-start md:gap-0">
        <div className="w-full flex flex-col gap-2">
          <p className="text-xs  text-slate-600 font-medium">
            Posted: {new Date(article.createdAt).toLocaleString()}
          </p>
          <Link
            to={`/articles/${article.id}`}
            className="text-2xl text-slate-600 font-bold hover:underline"
          >
            {article.title}
          </Link>
          <p className="text-slate-600">
            {HTMLReactParser(removeStyles(article.text.slice(0, 300)))}
          </p>
        </div>
        <div className="w-full flex justify-between items-end gap-1">
          <div className="flex flex-col md:flex-row justify-end items-start gap-1 text-slate-500 font-medium text-sm">
            <div className="flex flex-col lg:flex-row justify-start items-start gap-1 lg:gap-3">
              <div className="flex justify-center items-center gap-1">
                <FaUser size={11} className="mb-[2px]" />
                <span> Author:</span>
                <Link
                  to={`${
                    currentUser?.id === article.author
                      ? "/profile"
                      : `/users/user/${article.author}`
                  }`}
                  className="text-slate-700 hover:underline"
                >
                  {author?.firstName} {author?.lastName},
                </Link>
              </div>
              <div className="flex justify-center items-center gap-1">
                <BiSolidCategory size={11} className="mb-[2px]" />
                <span>Category:</span>
                <button
                  type="button"
                  className="text-slate-700 underline"
                  onClick={() => handleSetCategory(article.category)}
                >
                  {article.category}
                </button>
              </div>
            </div>
          </div>
          <Link
            to={`/articles/${article.id}`}
            className="flex justify-center items-center gap-1 underline text-slate-800 hover:text-slate-600"
          >
            Read more <BiLinkExternal size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
