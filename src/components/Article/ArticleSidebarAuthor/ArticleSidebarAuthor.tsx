import React from "react";
import AuthorCard from "../../AuthorCard/AuthorCard";
import { ArticleProps, UserProps } from "../../../context/ContextType";

type ArticleSidebarAuthorProps = {
  author: UserProps;
  article: ArticleProps;
};

export default function ArticleSidebarAuthor({
  author,
  article,
}: ArticleSidebarAuthorProps) {
  return (
    <div className="w-full bg-white flex flex-col justify-center items-center gap-3 rounded-lg shadow-sm">
      <AuthorCard author={author} vertical={true} />
      <div className="text-xs uppercase font-bold text-slate-400 mt-2">
        Posted: {new Date(article.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
