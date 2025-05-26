"use client";
import React, { useState, useEffect } from "react";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import {
  BsEmojiHeartEyes,
  BsEmojiSmile,
  BsEmojiNeutral,
  BsEmojiFrown,
} from "react-icons/bs";

type FeedbackFormProp = {
  orderStatus: string;
  onSubmit: () => void;
};

export default function Orderfeedback({ orderStatus, onSubmit }: FeedbackFormProp) {
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (orderStatus === "delivered") {
      setIsModalOpen(true);
    }
  }, [orderStatus]);

  const handleRatingClick = (val: number) => {
    setRating(val);
  };

  const handleSubmit = () => {
    if (rating === 0 || reviewComment.trim() === "") {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setIsModalOpen(false);
    onSubmit(); // Switch to thank-you screen
  };

  return (
    <div className="relative">
      {showToast && (
        <div className="fixed top-20 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 w-[300px]">
          Please provide a rating and comment before submitting.
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20 flex justify-center items-center px-2">
          <div className="h-auto lg:w-[400px] md:w-[350px] sm:w-[300px] w-full px-4 py-4 rounded-[10px] shadow-2xl bg-white">
            <div className="flex justify-between border-b border-gray-400">
              <div className="flex gap-2 items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-[#06044B] flex justify-center items-center">
                  <HiOutlineChatAlt2 size={25} className="text-white" />
                </div>
                <p>Feedback</p>
              </div>
              <div className="flex items-center mb-4 cursor-pointer">
                <RxCross2 onClick={() => setIsModalOpen(false)} size={25} />
              </div>
            </div>

            <h1 className="text-[32px] font-bold text-center py-6">
              How are you Feeling?
            </h1>
            <p className="text-center font-semibold">
              Your input is valuable in helping us to understand your needs and tailor our service accordingly
            </p>

            <div className="flex gap-10 justify-center py-6">
              {[5, 4, 3, 2, 1].map((val) => {
                const Icon =
                  val === 5
                    ? BsEmojiHeartEyes
                    : val === 4
                    ? BsEmojiSmile
                    : val === 3
                    ? BsEmojiNeutral
                    : BsEmojiFrown;

                return (
                  <Icon
                    key={val}
                    size={25}
                    className={`cursor-pointer ${
                      rating === val ? "text-blue-500" : "text-[#06044B]"
                    }`}
                    onClick={() => handleRatingClick(val)}
                  />
                );
              })}
            </div>

            <div className="h-[100px] w-full justify-center px-4">
              <textarea
                placeholder="Add a Comment"
                className="h-full w-full rounded-lg px-3 py-2 resize-none bg-gray-400 outline-none"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              />
            </div>

            <div className="flex h-auto w-full justify-center px-4 py-4">
              <button
                className="bg-[#06044B] px-2 py-2 w-full rounded-[10px] cursor-pointer text-white"
                onClick={handleSubmit}
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
