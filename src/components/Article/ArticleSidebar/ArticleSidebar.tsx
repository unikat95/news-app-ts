import React, { useContext } from "react";

import { ArticleProps } from "../../../context/ContextType";
import { NewsContext } from "../../../context/NewsContext";

import ArticleSidebarLatest from "../ArticleSidebarLatest/ArticleSidebarLatest";

type ArticleSidebarProps = {
  article: ArticleProps;
};

export default function ArticleSidebar({ article }: ArticleSidebarProps) {
  const { articles } = useContext(NewsContext) || {};

  const recommendArticles = articles?.filter(
    (art) => art.category === article.category
  );

  return (
    <div className="w-full flex flex-col lg:max-w-[360px] gap-7  sticky top-32">
      <ArticleSidebarLatest
        recommend={false}
        text="Recent articles"
        articles={articles}
      />
      <ArticleSidebarLatest
        text="Recommended articles"
        articles={recommendArticles}
        recommend={true}
      />
    </div>
  );
}
