import React, { useContext, useEffect, useState } from "react";
import { ArticleProps } from "../../context/ContextType";
import { NewsContext } from "../../context/NewsContext";
import AuthorCard from "../AuthorCard/AuthorCard";
import { Link } from "react-router-dom";
import HTMLReactParser from "html-react-parser/lib/index";

type LatestArticleProps = {
  article: ArticleProps;
};

export default function LatestArticle({ article }: LatestArticleProps) {
  const { usersList, removeStyles } = useContext(NewsContext) || {};
  const author = usersList?.find((user) => user.id === article.author);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const image = new Image();
    image.src = article?.image || "";
    image.onload = () => setImageLoaded(true);
  }, [article]);

  if (!removeStyles) return;

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <Link
        to={`/articles/${article.id}`}
        className="w-full min-h-[14em] max-h-[14em] group overflow-hidden rounded-xl"
      >
        {!imageLoaded && (
          <div className="w-full h-full bg-gray-400 animate-pulse rounded-xl"></div>
        )}
        <img
          src={article.image}
          alt=""
          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 duration-200"
        />
      </Link>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-slate-500 font-medium uppercase">
          Posted: {new Date(article.createdAt).toLocaleString()}
        </span>
        <Link
          to={`/articles/${article.id}`}
          className="text-xl text-slate-800 font-bold hover:underline"
        >
          {article.title.length > 65
            ? article.title.slice(0, 65) + "..."
            : article.title}
        </Link>
      </div>
      <div className="w-full h-full flex flex-col justify-between items-start gap-5">
        <p className="text-slate-600">
          {article.text.length > 200
            ? HTMLReactParser(removeStyles(article.text.slice(0, 200) + "..."))
            : HTMLReactParser(removeStyles(article.text))}
        </p>
        <div>{author && <AuthorCard author={author} />}</div>
      </div>
    </div>
  );
}
