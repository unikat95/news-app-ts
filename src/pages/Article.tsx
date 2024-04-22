import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import Container from "../components/Container/Container";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import ArticleImage from "../components/ArticleImage/ArticleImage";

export default function Article() {
  const { articles, usersList } = useContext(NewsContext) || {};
  const { id } = useParams();

  const article = articles?.find((art) => art.id === id);
  const author = usersList?.find((user) => user.id === article?.author);

  if (!article || !author) return;

  return (
    <>
      <Container>
        <div className="w-full max-w-[1300px] flex flex-col justify-center items-center lg:p-5 xl:p-0 gap-10">
          <Link
            to={`/users/user/${author?.id}`}
            className="w-auto flex flex-col justify-center items-center group hover:brightness-110"
          >
            <UserAvatar user={author} width="4em" height="4em" />
            <div className="text-sm text-slate-600 font-bold">
              {author?.firstName} {author?.lastName}
            </div>
            <div className="text-xs text-slate-500 font-bold">
              {author?.isAdmin ? "Administrator" : "User"}
            </div>
          </Link>
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
      </Container>
    </>
  );
}
