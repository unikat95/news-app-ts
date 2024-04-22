import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { Link } from "react-router-dom";

export default function FooterSocialMedia() {
  return (
    <div className="w-auto flex flex-col gap-3">
      <p>Follow us on</p>
      <div className="flex gap-3 -ml-1">
        <Link to="/" className="text-slate-100 hover:text-slate-300">
          <AiFillInstagram size="40" />
        </Link>
        <Link to="/" className="text-slate-100 hover:text-slate-300">
          <AiFillFacebook size="40" />
        </Link>
        <Link to="/" className="text-slate-100 hover:text-slate-300">
          <AiFillTwitterSquare size="40" />
        </Link>
      </div>
    </div>
  );
}
