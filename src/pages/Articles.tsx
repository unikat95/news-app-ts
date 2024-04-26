import React, { useContext, useState } from "react";

import { NewsContext } from "../context/NewsContext";
import { Link } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import HTMLReactParser from "html-react-parser/lib/index";

type ArticlesType = {
  slice?: number;
};

export default function Articles({ slice }: ArticlesType) {
  const { currentUser, sortedArticles, usersList, removeStyles } =
    useContext(NewsContext) || {};

  const [imageLoadedStates, setImageLoadedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const setImageLoaded = (articleId: string, loaded: boolean) => {
    setImageLoadedStates((prev) => ({
      ...prev,
      [articleId]: loaded,
    }));
  };

  if (!removeStyles) return;

  return (
    <>
      {sortedArticles
        ?.map((article) => {
          const author = usersList?.find((user) => user.id === article.author);
          return (
            <div
              key={article.id}
              className="grid grid-cols-1 md:grid-cols-[30%,1fr] lg:grid-cols-[23%,1fr] rounded-lg overflow-hidden gap-7 pb-5 border-b group"
            >
              <Link
                to={`/articles/${article.id}`}
                className="w-full h-full overflow-hidden rounded-lg"
              >
                {!imageLoadedStates[article.id] && (
                  <div className="w-full h-full bg-gray-400 animate-pulse rounded-xl"></div>
                )}
                <img
                  src={article.image}
                  alt=""
                  className="w-full md:max-w-[19rem] h-full min-h-[10rem] max-h-[10rem] md:min-h-[14rem] md:max-h-[14rem] object-cover group-hover:scale-110 group-hover:rotate-2 duration-200 rounded-lg"
                  onLoad={() => setImageLoaded(article.id, true)}
                />
              </Link>
              <div className="w-full flex flex-col justify-between items-start gap-3 md:gap-0">
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
                    {article.text.length > 300
                      ? HTMLReactParser(
                          removeStyles(article.text.slice(0, 300) + "...")
                        )
                      : article.text}
                  </p>
                </div>
                <div className="w-full flex justify-between items-end gap-1">
                  <div className="flex flex-col md:flex-row justify-end items-start gap-1 text-slate-500 font-medium text-sm">
                    <div className="flex justify-center items-center gap-1">
                      <FaUser size={11} className="mb-[2px]" />
                      <span> Author:</span>
                    </div>
                    <Link
                      to={`${
                        currentUser?.id === article.author
                          ? "/profile"
                          : `/users/user/${article.author}`
                      }`}
                      className="text-slate-700 hover:underline"
                    >
                      {author?.firstName} {author?.lastName}
                    </Link>
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
        })
        .slice(0, slice)}
    </>
  );
}
