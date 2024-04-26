import React from "react";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";

type APLinkItemProps = {
  href: string;
  text: string;
  Icon?: IconType;
  open: boolean;
};

export default function APLinkItem({
  href,
  text,
  Icon,
  open,
}: APLinkItemProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li className="w-full h-auto flex justify-start items-center">
      <Link
        to={href}
        className={`w-full py-2 rounded-md flex justify-start items-center gap-4 px-4 ${
          open && "px-4 group"
        } text-white group ${
          isActive
            ? "bg-zinc-100 text-zinc-800 font-medium"
            : "bg-zinc-800 hover:bg-zinc-700 "
        }`}
      >
        {Icon && (
          <span className="block">
            <Icon
              size="24"
              className={`text-white ${isActive && "text-zinc-900"}`}
            />
          </span>
        )}
        <p
          className={`${
            !open ? "scale-0 lg:scale-100" : "scale-100 lg:scale-0"
          } duration-100 whitespace-nowrap origin-left`}
        >
          {text}
        </p>
      </Link>
    </li>
  );
}
