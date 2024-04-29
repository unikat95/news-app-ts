import React from "react";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";

type APLinkItemProps = {
  href: string;
  text: string;
  Icon?: IconType;
  open: boolean;
  signOut?: () => void;
  handleToggleSidebar?: () => void;
};

export default function APLinkItem({
  href,
  text,
  Icon,
  open,
  signOut,
  handleToggleSidebar,
}: APLinkItemProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li className="w-full h-auto flex justify-start items-center">
      <Link
        to={href}
        className={`w-full py-2 rounded-md flex justify-start items-center gap-4 px-4 ${
          open && "px-4 group"
        } group ${
          isActive
            ? "bg-neutral-100 text-neutral-800 font-medium"
            : "bg-neutral-800 hover:bg-neutral-700"
        }`}
        onClick={signOut || handleToggleSidebar}
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
            !open ? "scale-0 lg:scale-100" : "scale-100 lg:scale-100"
          } duration-100 whitespace-nowrap origin-left`}
        >
          {text}
        </p>
      </Link>
    </li>
  );
}
