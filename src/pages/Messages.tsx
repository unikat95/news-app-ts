import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MessagesLinks } from "../config/MessagesLinks";
import MessagesItem from "../components/MessagesItem/MessagesItem";

export default function Messages() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/messages") {
      navigate("/messages/incoming-messages");
    }
  }, [navigate, location]);

  return (
    <div className="w-full flex flex-col md:flex-row justify-start items-start gap-5">
      <ul className="w-full md:w-auto flex flex-col justify-center items-center border-[1px] p-5 gap-2 text-nowrap">
        {MessagesLinks.map((link) => (
          <MessagesItem
            key={link.id}
            to={link.to}
            path={link.path}
            text={link.text}
            LinkIcon={link.linkIcon}
          />
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
