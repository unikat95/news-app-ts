import React from "react";
import {
  MessageProps,
  MessageReplyProps,
  UserProps,
} from "../../context/ContextType";
import AuthorCard from "../AuthorCard/AuthorCard";

type MessageReplyItemProps = {
  rep: MessageReplyProps;
  author: UserProps;
  message: MessageProps;
};

export default function MessageReplyItem({
  rep,
  author,
  message,
}: MessageReplyItemProps) {
  return (
    <div
      key={rep.msg}
      className={`w-full flex flex-col justify-start ${
        rep.author === message.from ? "items-start" : "items-end"
      }`}
    >
      <div
        className={`w-full max-w-[90%] flex flex-col justify-start items-start border-[1px] p-5 gap-5 text-nowrap ${
          rep.author !== message.from && "bg-slate-100"
        }`}
      >
        <div className="flex justify-start items-center gap-2">
          <AuthorCard
            author={author}
            vertical={false}
            width="1.3rem"
            height="1.3rem"
            fontSize=".75rem"
            border="0"
            rank={true}
          />
          <div className="text-xs">
            {rep?.createdAt && new Date(rep.createdAt).toLocaleString()}
          </div>
        </div>
        <div className="w-full text-wrap">{rep?.msg}</div>
      </div>
    </div>
  );
}
