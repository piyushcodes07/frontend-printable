'use client';

import { useState, useRef } from 'react';
import { FaChevronDown, FaFileAlt } from 'react-icons/fa';

const tools = [
  { label: 'AI PDF', img: '/ai-pdf.png', color: 'bg-green-200' },
  { label: 'Convert', img: '/convert.png', color: 'bg-indigo-200' },
  { label: 'Print', img: '/print.png', color: 'bg-yellow-200' },
  { label: 'Watermark', img: '/watermark.png', color: 'bg-orange-200' },
  { label: 'Compress', img: '/compress.png', color: 'bg-pink-200' },
  { label: 'E - Sign', img: '/e-sign.png', color: 'bg-blue-100' },
  { label: 'Summarize', img: '/summarize.png', color: 'bg-green-100' },
  { label: 'AI Scan', img: '/ai-scan.png', color: 'bg-purple-100' },
  { label: 'Unlock PDF', img: '/unlock.png', color: 'bg-gray-300' },
  { label: 'More', color: 'bg-black text-white' },
];

export default function HomePage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFromDeviceClick = () => {
    fileInputRef.current?.click();
    setDropdownOpen(false);
  };

  const handleFromDriveClick = () => {
    alert('Google Drive integration goes here');
    setDropdownOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center py-10 px-4 font-[Poppins]">
      {/* Search bar */}
      <div className="w-full max-w-6xl flex justify-center mb-8 px-4">
        <div className="w-full max-w-5xl flex items-center gap-3 bg-gray-100 rounded-full px-6 py-3 shadow-inner">
          <span className="text-2xl text-[#06044B] font-bold">🔍</span>
          <input
            type="text"
            placeholder="Search print, AI tools, convert and more……"
            className="flex-grow px-2 py-2 rounded-full bg-transparent outline-none text-sm text-[#06044B]"
          />
        </div>
      </div>

      {/* Upload Box */}
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="w-full bg-gradient-to-b from-[#DFFBE7] to-[#CDCDDB] min-h-[300px] flex items-center justify-center relative px-4">
          {/* Left Illustration */}
          <img
            src="/Left.png"
            alt="Left"
            className="absolute left-0 bottom-0 w-[20%] h-auto object-contain"
          />

          {/* Upload Box */}
          <div className="relative z-20 w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 translate-y-20 border border-gray-200">
            <div className="bg-[#F3F3F3] border-[3px] border-dashed border-[#06044B] rounded-2xl p-10 text-center">
              <p className="text-gray-700 font-medium mb-6 text-base">Drag & Drop your file here</p>

              <div className="flex items-center justify-center w-full mb-5">
                <div className="border-t border-gray-300 flex-grow mr-2" />
                <span className="text-gray-500 text-sm">or</span>
                <div className="border-t border-gray-300 flex-grow ml-2" />
              </div>

              <div className="relative inline-block">
                <button
                  className="bg-[#06044B] text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaFileAlt />
                  Choose Files
                  <FaChevronDown
                    className={`transition-transform ${
                      dropdownOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white border shadow-lg rounded-lg z-50">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={handleFromDeviceClick}
                    >
                      From Device
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={handleFromDriveClick}
                    >
                      From Google Drive
                    </button>
                  </div>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt"
              />

              <p className="mt-4 text-xs text-gray-500">
                Supported formats: .pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt<br />
                Max file size: 50MB
              </p>
            </div>
          </div>

          {/* Right Illustration */}
          <img
            src="/Right.png"
            alt="Right"
            className="absolute right-0 bottom-0 w-[20%] h-auto object-contain"
          />
        </div>
      </div>

      {/* Tool Icons */}
<div className="flex flex-wrap justify-center mt-28 gap-4 px-4">
  {tools.map((tool, idx) => (
    <div key={idx} className="flex flex-col items-center gap-1">
      <div
  className={`w-14 h-14 rounded-full ${tool.color} flex items-center justify-center shadow-md cursor-pointer
  transition-all duration-300 ease-in-out
  hover:scale-110 hover:animate-bounce`}
>

        {tool.img && (
          <img
            src={tool.img}
            alt={tool.label}
            className="w-6 h-6 object-contain"
          />
        )}
      </div>
      <div className="text-[11px] font-medium text-center">{tool.label}</div>
    </div>
  ))}
</div>
    </div>
  );
}
