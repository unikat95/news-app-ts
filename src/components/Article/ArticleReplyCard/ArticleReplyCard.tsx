import React from "react";
import {
  ArticleProps,
  CommentProps,
  ReplyProps,
  UserProps,
} from "../../../context/ContextType";
import { FaCrown } from "react-icons/fa";

type ArticleReplyCardProps = {
  repAuthor: UserProps | undefined;
  comment: CommentProps;
  rep: ReplyProps;
  article: ArticleProps;
};

export default function ArticleReplyCard({
  repAuthor,
  comment,
  rep,
}: ArticleReplyCardProps) {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-start bg-white p-5 gap-3 rounded-md shadow-sm relative">
        <div className="flex justify-center items-center gap-3">
          {repAuthor?.avatar ? (
            <>
              <img
                src={repAuthor.avatar}
                alt=""
                className="w-8 h-8 rounded-full"
              />
            </>
          ) : (
            <div className="w-8 h-8 bg-gray-500 bg-center bg-cover  border-slate-50 rounded-full flex justify-center items-center font-bold text-white shadow-sm text-xs">
              {repAuthor?.firstName.slice(0, 1).toUpperCase()}
              {repAuthor?.lastName.slice(0, 1).toUpperCase()}
            </div>
          )}
          <span className="font-medium">
            {repAuthor?.firstName} {repAuthor?.lastName}
          </span>
        </div>
        <div className="w-full h-auto flex">{rep.text}</div>
        <div className="w-full flex justify-start items-center gap-2">
          <div className="text-xs text-slate-600 font-medium">
            {new Date(rep.written).toLocaleString()}
          </div>
        </div>
        {repAuthor?.id === comment.author && (
          <div className="absolute -top-2 -left-2 bg-[#f4f4f5] text-yellow-400 p-1 rounded-full">
            <FaCrown size={20} />
          </div>
        )}
      </div>
    </>
  );
}
