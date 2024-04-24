import React, { useContext } from "react";
import { UserProps } from "../../context/ContextType";
import { NewsContext } from "../../context/NewsContext";
import UserArticleCard from "../UserArticleCard/UserArticleCard";

type UserArticlesProps = {
  user: UserProps | null;
};

export default function UserArticles({ user }: UserArticlesProps) {
  const { sortedArticles } = useContext(NewsContext) || {};

  const userArticles = sortedArticles?.filter(
    (article) => article.author === user?.id
  );

  return (
    <>
      {userArticles && (
        <div className="w-full flex flex-col gap-5">
          <h1>User Articles:</h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {userArticles?.length > 0
              ? userArticles?.map((article) => (
                  <UserArticleCard key={article.key} article={article} />
                ))
              : "This user has no articles yet"}
          </div>
        </div>
      )}
    </>
  );
}
