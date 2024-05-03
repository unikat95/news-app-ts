import React, { ChangeEvent, useContext, useState } from "react";

import { NewsContext } from "../context/NewsContext";

import { BsSortUpAlt, BsSortDown } from "react-icons/bs";

import { ArticleCategoryList } from "../components/Article/ArticleCategoryList";
import ArticlesItem from "../components/Article/ArticlesItem/ArticlesItem";

type ArticlesType = {
  slice?: number;
};

export default function Articles({ slice }: ArticlesType) {
  const {
    sortedArticles,
    usersList,
    removeStyles,
    category,
    setCategory,
    releaseSort,
    setReleaseSort,
  } = useContext(NewsContext) || {};

  const [imageLoadedStates, setImageLoadedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const setImageLoaded = (articleId: string, loaded: boolean) => {
    setImageLoadedStates((prev) => ({
      ...prev,
      [articleId]: loaded,
    }));
  };

  if (!removeStyles || !setCategory || !setReleaseSort) return;

  let articlesToDisplay = sortedArticles?.filter(
    (art) => !category || art.category === category
  );

  if (releaseSort) {
    articlesToDisplay = articlesToDisplay?.slice().reverse();
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleChangeSort = () => {
    setReleaseSort(!releaseSort);
  };

  const handleSetCategory = (category: string) => {
    setCategory(category);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-5">
      <div className="w-full flex justify-between items-center gap-5 text-sm">
        <select
          id="category"
          onChange={handleCategoryChange}
          className="p-2 border-r-8 border-black outline-none bg-black text-white"
          value={category}
        >
          <option value="">All categories</option>
          {ArticleCategoryList.map((cat) => (
            <option key={cat.id} value={cat.value}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleChangeSort}
          className="flex justify-center items-center gap-1 underline"
        >
          release date
          {!releaseSort ? <BsSortUpAlt size={20} /> : <BsSortDown size={20} />}
        </button>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-5">
        {articlesToDisplay?.length === 0
          ? "There are no articles for this category"
          : articlesToDisplay
              ?.map((article) => {
                const author = usersList?.find(
                  (user) => user.id === article.author
                );
                return (
                  <ArticlesItem
                    article={article}
                    author={author}
                    handleSetCategory={handleSetCategory}
                    setImageLoaded={setImageLoaded}
                    imageLoadedStates={imageLoadedStates}
                  />
                );
              })
              .slice(0, slice)}
      </div>
    </div>
  );
}
