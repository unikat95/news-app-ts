import React, { ChangeEvent, useContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { NewsContext } from "../../context/NewsContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import PopoutMsg from "../PopoutMsg/PopoutMsg";
import JoditEditor from "jodit-react";

export default function CreateArticle() {
  const { currentUser, setOpenPopout } = useContext(NewsContext) || {};
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleCreateArticle = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !text || !image) return;

    const artId = uuidv4();

    const articleData = {
      id: artId,
      author: currentUser?.id,
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
    setLoading(false);

    if (setOpenPopout) {
      setOpenPopout(true);
    }
  };

  useEffect(() => {
    if (!title || !text || !image) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [title, text, image]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTextChange = (newValue: string) => {
    setText(newValue);
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  return (
    <>
      <PopoutMsg message="Article created successfully" />
      <div className="w-full h-auto flex flex-col justify-center items-center bg-white p-5 gap-5 md:p-10 md:gap-10 overflow-auto">
        <h1 className="w-full h-auto text-2xl text-slate-700 font-medium">
          Create article
        </h1>
        <div className="w-[100%] h-auto rounded-md">
          <form className="w-full flex flex-col justify-center items-end gap-5">
            <div className="w-full h-full flex flex-col gap-3 relative">
              <label htmlFor="title" className="w-full">
                <p className="text-sm">Title: </p>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title..."
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full p-2 rounded-md bg-slate-100 outline-none"
                />
              </label>
              <label htmlFor="image" className="w-full">
                <p className="text-sm">Image:</p>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={image}
                  onChange={handleImageChange}
                  placeholder="image..."
                  className="w-full p-2 rounded-md bg-slate-100 outline-none"
                />
              </label>
              <label htmlFor="text" className="w-full">
                <p className="text-sm">Text:</p>
                <JoditEditor value={text} onChange={handleTextChange} />
              </label>
              {loading && (
                <div className="w-full h-full bg-white bg-opacity-70 absolute flex justify-center items-center top-0 left-0">
                  <LoadingSpinner />
                </div>
              )}
            </div>
            <div>
              <button
                disabled={disabled}
                className={`w-auto flex bg-black hover:bg-slate-800 text-white px-4 py-2 rounded-md ${
                  disabled &&
                  "bg-slate-400 hover:bg-slate-400 cursor-not-allowed"
                }`}
                onClick={handleCreateArticle}
              >
                Create article
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
