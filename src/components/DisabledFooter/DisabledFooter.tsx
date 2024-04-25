import React from "react";
import { useLocation } from "react-router-dom";

type DisabledFooterProps = {
  paths: string[];
  children: React.ReactNode;
};

export default function DisabledFooter({
  paths,
  children,
}: DisabledFooterProps) {
  const location = useLocation();

  const isNotAllowedPath = paths.some((path) =>
    location.pathname.startsWith(path)
  );

  if (isNotAllowedPath) return null;

  return <>{children}</>;
}
