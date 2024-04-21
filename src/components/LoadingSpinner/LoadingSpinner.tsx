import React from "react";

import { CgSpinner } from "react-icons/cg";

export default function LoadingSpinner() {
  return (
    <div className="animate-spin">
      <CgSpinner size={26} className="text-slate-500" />
    </div>
  );
}
