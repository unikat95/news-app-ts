import { FaUsers, FaPencilAlt } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";

export const APLinks = [
  {
    id: 1,
    href: "/admin-panel/users",
    text: "Users",
    linkIcon: FaUsers,
  },
  {
    id: 2,
    href: "/admin-panel/articles-list",
    text: "Articles",
    linkIcon: IoNewspaper,
  },
  {
    id: 3,
    href: "/admin-panel/create-article",
    text: "CreateArticle",
    linkIcon: FaPencilAlt,
  },
];
