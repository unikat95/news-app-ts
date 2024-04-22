import React from "react";
import { ArticleProps } from "../../context/ContextType";
import { Link } from "react-router-dom";

type UserArticleCardProps = {
  article: ArticleProps | null;
};

export default function UserArticleCard({ article }: UserArticleCardProps) {
  return (
    <>
      {article && (
        <Link
          to={`/articles/${article.id}`}
          className="w-full flex flex-col bg-white hover:bg-blue-50 rounded-lg shadow-sm p-5 gap-3"
        >
          <div>
            <div className="text-xs text-blue-300 font-bold">
              {new Date(article.createdAt).toLocaleString()}
            </div>
            <div className="text-slate-600 font-bold hover:underline">
              {article.title}
            </div>
          </div>
          <div className="text-sm text-slate-500">
            {article?.text.length > 100
              ? article?.text.slice(0, 100) + "..."
              : article?.text}
          </div>
        </Link>
      )}
    </>
  );
}
