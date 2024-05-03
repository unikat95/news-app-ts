import React, { useContext } from "react";
import { NewsContext } from "../../context/NewsContext";
import LatestArticle from "../LatestArticle/LatestArticle";

export default function LatestArticles() {
  const { sortedArticles, usersList } = useContext(NewsContext) || {};

  return (
    <div className="w-full flex flex-col justify-center items-start gap-5 overflow-x-hidden">
      <h1 className="w-full h-auto relative after:absolute after:w-full after:h-1 after:bg-black after:-bottom-0 after:left-0 py-2">
        <span className="bg-black px-4 py-2 text-xl text-white font-medium">
          Latest articles
        </span>
      </h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-2">
        {sortedArticles
          ?.map((art) => {
            const author = usersList?.find((user) => user.id === art.author);
            return <LatestArticle key={art.id} art={art} author={author} />;
          })
          .slice(0, 1)}
        <div className="w-full flex flex-col gap-2">
          <div>
            {sortedArticles
              ?.map((art) => {
                const author = usersList?.find(
                  (user) => user.id === art.author
                );
                return <LatestArticle key={art.id} art={art} author={author} />;
              })
              .slice(1, 2)}
          </div>
          <div className="flex gap-2">
            {sortedArticles
              ?.map((art) => {
                const author = usersList?.find(
                  (user) => user.id === art.author
                );
                return <LatestArticle key={art.id} art={art} author={author} />;
              })
              .slice(2, 3)}
            {sortedArticles
              ?.map((art) => {
                const author = usersList?.find(
                  (user) => user.id === art.author
                );
                return <LatestArticle key={art.id} art={art} author={author} />;
              })
              .slice(3, 4)}
          </div>
        </div>
      </div>
    </div>
  );
}
