import React, { useContext } from "react";

import { IoMdClose } from "react-icons/io";
import { NewsContext } from "../../context/NewsContext";

type ModalProps = {
  children: React.ReactNode;
  close?: boolean;
};

export default function Modal({ children, close }: ModalProps) {
  const { isModalOpen, handleCloseModal } = useContext(NewsContext) || {};

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {isModalOpen && (
        <div className="w-[100dvw] h-screen flex justify-center items-center absolute top-0 left-0 bg-slate-900 bg-opacity-30">
          <div
            className="w-auto max-w-[50%] h-auto p-10 bg-white rounded-md relative"
            onClick={handleContentClick}
          >
            <div>
              {close && (
                <button
                  className="hover:bg-red-500 hover:text-white p-1 rounded-full absolute top-3 right-3"
                  onClick={handleCloseModal}
                >
                  <IoMdClose size="20" />
                </button>
              )}
            </div>
            <div className="flex flex-col gap-5">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
