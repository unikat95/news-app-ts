import React from "react";

import FooterNavItem from "../FooterNavItem/FooterNavItem";
import { ArticleProps } from "../../context/ContextType";

type FooterNavProps = {
  footerQuickLinks?: { id: number; to: string; text: string }[];
  footerLatestArticlesLinks?: ArticleProps[];
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
  return (
    <nav
      className={`${border} ${padding} border-slate-800 w-auto flex flex-col  gap-4`}
    >
      <h2 className="text-base text-slate-200">{text}</h2>
      <ul className="w-full flex flex-col gap-1 list-disc ml-4">
        {footerQuickLinks?.map((link) => (
          <FooterNavItem key={link.id} href={link.to} text={link.text} />
        ))}
        {footerLatestArticlesLinks?.map((link) => (
          <FooterNavItem
            key={link.id}
            href={`articles/${link.id}`}
            text={
              link.title.length > 30
                ? link.title.slice(0, 30) + "..."
                : link.title
            }
          />
        ))}
      </ul>
    </nav>
  );
}
