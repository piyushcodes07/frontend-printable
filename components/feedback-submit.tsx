"use client";
import React, { useState } from "react";
import { HiOutlineChatAlt2 } from "react-icons/hi";

export default function FeedbackSubmit() {
  const [isModal, setIsModal] = useState(true);

  if (!isModal) return null;

  const handleClick = () => {
    setIsModal(false);
  };

  return (
    <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20 flex justify-center items-center">
      <div className="flex justify-center items-center h-screen w-full px-4">
        <div className="h-auto lg:w-[400px] md:w-[350px] sm:w-[300px] w-full shadow-2xl z-10 px-4 py-4 rounded-[10px] bg-white">
          <div className="flex justify-center">
            <HiOutlineChatAlt2 size={50} className="text-[#06044B]" />
          </div>
          <h2 className="text-center py-4 font-bold text-[24px]">Thank you</h2>
          <p className="text-center text-[14px]">
            This feedback helps us improve. We appreciate the time you took to
            send it!
          </p>
          <div className="w-full h-auto flex justify-center py-2">
            <button
              className="bg-[#06044B] px-2 py-2 text-white w-full rounded-[10px] cursor-pointer"
              onClick={handleClick}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
