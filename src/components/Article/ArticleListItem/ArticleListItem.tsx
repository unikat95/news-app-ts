import React, { useContext, useState } from "react";
import { ArticleProps } from "../../../context/ContextType";
import { Link, useNavigate } from "react-router-dom";
import HTMLReactParser from "html-react-parser/lib/index";
import { removeStyles } from "../../../context/UIFunctios";
import { NewsContext } from "../../../context/NewsContext";
import { FaUser } from "react-icons/fa";
import { BiLinkExternal, BiSolidCategory } from "react-icons/bi";

type ArticleListItemProps = {
  art: ArticleProps;
};

export default function ArticleListItem({ art }: ArticleListItemProps) {
  const { currentUser, setCategory, usersList } = useContext(NewsContext) || {};
  const [imageLoadedStates, setImageLoadedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const navigate = useNavigate();

  const author = usersList?.find((user) => user.id === art.author);

  if (!setCategory) return;

  const setImageLoaded = (articleId: string, loaded: boolean) => {
    setImageLoadedStates((prev) => ({
      ...prev,
      [articleId]: loaded,
    }));
  };

  const handleSetCategory = (category: string) => {
    setCategory(category);
    navigate("/articles");
  };

  return (
    <div
      key={art.id}
      className="w-full grid grid-cols-1 md:grid-cols-[30%,1fr] lg:grid-cols-[25%,1fr] overflow-hidden group bg-white border-b py-5 gap-5"
    >
      <Link
        to={`/articles/${art.id}`}
        className="w-full h-full overflow-hidden"
      >
        {!imageLoadedStates[art.id] && (
          <div className="w-full h-full bg-gray-400 animate-pulse"></div>
        )}
        <img
          src={art.image}
          alt=""
          className="w-full md:max-w-[19rem] h-full min-h-[10rem] max-h-[10rem] md:min-h-[12rem] md:max-h-[12rem] object-cover group-hover:scale-110 group-hover:rotate-2 duration-200"
          onLoad={() => setImageLoaded(art.id, true)}
        />
      </Link>
      <div className="w-full flex flex-col justify-between items-start gap-3 md:gap-0">
        <div className="w-full flex flex-col gap-1">
          <p className="text-xs  text-slate-600 font-medium">
            Posted: {new Date(art.createdAt).toLocaleString()}
          </p>
          <Link
            to={`/articles/${art.id}`}
            className="text-2xl text-slate-900 font-bold hover:underline line-clamp-1 md:line-clamp-2"
          >
            {art.title}
          </Link>
          <p className="text-slate-600 text-sm line-clamp-2 xl:line-clamp-3">
            {HTMLReactParser(removeStyles(art.text))}
          </p>
        </div>
        <div className="w-full flex justify-between items-end gap-1">
          <div className="flex flex-col md:flex-row justify-end items-start gap-1 text-slate-500 font-medium text-sm">
            <div className="flex flex-col xl:flex-row justify-start items-start xl:gap-3">
              <div className="flex f justify-center items-center gap-1">
                <FaUser size={11} className="mb-[2px]" />
                <span> Author:</span>
                <Link
                  to={`${
                    currentUser?.id === art.author
                      ? "/profile"
                      : `/users/user/${art.author}`
                  }`}
                  className="text-slate-700 hover:underline text-nowrap"
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
                  onClick={() => handleSetCategory(art.category)}
                >
                  {art.category}
                </button>
              </div>
            </div>
          </div>
          <Link
            to={`/articles/${art.id}`}
            className="flex justify-center items-center gap-1 underline text-slate-800 hover:text-slate-600 text-nowrap"
          >
            Read more <BiLinkExternal size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
