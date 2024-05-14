import React, { useContext } from "react";
import { MessageProps } from "../../context/ContextType";
import { NewsContext } from "../../context/NewsContext";
import MessageReplyItem from "../MessageReplyItem/MessageReplyItem";

type MessageReplyType = {
  message: MessageProps;
};

export default function MessageReply({ message }: MessageReplyType) {
  const { usersList } = useContext(NewsContext) || {};

  return (
    <div className="w-full flex flex-col justify-start items-start gap-5">
      {message.replies.map((rep, index) => {
        const author = usersList?.find((user) => user.id === rep.author);
        if (!author) return;
        return (
          <MessageReplyItem
            key={index}
            rep={rep}
            author={author}
            message={message}
          />
        );
      })}
    </div>
  );
}
