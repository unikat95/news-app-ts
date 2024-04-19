import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="w-full h-full flex flex-col gap-5 md:p-5">{children}</div>
  );
}
