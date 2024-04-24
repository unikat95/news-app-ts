import { ArticleProps } from "../../context/ContextType";

export const footerQuickLinks = [
  {
    id: 1,
    to: "/",
    text: "Home",
  },
  {
    id: 2,
    to: "/articles",
    text: "Articles",
  },
  {
    id: 3,
    to: "/users",
    text: "Users",
  },
];

export function getLatestArticles(articles: ArticleProps[]) {
  if (!articles || !Array.isArray(articles)) return [];

  return articles;
}
