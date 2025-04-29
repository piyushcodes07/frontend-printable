"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LeftSectionElement from "./LeftSectionElement";
import RightSectionElement from "./RightSectionElement";

interface ConvertDropDownProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

export default function ConvertDropdown({
  isOpen,
  onToggle,
}: ConvertDropDownProps) {
  const [activeSection, setActiveSection] = useState<"from-pdf" | "to-pdf">(
    "from-pdf"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative">
      <button
        onClick={() => onToggle(!isOpen)}
        className="px-3 py-2 text-sm font-medium flex items-center"
      >
        Convert
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-6 w-[655px] h-[421px] bg-[#E6E6ED] text-black rounded-md shadow-xl z-50 p-4 flex gap-4"
        >
          {/* left section - original styling maintained */}
          <div className="bg-[#FFFFFF] rounded-md z-50 p-4 w-3/5">
            <h5 className="text-xs mb-4">Convert</h5>
            <div className="flex flex-col space-y-2">
              <LeftSectionElement
                text="Convert from PDF"
                onClick={() => setActiveSection("from-pdf")}
                src="/ai.png"
              />
              <LeftSectionElement
                text="Convert to PDF"
                onClick={() => setActiveSection("to-pdf")}
                src="/ai.png"
              />
            </div>
          </div>

          {/* right section */}
          <div className="bg-[#FFFFFF] rounded-md z-50 p-4 w-2/5 transition-all">
            {activeSection === "from-pdf" ? (
              <>
                {/* Convert from pdf */}
                <h5 className="text-xs mb-4">Convert from pdf</h5>
                <div className="flex flex-col space-y-2">
                  <RightSectionElement text="PDF to Word" src="/docx.png" />
                  <RightSectionElement text="PDF to Excel" src="/excel.png" />
                  <RightSectionElement text="PDF to PPT" src="/ppt.png" />
                  <RightSectionElement text="PDF to JPG" src="/img.png" />
                </div>
              </>
            ) : (
              <>
                {/* Convert to pdf */}
                <h5 className="text-xs mb-4">Convert to pdf</h5>
                <div className="flex flex-col space-y-2">
                  <RightSectionElement text="Word to PDF" src="/docx.png" />
                  <RightSectionElement text="Excel to PDF" src="/excel.png" />
                  <RightSectionElement text="PPT to PDF" src="/ppt.png" />
                  <RightSectionElement text="JPG to PDF" src="/img.png" />
                  <RightSectionElement text="PDF OCR" src="/ocr.png" />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
