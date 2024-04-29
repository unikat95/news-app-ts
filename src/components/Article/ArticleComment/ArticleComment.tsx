import React, { useContext, useState } from "react";

import { NewsContext } from "../../../context/NewsContext";
import { ArticleProps, CommentProps } from "../../../context/ContextType";
import ArticleCommentCard from "../ArticleCommentCard/ArticleCommentCard";
import ArticleReplyCard from "../ArticleReplyCard/ArticleReplyCard";
import ArticleAddReply from "../ArticleAddReply/ArticleAddReply";

type ArticleCommentProps = {
  comment: CommentProps;
  artAuthor: string;
  article: ArticleProps;
};

export default function ArticleComment({
  comment,
  artAuthor,
  article,
}: ArticleCommentProps) {
  const { usersList } = useContext(NewsContext) || {};
  const [openReplies, setOpenReplies] = useState<boolean>(false);
  const [openReply, setOpenReply] = useState<boolean>(false);

  const author = usersList?.find((user) => user.id === comment.author);
  const replies = comment.replies || [];

  const handleOpenReplies = () => {
    if (!openReplies) {
      setOpenReplies(true);
    } else {
      setOpenReplies(false);
      setOpenReply(false);
    }
  };

  const handleCloseReply = () => {
    setOpenReply(false);
  };

  if (!author) return;

  return (
    <div className="w-full flex flex-col justify-end items-end gap-5">
      <ArticleCommentCard
        author={author}
        comment={comment}
        artAuthor={artAuthor}
        replies={replies}
        handleOpenReplies={handleOpenReplies}
        openReply={openReply}
        setOpenReply={setOpenReply}
        openReplies={openReplies}
        setOpenReplies={setOpenReplies}
      />
      {openReplies && replies.length > 0 && (
        <div className="w-[95%] flex flex-col justify-end items-end gap-5">
          {replies &&
            replies.map((rep) => {
              const repAuthor = usersList?.find(
                (user) => user.id === rep.author
              );

              return (
                <ArticleReplyCard
                  key={rep.id}
                  repAuthor={repAuthor}
                  comment={comment}
                  rep={rep}
                  article={article}
                />
              );
            })}
        </div>
      )}
      {openReply && (
        <ArticleAddReply
          article={article}
          parentCommentId={comment.id}
          handleCloseReply={handleCloseReply}
        />
      )}
    </div>
  );
}
