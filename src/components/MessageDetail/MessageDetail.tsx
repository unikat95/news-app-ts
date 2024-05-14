import React from "react";
import AuthorCard from "../AuthorCard/AuthorCard";
import { MessageProps, UserProps } from "../../context/ContextType";

type MessageDetailProps = {
  messageAuthor: UserProps;
  message: MessageProps;
};

export default function MessageDetail({
  messageAuthor,
  message,
}: MessageDetailProps) {
  return (
    <div className="w-full flex flex-col justify-start items-start border-[1px] p-5 gap-5 text-nowrap">
      <div className="flex justify-center items-center gap-2">
        <AuthorCard
          author={messageAuthor}
          vertical={false}
          width="1.3rem"
          height="1.3rem"
          fontSize=".75rem"
          border="0"
          rank={true}
        />
        <div className="text-xs">
          {message?.createdAt && new Date(message.createdAt).toLocaleString()}
        </div>
      </div>
      <div className="text-xl font-semibold">{message?.title}</div>
      <div className="w-full text-wrap">{message?.message}</div>
    </div>
  );
}
