import React, { useContext } from "react";

import FooterNavItem from "../FooterNavItem/FooterNavItem";
import { ArticleProps } from "../../context/ContextType";
import { Link } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";

type FooterNavProps = {
  footerQuickLinks?: { id: number; to: string; text: string }[];
  footerLatestArticlesLinks?:
    | ArticleProps[]
    | { id: number; name: string; value: string; title: string }[];
  text: string;
  padding?: string;
  border?: string;
};

export default function FooterNav({
  text,
  footerQuickLinks,
  footerLatestArticlesLinks,
  padding,
  border,
}: FooterNavProps) {
  const { currentUser } = useContext(NewsContext) || {};

  return (
    <nav
      className={`${border} ${padding} border-zinc-800 w-full flex flex-col  gap-4`}
    >
      <h2 className="text-base text-slate-200">{text}</h2>
      <ul className="w-full flex flex-col gap-2 pl-5">
        {footerQuickLinks?.map((link) => (
          <FooterNavItem key={link.id} href={link.to} text={link.text} />
        ))}
        {footerQuickLinks && currentUser?.isAdmin && (
          <li className="underline">
            <Link to="/admin-panel">Admin Panel</Link>
          </li>
        )}
        {footerLatestArticlesLinks?.map((link) => (
          <FooterNavItem
            key={link.id}
            href={`articles/${link.id}`}
            text={link.title}
          />
        ))}
      </ul>
    </nav>
  );
}
