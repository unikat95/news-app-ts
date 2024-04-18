import React, { ChangeEvent } from "react";

type EditProfileInputProps = {
  name: string;
  type: string;
  value: string;
  formData: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function EditProfileInput({
  name,
  type,
  value,
  formData,
  handleInputChange,
}: EditProfileInputProps) {
  return (
    <label htmlFor={value} className="w-full">
      <p className="text-slate-400">{name}</p>
      <input
        type={type}
        name={value}
        id={value}
        className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 outline-none"
        placeholder={`Enter your ${name.toLowerCase()}...`}
        value={formData}
        onChange={handleInputChange}
      />
    </label>
  );
}
