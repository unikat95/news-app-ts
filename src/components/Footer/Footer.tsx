import React, { useContext } from "react";

import {
  footerQuickLinks,
  getLatestArticles,
} from "../FooterNavLinks/FooterNavLinks";
import { NewsContext } from "../../context/NewsContext";

import FooterNav from "../FooterNav/FooterNav";
import FooterSocialMedia from "../FooterSocialMedia/FooterSocialMedia";

export default function Footer() {
  const { sortedArticles } = useContext(NewsContext) || {};

  if (!sortedArticles) return;

  const latestArticles = getLatestArticles(sortedArticles);

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center bg-zinc-900 text-white text-sm relative bottom-0 ">
      <div className="w-full max-w-[1300px] h-full flex justify-start items-start py-14 px-5 xl:px-0 gap-10">
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-20 lg:gap-10">
          <div className="w-full flex gap-10 md:gap-20">
            <FooterNav
              footerQuickLinks={footerQuickLinks}
              text="Quick links"
              padding="pr-10 md:pr-20"
              border="border-r-2"
            />
            <FooterNav
              footerLatestArticlesLinks={latestArticles}
              text="Latest articles"
            />
          </div>
          <FooterSocialMedia />
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center bg-zinc-950 py-5">
        <div>&copy; Copyright 2024 NewsApp. All Rights Reserved</div>
      </div>
    </div>
  );
}
