import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  height: number;
};

export default function Container({ children, height }: ContainerProps) {
  return (
    <div
      className="w-full max-w-[1300px] min-h-[-webkit-fill-available] flex flex-col justify-center items-center gap-5 py-10"
      style={{ paddingTop: `${height}px` }}
    >
      {children}
    </div>
  );
}
