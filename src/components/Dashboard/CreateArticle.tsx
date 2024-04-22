import React, { ChangeEvent, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { UserProps } from "../../context/ContextType";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";

type CreateArticleProps = {
  user: UserProps | null;
};

export default function CreateArticle({ user }: CreateArticleProps) {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleCreateArticle = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!title || !text || !image) return;

    const artId = uuidv4();

    const articleData = {
      id: artId,
      author: user?.id,
      title: title,
      text: text,
      image: image,
      createdAt: new Date().toISOString(),
      key: uuidv4(),
    };

    await setDoc(doc(db, "articles", artId), articleData);

    setTitle("");
    setText("");
    setImage("");
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  return (
    <div className="w-full md:w-2/4 bg-white p-10 rounded-md">
      <form className="w-full flex flex-col gap-3">
        <label htmlFor="title">
          <p className="text-sm">Title: </p>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="title..."
            value={title}
            onChange={handleTitleChange}
            className="w-full p-2 rounded-md bg-gray-100 outline-none"
          />
        </label>
        <label htmlFor="image">
          <p className="text-sm">Image:</p>
          <input
            type="text"
            name="image"
            id="image"
            value={image}
            onChange={handleImageChange}
            placeholder="image..."
            className="w-full p-2 rounded-md bg-gray-100 outline-none"
          />
        </label>
        <label htmlFor="text">
          <p className="text-sm">Text:</p>
          <textarea
            name="text"
            id="text"
            placeholder="text..."
            cols={30}
            rows={10}
            value={text}
            onChange={handleTextChange}
            className="w-full p-2 rounded-md bg-gray-100 outline-none"
          ></textarea>
        </label>
        <button
          className="w-full flex justify-center items-center bg-black hover:bg-slate-800 text-white px-4 py-2 rounded-md"
          onClick={handleCreateArticle}
        >
          Create article
        </button>
      </form>
    </div>
  );
}
