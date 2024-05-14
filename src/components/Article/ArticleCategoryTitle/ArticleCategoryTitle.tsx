import React from "react";

type ArticleCategoryTitleProps = {
  title: string;
};

export default function ArticleCategoryTitle({
  title,
}: ArticleCategoryTitleProps) {
  return (
    <h1 className="w-full h-auto relative after:absolute after:w-full after:h-1 after:bg-black after:-bottom-0 after:left-0 py-2">
      <span className="bg-black px-4 py-2 text-base text-white font-medium">
        {title}
      </span>
    </h1>
  );
}
