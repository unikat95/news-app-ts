import React, { useEffect, useState } from "react";
import { ArticleProps } from "../../context/ContextType";

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

  return (
    <div className="w-full h-48 lg:h-96">
      {!imageLoaded && (
        <div className="w-full h-full bg-gray-400 animate-pulse rounded-xl"></div>
      )}

      <img
        src={article?.image}
        alt=""
        className={`w-full h-full object-cover bg-center rounded-xl ${
          imageLoaded ? "" : "hidden"
        }`}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}
