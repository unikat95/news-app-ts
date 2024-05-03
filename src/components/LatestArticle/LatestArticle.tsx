import React, { useContext } from "react";
import { ArticleProps, UserProps } from "../../context/ContextType";
import { Link, useNavigate } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";

type LatestArticleProps = {
  art: ArticleProps;
  author: UserProps | undefined;
};

export default function LatestArticle({ art, author }: LatestArticleProps) {
  const { currentUser, setCategory } = useContext(NewsContext) || {};

  const navigate = useNavigate();

  if (!setCategory) return;

  const handleSetCategory = (category: string) => {
    setCategory(category);
    navigate("/articles");
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-end items-start bg-cover bg-center p-5 relative after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-gradient-to-b after:from-transparent after:to-slate-950 hover:after:to-black z-0 group"
      style={{ backgroundImage: `url("${art.image}")` }}
    >
      <div className="w-full flex flex-col justify-start items-start mt-20 z-10 gap-4">
        <div className="w-full flex flex-col justify-start items-start gap-1">
          <button
            onClick={() => handleSetCategory(art.category)}
            className="w-auto h-auto bg-amber-600 p-2 text-xs uppercase rounded-sm text-white font-bold"
          >
            {art.category}
          </button>
          <Link
            to={`/articles/${art.id}`}
            className="text-white text-xl md:text-2xl font-bold hover:underline line-clamp-1"
          >
            {art.title}
          </Link>
        </div>
        <div className="w-full flex justify-between items-center gap-5">
          <Link
            to={`${
              currentUser?.id === art.author
                ? "/profile"
                : `/users/user/${art.author}`
            }`}
            className="text-white text-xs md:text-sm font-medium"
          >
            {author?.firstName} {author?.lastName},
          </Link>
          <span className="text-white text-xs md:text-sm font-normal text-nowrap">
            {new Date(art.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
