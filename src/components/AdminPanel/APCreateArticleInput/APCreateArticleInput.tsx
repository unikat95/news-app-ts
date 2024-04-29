import React, { ChangeEvent } from "react";

type APCreateArticleInputProps = {
  htmlFor: string;
  text: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function APCreateArticleInput({
  htmlFor,
  value,
  text,
  handleChange,
}: APCreateArticleInputProps) {
  return (
    <label htmlFor={htmlFor} className="w-full">
      <p className="text-sm">{text}: </p>
      <input
        type="text"
        name={htmlFor}
        id={htmlFor}
        placeholder="title..."
        value={value}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-zinc-100 outline-none"
      />
    </label>
  );
}
