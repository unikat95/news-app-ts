import React from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

type MessagesItemProps = {
  to: string;
  path: string;
  text: string;
  LinkIcon: IconType;
};

export default function MessagesItem({
  to,
  path,
  text,
  LinkIcon,
}: MessagesItemProps) {
  return (
    <li className="w-full flex">
      <NavLink
        to={to}
        className={`w-full bg-slate-100 p-2 pr-4 flex justify-start items-center gap-2 ${
          location.pathname.includes(path) && "active-message"
        }`}
      >
        <LinkIcon />
        {text}
      </NavLink>
    </li>
  );
}
