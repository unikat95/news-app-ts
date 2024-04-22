import React from "react";
import { Link } from "react-router-dom";

type FooterNavItemProps = {
  href: string;
  text: string;
};

export default function FooterNavItem({ href, text }: FooterNavItemProps) {
  return (
    <li className="text-slate-200">
      <Link to={href}>{text}</Link>
    </li>
  );
}
