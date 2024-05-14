import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";
import MessageReplyForm from "../MessageReplyForm/MessageReplyForm";
import MessageDetail from "../MessageDetail/MessageDetail";
import MessageReply from "../MessageReply/MessageReply";

export default function Message() {
  const { messageList, usersList } = useContext(NewsContext) || {};
  const { id } = useParams();

  const message = messageList?.find((msg) => msg.id === id);
  const messageAuthor = usersList?.find((user) => user.id === message?.from);

  if (!message || !messageAuthor) return;

  return (
    <div className="w-full flex flex-col justify-start items-end gap-5">
      <MessageDetail messageAuthor={messageAuthor} message={message} />
      <MessageReply message={message} />
      <MessageReplyForm message={message} />
    </div>
  );
}
