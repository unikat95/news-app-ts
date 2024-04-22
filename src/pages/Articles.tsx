import React, { useContext } from "react";

import Container from "../components/Container/Container";
import { NewsContext } from "../context/NewsContext";
import { Link } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";

export default function Articles() {
  const { articles, usersList } = useContext(NewsContext) || {};

  return (
    <Container>
      <div className="w-full flex flex-col justify-start items-start xl:p-0 gap-5">
        {articles?.map((article) => {
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
                <img
                  src={article.image}
                  alt=""
                  className="w-full md:max-w-[19rem] h-full min-h-[10rem] max-h-[10rem] md:min-h-[14rem] md:max-h-[14rem] object-cover group-hover:scale-[1.1] group-hover:rotate-3 duration-300 rounded-lg"
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
                      ? article.text.slice(0, 300) + "..."
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
                      to={`/users/user/${article.author}`}
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
        })}
      </div>
    </Container>
  );
}
