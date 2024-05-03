import React, { useContext } from "react";
import { ArticleProps } from "../../../context/ContextType";
import { Link, useNavigate } from "react-router-dom";
import { NewsContext } from "../../../context/NewsContext";
import ArticleCategoryTitle from "../ArticleCategoryTitle/ArticleCategoryTitle";

type ArticleSidebarLatestProps = {
  articles: ArticleProps[] | undefined;
  text: string;
  recommend: boolean;
};

export default function ArticleSidebarLatest({
  articles,
  text,
  recommend,
}: ArticleSidebarLatestProps) {
  const { setCategory } = useContext(NewsContext) || {};
  const navigate = useNavigate();

  if (!setCategory || !articles) return;

  const goToArticles = () => {
    setCategory("");
    navigate("/articles");
  };

  let displayedArticles: ArticleProps[];

  if (recommend) {
    displayedArticles = randomSort([...articles]);
  } else {
    displayedArticles = articles.slice(0, 5);
  }

  function randomSort<T>(array: T[]): T[] {
    return array.slice().sort(() => Math.random() - 0.5);
  }

  return (
    <div className="w-full flex flex-col gap-5 rounded-lg">
      <ArticleCategoryTitle title={text} />
      <ul className="flex flex-col justify-start items-start gap-0 list-none">
        {displayedArticles
          ?.map((art) => (
            <Link
              to={`/articles/${art.id}`}
              key={art.id}
              className="w-full bg-white hover:bg-zinc-100 flex justify-start items-center group gap-4 py-3 border-b first:border-t"
            >
              <div className="w-full flex justify-start items-center group-hover:underline leading-5 gap-3 truncate ...">
                <img
                  src={art.image}
                  alt=""
                  className="min-w-8 max-w-8 min-h-8 max-h-8 object-cover"
                />
                <p className="text-sm truncate ...">{art.title}</p>
              </div>
              <div className="text-xs">
                {new Date(art.createdAt).toLocaleDateString()}
              </div>
            </Link>
          ))
          .slice(0, 5)}
      </ul>
      {!recommend && (
        <button
          type="button"
          className="w-full flex justify-end underline"
          onClick={goToArticles}
        >
          See all articles
        </button>
      )}
    </div>
  );
}
