import React, { useContext } from "react";

import { NewsContext } from "../../../context/NewsContext";
import { useNavigate } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";

type ArticleCategoryItemProps = {
  cat: {
    id: number;
    name: string;
    value: string;
  };
};

export default function ArticleCategoryItem({ cat }: ArticleCategoryItemProps) {
  const { articles, setCategory } = useContext(NewsContext) || {};
  const navigate = useNavigate();

  const categoryLength = articles?.filter(
    (art) => art.category === cat.value
  ).length;

  if (!setCategory) return;

  const redirectToCategoryArticles = (category: string) => {
    setCategory(category);
    navigate("/articles");
  };

  return (
    <button
      type="button"
      className="w-full bg-white flex justify-between items-center group py-4 group border-b first:border-t"
      onClick={() => redirectToCategoryArticles(cat.value)}
    >
      <span className="group-hover:underline text-sm flex justify-center items-center gap-2">
        <BiSolidCategoryAlt size={16} className="text-zinc-400" />
        {cat.name}
      </span>
      <span className="text-xs">{categoryLength} articles</span>
    </button>
  );
}
