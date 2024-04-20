import React, { useContext } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { NewsContext } from "../../context/NewsContext";

type PopoutMsgProps = {
  message: string;
};

export default function PopoutMsg({ message }: PopoutMsgProps) {
  const { openPopout } = useContext(NewsContext) || {};
  return (
    <div
      className={`w-auto h-auto bg-green-500 text-white flex justify-between items-center fixed rounded-md text-sm overflow-hidden top-3 left-[50%] translate-x-[-50%] z-[999] duration-500 ${
        openPopout ? "translate-y-[10%]" : "translate-y-[-150%]"
      }`}
    >
      <div className="w-auto bg-green-600 text-green-300 p-3">
        <RiErrorWarningLine size="22" />
      </div>
      <div className="w-full flex justify-center items-center whitespace-nowrap px-3">
        {message}
      </div>
    </div>
  );
}
