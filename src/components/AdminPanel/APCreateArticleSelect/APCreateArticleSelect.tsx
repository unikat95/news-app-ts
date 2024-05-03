import React, { ChangeEvent } from "react";
import { ArticleCategoryList } from "../../Article/ArticleCategoryList";

type APCreateArticleSelectProps = {
  handleCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function APCreateArticleSelect({
  handleCategoryChange,
}: APCreateArticleSelectProps) {
  return (
    <label htmlFor="categories" className="w-full">
      <p className="text-sm">Category:</p>
      <select
        id="categories"
        className="w-full p-2 rounded-md bg-zinc-100 outline-none"
        onChange={handleCategoryChange}
      >
        <option value="">Chose a category</option>
        {ArticleCategoryList.map((cat) => (
          <option key={cat.id} value={cat.value}>
            {cat.name}
          </option>
        ))}
      </select>
    </label>
  );
}
