import React, { ChangeEvent, useContext, useState } from "react";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/Firebase";

import { ArticleProps } from "../../../context/ContextType";
import { NewsContext } from "../../../context/NewsContext";

import { v4 as uuidv4 } from "uuid";

type ArticleAddCommentProps = {
  article: ArticleProps;
};

export default function ArticleAddComment({ article }: ArticleAddCommentProps) {
  const { currentUser } = useContext(NewsContext) || {};
  const [message, setMessage] = useState<string>("");

  const handleAddComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!message) return;

    const newComment = {
      id: uuidv4(),
      author: currentUser?.id,
      text: message,
      written: new Date().toISOString(),
      replies: [],
    };

    await updateDoc(doc(db, "articles", article.id), {
      comments: [...article.comments, newComment],
    });

    setMessage("");
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  return (
    <div className="w-full bg-white rounded-md shadow-sm flex flex-col  p-5">
      <form
        action=""
        className="w-full flex flex-col justify-center items-end gap-3"
      >
        <label className="w-full flex justify-start">Comment:</label>
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
          Add comment
        </button>
      </form>
    </div>
  );
}
