import React from "react";
import { useLocation } from "react-router-dom";

type DisabledNavbarProps = {
  paths: string[];
  children: React.ReactNode;
};

export default function DisabledNavbar({
  paths,
  children,
}: DisabledNavbarProps) {
  const location = useLocation();

  const isNotAllowedPath = paths.some((path) =>
    location.pathname.startsWith(path)
  );

  if (isNotAllowedPath) return null;

  return <>{children}</>;
}
