import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArticleProps } from "../../../context/ContextType";

type ArticleImageProps = {
  article: ArticleProps | null;
};

export default function ArticleImage({ article }: ArticleImageProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const image = new Image();
    image.src = article?.image || "";
    image.onload = () => setImageLoaded(true);
  }, [article]);

  if (!article) return;

  return (
    <div className="w-full h-48 lg:h-[30rem]">
      {!imageLoaded && (
        <div className="w-full h-full bg-gray-400 animate-pulse"></div>
      )}

      <Link to={article?.image} target="_blank">
        <img
          src={article?.image}
          alt=""
          className={`w-full h-full object-cover bg-center ${
            imageLoaded ? "" : "hidden"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </Link>
    </div>
  );
}
