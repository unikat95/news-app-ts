import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="w-full max-w-[1300px] min-h-[80dvh] flex flex-col justify-start items-center py-20 md:py-32 px-5 xl:px-0">
      {children}
    </div>
  );
}
