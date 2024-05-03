import React, { useContext } from "react";
import { ArticleProps } from "../../context/ContextType";
import { Link } from "react-router-dom";
import HTMLReactParser from "html-react-parser/lib/index";
import { NewsContext } from "../../context/NewsContext";

type UserArticleCardProps = {
  article: ArticleProps | null;
};

export default function UserArticleCard({ article }: UserArticleCardProps) {
  const { removeStyles } = useContext(NewsContext) || {};

  if (!removeStyles) return;

  return (
    <>
      {article && (
        <Link
          to={`/articles/${article.id}`}
          className="w-full flex flex-col bg-white hover:bg-blue-50 border-[1px] gap-3 p-5"
        >
          <div>
            <div className="text-xs text-blue-300 font-bold">
              {new Date(article.createdAt).toLocaleString()}
            </div>
            <div className="text-slate-600 font-bold hover:underline line-clamp-2">
              {article.title}
            </div>
          </div>
          <div className="text-sm text-slate-500 line-clamp-3">
            {HTMLReactParser(removeStyles(article?.text.slice(0, 100)))}
          </div>
        </Link>
      )}
    </>
  );
}
