import React, { useContext } from "react";
import UserNavLink from "../../UserNavLink/UserNavLink";
import { NewsContext } from "../../../context/NewsContext";

export default function APNAvbar() {
  const { currentUser } = useContext(NewsContext) || {};
  return (
    <nav className="w-full h-auto bg-white flex justify-end items-end p-5 text-white shadow-md z-[99]">
      <div className="w-full flex justify-end items-center gap-5 text-black">
        <div className="text-sm">
          Welcome,{" "}
          <span className="font-medium">
            {currentUser?.firstName} {currentUser?.lastName}
          </span>
        </div>
        <UserNavLink adminPanel={true} />
      </div>
    </nav>
  );
}
