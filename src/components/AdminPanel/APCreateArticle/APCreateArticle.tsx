import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { v4 as uuidv4 } from "uuid";

import JoditEditor from "jodit-react";

import { doc, setDoc } from "firebase/firestore";
import { NewsContext } from "../../../context/NewsContext";
import { db } from "../../../config/Firebase";
import PopoutMsg from "../../PopoutMsg/PopoutMsg";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import APCreateArticleInput from "../APCreateArticleInput/APCreateArticleInput";
import APCreateArticleSelect from "../APCreateArticleSelect/APCreateArticleSelect";

export default function APCreateArticle() {
  const { currentUser, setOpenPopout } = useContext(NewsContext) || {};
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleCreateArticle = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !text || !image || !category) return;

    const artId = uuidv4();

    const articleData = {
      id: artId,
      author: currentUser?.id,
      title: title,
      text: text,
      image: image,
      category: category,
      comments: [],
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
    if (
      !title ||
      !text ||
      text === "<p><br></p>" ||
      !image ||
      category === ""
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [title, text, image, category]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTextChange = (newValue: string) => {
    setText(newValue);
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <PopoutMsg message="Article created successfully" />
      <div className="w-full h-full flex flex-col justify-start items-center bg-white p-5 gap-5 md:p-10 md:gap-10">
        <h1 className="w-full h-auto text-2xl text-slate-700 font-medium">
          Create article
        </h1>
        <div className="w-[100%] h-full flex flex-col justify-start items-start rounded-md  overflow-hidden">
          <form className="w-full h-full flex flex-col justify-center items-end gap-5 overflow-hidden">
            <div className="w-full h-full flex flex-col gap-3 relative overflow-auto">
              <APCreateArticleInput
                text="Title"
                htmlFor="title"
                value={title}
                handleChange={handleTitleChange}
              />
              <APCreateArticleInput
                text="Image"
                htmlFor="image"
                value={image}
                handleChange={handleImageChange}
              />
              <APCreateArticleSelect
                handleCategoryChange={handleCategoryChange}
              />
              <label className="w-full h-full">
                <p className="text-sm">Text:</p>
                <JoditEditor
                  config={useMemo(
                    () => ({
                      readonly: false,
                      placeholder: "text...",
                      minHeight: 413,
                      defaultLineHeight: 1.3,
                      sticky: false,
                      required: true,
                    }),
                    []
                  )}
                  value={text}
                  onChange={handleTextChange}
                />
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
                className="w-auto flex bg-black hover:bg-slate-800 text-white px-4 py-2 rounded-md disabled:bg-slate-400 disabled:cursor-not-allowed"
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
