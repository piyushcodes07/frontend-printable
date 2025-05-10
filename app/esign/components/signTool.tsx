import React, { useState } from "react";
import {
  PenLine,
  Calendar,
  CheckSquare,
  Type,
  MoreVertical,
} from "lucide-react";
// import UploadSign from "./uploadSign";
import dynamic from "next/dynamic";

const UploadSign = dynamic(() => import("./uploadSign"), {
  ssr: false,
});

import { useUser } from "@clerk/clerk-react";
import { useSignUrl } from "../useSign";

const SigningTool = () => {
  const {
    signImages,
    setCurrentSignIndex,
    setSignDragging,
    addSign,
    currentSlide,
  } = useSignUrl();
  const { isLoaded, user } = useUser();
  const [uploadSign, setUploadSign] = useState(false);
  const closeUploadSign = () => {
    setUploadSign(false);
  };

  const handleInitials = () => {
    const options = {
      type: "initials" as "initials",
      value: "demo",
      signSize: { width: 60, height: 20 },
      position: { x: 200, y: 200, pageIndex: currentSlide, fontSize: 12 },
    };
    addSign(options);
  };

  const handleAddText = () => {
    const options = {
      type: "text" as "text",
      value: "Sample text",
      signSize: { width: 100, height: 30 },
      position: { x: 150, y: 200, pageIndex: currentSlide, fontSize: 14 },
    };
    addSign(options);
  };

  const handleAddDate = () => {
    const options = {
      type: "date" as "date",
      value: new Date().toISOString().split("T")[0],
      signSize: { width: 100, height: 30 },
      position: { x: 150, y: 240, pageIndex: currentSlide, fontSize: 14 },
    };
    addSign(options);
  };

  const handleAddCheckbox = () => {
    const options = {
      type: "checkbox" as "checkbox",
      value: false,
      signSize: { width: 20, height: 20 },
      position: { x: 150, y: 280, pageIndex: currentSlide, fontSize: 14 },
    };
    addSign(options);
  };

  if (!isLoaded) {
    return <p className="center">Loading...</p>;
  }

  return (
    <section className="signTool">
      {uploadSign && <UploadSign removeUploadSign={closeUploadSign} />}

      <div className="rounded-xl shadow p-4 space-y-4 font-sans">
        <div className="flex items-center">
          <img
            src={user?.imageUrl}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="ml-2 text-sm font-medium text-gray-800 truncate">
            {user?.primaryEmailAddress?.emailAddress}
          </div>
          <span className="ml-1 text-sm text-gray-500 font-semibold">
            (You)
          </span>
          <button className="ml-auto text-gray-600">
            <MoreVertical size={18} />
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <button
            className="w-full flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg hover:bg-gray-200 transition"
            onClick={() => setUploadSign(true)}
          >
            <div className="flex items-center space-x-2">
              <PenLine size={16} />
              <span className="text-gray-800">Your sign</span>
            </div>
            <span className="text-gray-500 text-xl font-bold">+</span>
          </button>

          {signImages && (
            <div className="flex flex-row flex-wrap">
              {signImages.map((sign, index) => (
                <img
                  key={index}
                  src={sign}
                  alt="Signature"
                  className="cursor-move w-[40%]"
                  draggable
                  onDragStart={() => {
                    setSignDragging(true);
                    setCurrentSignIndex(index);
                  }}
                />
              ))}
            </div>
          )}

          <ButtonItem
            icon={<PenLine size={16} />}
            label="Your Initials"
            handleClickOnInitials={handleInitials}
          />
          <StaticItem
            icon={<Type size={16} />}
            label="Text"
            onClick={handleAddText}
          />
          <StaticItem
            icon={<Calendar size={16} />}
            label="Date"
            onClick={handleAddDate}
          />
          <StaticItem
            icon={<CheckSquare size={16} />}
            label="Checkbox"
            onClick={handleAddCheckbox}
          />
        </div>
      </div>
    </section>
  );
};

const ButtonItem = ({ icon, label, handleClickOnInitials }: any) => (
  <button
    className="w-full flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg hover:bg-gray-200 transition"
    onClick={handleClickOnInitials}
  >
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-gray-800">{label}</span>
    </div>
    <span className="text-gray-500 text-xl font-bold">+</span>
  </button>
);

const StaticItem = ({ icon, label, onClick }: any) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-2 bg-gray-100 px-4 py-3 rounded-lg hover:bg-gray-200 transition"
  >
    {icon}
    <span className="text-gray-800">{label}</span>
  </button>
);

export default SigningTool;
