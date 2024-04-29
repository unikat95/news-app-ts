import React, { ChangeEvent } from "react";

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
        <option value="world">World</option>
        <option value="gaming">Gaming</option>
        <option value="sport">Sport</option>
        <option value="culture">Culture</option>
        <option value="traveling">Traveling</option>
        <option value="politics">Politics</option>
      </select>
    </label>
  );
}
