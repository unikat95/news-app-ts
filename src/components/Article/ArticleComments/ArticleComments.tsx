import React, { useContext } from "react";

import { NewsContext } from "../../../context/NewsContext";
import { ArticleProps } from "../../../context/ContextType";
import ArticleComment from "../ArticleComment/ArticleComment";
import ArticleAddComment from "../ArticleAddComment/ArticleAddComment";

type ArticleCommentsProps = {
  article: ArticleProps;
};

export default function ArticleComments({ article }: ArticleCommentsProps) {
  const { currentUser } = useContext(NewsContext) || {};

  const sortedComments =
    article.comments && article.comments.length > 0
      ? article.comments.sort(
          (a, b) =>
            new Date(b.written).getTime() - new Date(a.written).getTime()
        )
      : [];

  return (
    <div className="w-full flex flex-col justify-center items-start gap-10">
      <h3>Comments:</h3>
      {sortedComments.length === 0 ? (
        <div className="w-full flex justify-center items-center">
          no one has commented on this article yet
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center gap-5">
          {sortedComments.map((comment) => (
            <ArticleComment
              key={comment.id}
              comment={comment}
              artAuthor={article.author}
              article={article}
            />
          ))}
        </div>
      )}
      {currentUser ? (
        <ArticleAddComment article={article} />
      ) : (
        <div className="w-full flex justify-center items-center">
          You must be logged in to write a comment
        </div>
      )}
    </div>
  );
}
