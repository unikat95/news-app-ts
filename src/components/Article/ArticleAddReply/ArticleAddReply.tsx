import React, { ChangeEvent, useContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { NewsContext } from "../../../context/NewsContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import { ArticleProps } from "../../../context/ContextType";

import { IoMdClose } from "react-icons/io";

type ArticleCommentReplyProps = {
  article: ArticleProps;
  parentCommentId: string;
  handleCloseReply: () => void;
};

export default function ArticleAddReply({
  article,
  parentCommentId,
  handleCloseReply,
}: ArticleCommentReplyProps) {
  const { currentUser } = useContext(NewsContext) || {};
  const [message, setMessage] = useState<string>("");

  const handleAddComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!message) return;

    const newReply = {
      id: uuidv4(),
      author: currentUser?.id,
      text: message,
      written: new Date().toISOString(),
    };

    const parentComment = article.comments.find(
      (comment) => comment.id === parentCommentId
    );

    if (parentComment) {
      const updatedComments = article.comments.map((comment) => {
        if (comment.id === parentCommentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      });

      await updateDoc(doc(db, "articles", article.id), {
        comments: updatedComments,
      });
    }

    setMessage("");
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  return (
    <div className="w-[90%] bg-white rounded-md shadow-sm flex flex-col p-5 relative">
      <form
        action=""
        className="w-full flex flex-col justify-center items-end gap-3"
      >
        <label className="w-full flex justify-start">Reply:</label>
        <textarea
          name="xd"
          id="xd"
          placeholder="comment..."
          cols={30}
          rows={4}
          className="w-full h-auto bg-slate-100 outline-none resize-none p-2"
          value={message}
          onChange={handleMessageChange}
        ></textarea>
        <button
          className="bg-gradient-to-tr from-blue-500 to-purple-500 px-4 py-2 rounded-md text-white hover:from-blue-600 hover:to-purple-600"
          onClick={handleAddComment}
          type="button"
        >
          Add reply
        </button>
      </form>
      <button
        className="absolute top-3 right-3 bg-slate-800 p-1 rounded-full text-white hover:bg-red-500"
        onClick={handleCloseReply}
      >
        <IoMdClose />
      </button>
    </div>
  );
}
