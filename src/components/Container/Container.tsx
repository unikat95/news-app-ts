import React from "react";
import { useLocation } from "react-router-dom";

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  const location = useLocation();

  if (location.pathname.startsWith("/admin-panel")) return children;

  return (
    <div className="w-full max-w-[1240px] min-h-[80dvh] flex flex-col justify-start items-center py-20 md:pt-32 px-5 xl:px-0">
      {children}
    </div>
  );
}
