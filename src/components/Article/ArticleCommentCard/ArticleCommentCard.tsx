import React, { SetStateAction } from "react";
import {
  CommentProps,
  ReplyProps,
  UserProps,
} from "../../../context/ContextType";
import { AiOutlineComment } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { FaCrown, FaReply } from "react-icons/fa";

type ArticleCommentCardProps = {
  author: UserProps | undefined;
  comment: CommentProps;
  artAuthor: string;
  replies?: ReplyProps[];
  openReplies: boolean;
  handleOpenReplies: () => void;
  openReply: boolean;
  setOpenReply: React.Dispatch<SetStateAction<boolean>>;
  setOpenReplies: React.Dispatch<SetStateAction<boolean>>;
};

export default function ArticleCommentCard({
  author,
  comment,
  artAuthor,
  replies,
  openReplies,
  handleOpenReplies,
  openReply,
  setOpenReply,
  setOpenReplies,
}: ArticleCommentCardProps) {
  const handleReply = () => {
    if (!openReplies) {
      setOpenReplies(true);
      setOpenReply(true);
    }

    if (openReplies) {
      setOpenReply(true);
    }

    if (openReply && openReplies) {
      setOpenReply(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-start bg-white p-5 gap-3 rounded-md shadow-sm relative">
      <div className="flex justify-center items-center gap-3">
        {author?.avatar ? (
          <>
            <img src={author.avatar} alt="" className="w-8 h-8 rounded-full" />
          </>
        ) : (
          <div className="w-8 h-8 bg-gray-500 bg-center bg-cover  border-slate-50 rounded-full flex justify-center items-center font-bold text-white shadow-sm text-xs">
            {author?.firstName.slice(0, 1).toUpperCase()}
            {author?.lastName.slice(0, 1).toUpperCase()}
          </div>
        )}
        <span className="font-medium">
          {author?.firstName} {author?.lastName}
        </span>
      </div>
      <div className="w-full h-auto flex">{comment.text}</div>
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex justify-start items-center gap-2">
          <div className="text-xs text-slate-600 font-medium">
            {new Date(comment.written).toLocaleString()}
          </div>
          {replies && (
            <button
              onClick={handleOpenReplies}
              className="flex justify-center items-center gap-1 text-slate-700 text-xs hover:underline hover:text-slate-900 border-l-[1px] border-slate-300 pl-2"
            >
              <AiOutlineComment size={20} />
              <span>{replies?.length} Replies</span>
              <IoIosArrowDown className={`${openReplies && "rotate-180"}`} />
            </button>
          )}
        </div>
        <button
          className="underline flex justify-center items-center gap-1 text-sm"
          onClick={handleReply}
        >
          Reply <FaReply size={12} />
        </button>
      </div>
      {author?.id === artAuthor && (
        <div className="absolute -top-2 -left-2 bg-[#f4f4f5] text-yellow-400 p-1 rounded-full">
          <FaCrown size={20} />
        </div>
      )}
    </div>
  );
}
