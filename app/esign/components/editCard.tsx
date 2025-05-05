import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Trash2,
  ArrowLeftIcon as Arrow,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useSignUrl } from "../useSign";
import { sign } from "crypto";

function EditCard({ index, type }: { index: number; type: string }) {
  const { updateSign, removeSign, signs } = useSignUrl();
  const { user } = useUser();
  const [fontSize, setFontSize] = useState(22);
  const [textColor, setTextColor] = useState("#000000");
  return (
    <div className="w-[300px] bg-[#fff] -z-50 rounded-3xl card-shadow  flex flex-col  space-x-2 border border-[#C9C9C9]">
      {/* Avatar & Name */}
      <div className="flex items-center space-x-2 p-2  w-full justify-between  ">
        <img
          src={user?.imageUrl || "/placeholder.svg"} // replace with actual avatar
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-sm font-medium text-gray-700">
          {user?.primaryEmailAddress?.emailAddress}
          <span className="text-xs font-semibold text-gray-500">(You)</span>
        </div>
        <Arrow className="w-4 h-4 ml-1 text-gray-500" />
      </div>

      {/* Controls */}
      <div className="flex px-3  justify-between  border-top">
        <div className="flex flex-1 center text-gray-700 text-sm gap-x-2">
          <span className="font-bold">{fontSize}</span>
          <div className="chevron flex flex-col">
            <ChevronUp
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                setFontSize(fontSize + 1);
                updateSign(index, { fontSize: fontSize + 1 });
              }}
            />

            <ChevronDown
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                setFontSize(fontSize - 1);
                updateSign(index, { fontSize: fontSize - 1 });
              }}
            />
          </div>
        </div>
        {type === "date" && (
          <div className="border flex flex-1 outline-none border-[#C9C9C9] border-t-transparent border-b-transparent border-r-transparent">
            <input
              type="date"
              name="date"
              value={signs[index].value as string}
              onChange={(e) => {
                updateSign(index, { value: e.target.value });
              }}
            />
          </div>
        )}

        <div className="colors  flex-1 center border border-[#C9C9C9] border-t-transparent border-b-transparent">
          <input
            type="color"
            id="colorPicker"
            name="color"
            value={textColor}
            onChange={(e) => {
              const newColor = e.target.value;
              setTextColor(newColor);
              updateSign(index, { color: newColor });
            }}
          />
        </div>
        <div className="delete flex-1 center">
          <Trash2
            className=" w-4 h-4 text-gray-500 cursor-pointer "
            onClick={() => removeSign(index)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditCard;
