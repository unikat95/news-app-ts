import React, { ChangeEvent, useContext, useState } from "react";
import { MessageProps } from "../../context/ContextType";
import { NewsContext } from "../../context/NewsContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";

type MessageReplyProps = {
  message: MessageProps;
};

export default function MessageReplyForm({ message }: MessageReplyProps) {
  const { currentUser } = useContext(NewsContext) || {};
  const [replyMsg, setReplyMsg] = useState<string>("");
  const [showReply, setShowReply] = useState<boolean>(false);

  const handleSendReply = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const replyRef = doc(db, "messages", message.id);

    const replyData = {
      msg: replyMsg,
      author: currentUser?.id,
      createdAt: new Date().toISOString(),
      unread: true,
    };

    await updateDoc(replyRef, {
      replies: [...message.replies, replyData],
    });
  };

  const handleReplyMsgChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyMsg(e.target.value);
  };

  return (
    <>
      {!showReply && (
        <button
          onClick={() => setShowReply(true)}
          className="bg-black hover:bg-slate-900 text-white px-4 py-2"
        >
          Reply
        </button>
      )}
      {showReply && (
        <form className="w-full max-w-[80%] flex flex-col justify-center items-end gap-5 border-[1px] p-5">
          <textarea
            name="reply"
            id="reply"
            cols={30}
            rows={5}
            placeholder="Reply message..."
            value={replyMsg}
            onChange={handleReplyMsgChange}
            className="w-full border-[1px] outline-none p-2"
          ></textarea>
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-black hover:bg-slate-900 text-white px-4 py-2"
              onClick={handleSendReply}
            >
              Send message
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
              onClick={() => setShowReply(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}
