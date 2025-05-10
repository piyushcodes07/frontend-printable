"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaFileAlt } from "react-icons/fa";
import PageCard from "./Pagecard";
import UplodeBox from "./UplodeBox";

const tools = [
  { label: "AI PDF", img: "/ai-pdf.png", color: "bg-[#61E987]" },
  { label: "Convert", img: "/convert.png", color: "bg-[#06044B]" },
  { label: "Print", img: "/print.png", color: "bg-[#FFD700]" },
  {
    label: "Watermark",
    img: "/watermark.png",
    color: "bg-gradient-to-b from-[#CFD9DF] to-[#E2EBF0]",
  },
  {
    label: "Compress",
    img: "/compress.png",
    color: "bg-gradient-to-b from-[#F093FB] to-[#F5576C]",
  },
  {
    label: "E - Sign",
    img: "/e-sign.png",
    color: "bg-gradient-to-b from-[#A8EDEA] to-[#FED6E3]",
  },
  {
    label: "Summarize",
    img: "/summarize.png",
    color: "bg-gradient-to-b from-[#0FD850] to-[#F9F047]",
  },
  {
    label: "AI Scan",
    img: "/ai-scan.png",
    color: "bg-gradient-to-b from-[#BDC2E8] to-[#E6DEE9E6]",
  },
  {
    label: "Unlock PDF",
    img: "/unlock.png",
    color: "bg-gradient-to-b from-[#517FA4] to-[#243949]",
  },
  { label: "More", color: "bg-[#000000] text-white" },
];

export default function Page() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const handleFromDeviceClick = () => {
    fileInputRef.current?.click();
    setDropdownOpen(false);
  };

  const handleFromDriveClick = () => {
    alert("Google Drive integration goes here");
    setDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#F3F4F6] min-h-screen">
      <div className="w-full max-w-6xl mx-auto">
        <div className="w-full flex flex-col items-center py-10 px-4 font-[Poppins]">
          <div className="w-full max-w-6xl flex justify-center mb-8 px-4">
            <div className="w-full max-w-5xl flex items-center gap-3 bg-gray-100 rounded-full px-6 py-3 shadow-inner transition-all duration-[1000ms] ease-in-out hover:bg-[#E2E2E2] hover:border-4 hover:border-[#06044B] hover:shadow-2xl">
              <span className="text-2xl text-[#06044B] font-bold">🔍</span>
              <input
                type="text"
                placeholder="Search print, AI tools, convert and more……"
                className="flex-grow px-2 py-2 rounded-full bg-transparent outline-none text-sm text-[#06044B]"
              />
            </div>
          </div>

          <UplodeBox
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            dropdownMenuRef={dropdownMenuRef}
            fileInputRef={fileInputRef}
            handleFromDeviceClick={handleFromDeviceClick}
            handleFromDriveClick={handleFromDriveClick}
          />

          <div className="flex flex-wrap justify-center mt-28 gap-4 px-4">
            {tools.map((tool, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 group">
                <div
                  className={`w-14 h-14 rounded-full ${tool.color} flex items-center justify-center shadow-md 
                  group-hover:scale-110 transform transition duration-300 ease-in-out cursor-pointer`}
                >
                  {tool.img && (
                    <img
                      src={tool.img}
                      alt={tool.label}
                      className="w-8 h-8 object-contain transition duration-300 group-hover:scale-125"
                    />
                  )}
                </div>
                <div className="text-[11px] font-medium text-center">
                  {tool.label}
                </div>
              </div>
            ))}
          </div>

          <PageCard />
        </div>
      </div>
    </div>
  );
}
