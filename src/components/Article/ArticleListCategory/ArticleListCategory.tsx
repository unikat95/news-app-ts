import React from "react";
import { ArticleCategoryList } from "../ArticleCategoryList";
import ArticleCategoryItem from "../ArticleCategoryItem/ArticleCategoryItem";
import ArticleCategoryTitle from "../ArticleCategoryTitle/ArticleCategoryTitle";

export default function ArticleListCategory() {
  return (
    <div className="w-full flex flex-col gap-5 rounded-lg">
      <ArticleCategoryTitle title="Category" />
      <div className="w-full flex flex-col justify-center items-start">
        {ArticleCategoryList.map((cat) => (
          <ArticleCategoryItem key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
}
