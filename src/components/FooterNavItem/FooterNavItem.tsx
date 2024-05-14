import React from "react";
import { Link } from "react-router-dom";

type FooterNavItemProps = {
  href: string;
  text: string;
};

export default function FooterNavItem({ href, text }: FooterNavItemProps) {
  return (
    <>
      <li className="text-slate-200">
        <p className="line-clamp-1 underline">
          <Link to={href}>{text}</Link>
        </p>
      </li>
    </>
  );
}
