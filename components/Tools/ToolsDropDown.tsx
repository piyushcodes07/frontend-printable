"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LeftSectionElement from "../Convert/LeftSectionElement";
import RightSectionElement from "../Convert/RightSectionElement";

interface ToolsDropDownProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

type ActiveSection =
  | "AIPDF"
  | "View&Edit"
  | "Organize"
  | "AIPresenet"
  | "MoreTools";

const LEFT_FIXED_WIDTH = 369;
const LEFT_FIXED_HEIGHT = 412;

const DIVIDER_WIDTH = 12;

export default function ToolsDropDown({
  isOpen,
  onToggle,
}: ToolsDropDownProps) {
  const [activeSection, setActiveSection] = useState<ActiveSection>("AIPDF");

  const rightWidthMapping: { [key in ActiveSection]: number } = {
    AIPDF: 265,
    "View&Edit": 225,
    Organize: 241,
    AIPresenet: 211,
    MoreTools: 441,
  };

  const [rightWidth, setRightWidth] = useState<number>(
    rightWidthMapping[activeSection]
  );

  const containerWidth = LEFT_FIXED_WIDTH + DIVIDER_WIDTH + rightWidth;

  useEffect(() => {
    setRightWidth(rightWidthMapping[activeSection]);
  }, [activeSection]);

  // Click outside handler (remains unchanged)
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const renderRightSection = () => {
    switch (activeSection) {
      case "AIPDF":
        return (
          <>
            <h5 className="text-xs mb-4">AI PDF</h5>
            <div className="flex flex-col space-y-2">
              <RightSectionElement
                text="Chat With PDF"
                src="/AI-PDF/chat.png"
              />
              <RightSectionElement
                text="AI PDF Summarizer"
                src="/AI-PDF/summarize.png"
              />
              <RightSectionElement
                text="Translate PDF"
                src="/AI-PDF/translate.png"
              />
              <RightSectionElement
                text="AI Questions Generator"
                src="/AI-PDF/aiquestion.png"
              />
            </div>
          </>
        );
      case "View&Edit":
        return (
          <>
            <h5 className="text-xs mb-4">VIEW & EDIT</h5>
            <div className="flex flex-col space-y-2">
              <RightSectionElement
                text="Edit PDF"
                src="/VIEWANDEDIT/text.png"
              />
              <RightSectionElement
                text="Annote PDF"
                src="/VIEWANDEDIT/annote.png"
              />
              <RightSectionElement
                text="PDF Reader"
                src="/VIEWANDEDIT/reader.png"
              />
              <RightSectionElement
                text="Number Pages"
                src="/VIEWANDEDIT/number.png"
              />
              <RightSectionElement
                text="Crop PDF"
                src="/VIEWANDEDIT/crop.png"
              />
              <RightSectionElement
                text="Redact PDF"
                src="/VIEWANDEDIT/redact.png"
              />
              <RightSectionElement
                text="Watermark PDF"
                src="/VIEWANDEDIT/watermark.png"
              />
            </div>
          </>
        );
      case "Organize":
        return (
          <>
            <h5 className="text-xs mb-4">Organize</h5>
            <div className="flex flex-col space-y-2">
              <RightSectionElement text="Merge PDF" src="/ORGANIZE/merge.png" />
              <RightSectionElement text="Split PDF" src="/ORGANIZE/split.png" />
              <RightSectionElement
                text="Rotate PDF"
                src="/ORGANIZE/rotate.png"
              />
              <RightSectionElement
                text="Delete Pages"
                src="/ORGANIZE/delete.png"
              />
              <RightSectionElement
                text="Extract PDF Pages"
                src="/ORGANIZE/extract.png"
              />
              <RightSectionElement
                text="Organize Pages"
                src="/ORGANIZE/organize.png"
              />
            </div>
          </>
        );
      case "AIPresenet":
        return (
          <>
            <h5 className="text-xs mb-4">AI Presentation Maker</h5>
            <div className="flex flex-col space-y-2">
              <RightSectionElement
                text="Generate"
                src="/AI-PRESENTATION/generate.png"
              />
              <RightSectionElement
                text="Single Slide"
                src="/AI-PRESENTATION/single.png"
              />
              <RightSectionElement
                text="Edit PPT"
                src="/AI-PRESENTATION/edit.png"
              />
            </div>
          </>
        );
      case "MoreTools":
        return (
          <>
            <div className="grid grid-cols-2 gap-x-8">
              {/* Left Column */}
              <div className="flex flex-col space-y-6">
                <div>
                  <h5 className="text-xs mb-2">Sign</h5>
                  <RightSectionElement text="Sign PDF" src="/tools/sign.png" />
                </div>
                <div>
                  <h5 className="text-xs mb-2">Compress</h5>
                  <RightSectionElement
                    text="Compress PDF"
                    src="/tools/compress.png"
                  />
                </div>
                <div>
                  <h5 className="text-xs mb-2">Scan</h5>
                  <RightSectionElement
                    text="PDF Scanner"
                    src="/tools/scanner.png"
                  />
                </div>
              </div>
              {/* Right Column */}
              <div className="flex flex-col space-y-6">
                <div>
                  <h5 className="text-xs mb-2">PDF Security</h5>
                  <div className="flex flex-col space-y-2">
                    <RightSectionElement
                      text="Unlock PDF"
                      src="/tools/unlock.png"
                    />
                    <RightSectionElement
                      text="Protect PDF"
                      src="/tools/lock.png"
                    />
                    <RightSectionElement
                      text="Flat PDF"
                      src="/tools/flat.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            <h5 className="text-xs mb-4">SELECT A TOOL</h5>
            <div className="text-sm text-gray-500">
              Please select a tool from the left menu
            </div>
          </>
        );
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => onToggle(!isOpen)}
        className="px-3 py-2 text-sm font-medium flex items-center"
      >
        Tool
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute  left-0 mt-6 bg-[#E6E6ED] text-black rounded-md shadow-xl z-50 p-4"
          style={{ width: containerWidth, height: LEFT_FIXED_HEIGHT }}
        >
          <div className="flex h-full">
            {/* Fixed Left Section */}
            <div
              className="bg-[#FFFFFF] rounded-md z-50 p-4 flex flex-col h-full"
              style={{
                width: LEFT_FIXED_WIDTH,
              }}
            >
              <h5 className="text-xs mb-4">Convert</h5>
              <div className="flex flex-col space-y-2 flex-1 overflow-hidden">
                <LeftSectionElement
                  text="AI PDF"
                  onClick={() => setActiveSection("AIPDF")}
                  src="/ai.png"
                />
                <LeftSectionElement
                  text="View & Edit"
                  onClick={() => setActiveSection("View&Edit")}
                  src="/ai.png"
                />
                <LeftSectionElement
                  text="Organize"
                  onClick={() => setActiveSection("Organize")}
                  src="/ai.png"
                />
                <LeftSectionElement
                  text="AI Presentation Maker"
                  onClick={() => setActiveSection("AIPresenet")}
                  src="/ai.png"
                />
                {/* More Tools toggle */}
                <div className="mt-auto pt-4">
                  <div
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                    onClick={() => setActiveSection("MoreTools")}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500">
                        More Tools
                      </span>
                    </div>
                    <Image src="/arrow.png" alt="" width={9} height={4.5} />
                  </div>
                </div>
              </div>
            </div>

            {DIVIDER_WIDTH > 0 && (
              <div
                className="bg-[#E6E6ED]"
                style={{ width: DIVIDER_WIDTH }}
              ></div>
            )}

            <div
              className="bg-[#FFFFFF] rounded-md z-50 p-4 h-full"
              style={{ width: rightWidth }}
            >
              {renderRightSection()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
