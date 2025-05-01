'use client';

import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaFileAlt } from 'react-icons/fa';

const tools = [
  { label: 'AI PDF', img: '/ai-pdf.png', color: 'bg-[#61E987]' },
  { label: 'Convert', img: '/convert.png', color: 'bg-[#06044B]' },
  { label: 'Print', img: '/print.png', color: 'bg-[#FFD700]' },
  { label: 'Watermark', img: '/watermark.png', color: 'bg-gradient-to-b from-[#CFD9DF] to-[#E2EBF0]' },
  { label: 'Compress', img: '/compress.png', color: 'bg-gradient-to-b from-[#F093FB] to-[#F5576C]' },
  { label: 'E - Sign', img: '/e-sign.png', color: 'bg-gradient-to-b from-[#A8EDEA] to-[#FED6E3]' },
  { label: 'Summarize', img: '/summarize.png', color: 'bg-gradient-to-b from-[#0FD850] to-[#F9F047]' },
  { label: 'AI Scan', img: '/ai-scan.png', color: 'bg-gradient-to-b from-[#BDC2E8] to-[#E6DEE9E6]' },
  { label: 'Unlock PDF', img: '/unlock.png', color: 'bg-gradient-to-b from-[#517FA4] to-[#243949]' },
  { label: 'More', color: 'bg-[#000000] text-white' },
];

export default function HomePage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const handleFromDeviceClick = () => {
    fileInputRef.current?.click();
    setDropdownOpen(false);
  };

  const handleFromDriveClick = () => {
    alert('Google Drive integration goes here');
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-10 px-4 font-[Poppins]">
      {/* Search bar */}
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

      {/* Upload Box */}
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="w-full bg-gradient-to-b from-[#DFFBE7] to-[#CDCDDB] min-h-[300px] flex items-center justify-center relative px-4">
          <img src="/Left.png" alt="Left" className="absolute left-0 bottom-0 w-[20%] h-auto object-contain" />

          <div className="relative z-20 w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 translate-y-20 border border-gray-200">
            <div className="bg-[#F3F3F3] border-[3px] border-dashed border-[#06044B] rounded-2xl p-10 text-center">
              <p className="text-gray-700 font-medium mb-6 text-base">Drag & Drop your file here</p>

              <div className="flex items-center justify-center w-full mb-5">
                <div className="border-t border-gray-300 flex-grow mr-2" />
                <span className="text-gray-500 text-sm">or</span>
                <div className="border-t border-gray-300 flex-grow ml-2" />
              </div>

              <div className="relative inline-block" ref={dropdownMenuRef}>
                <button
                  className="bg-[#06044B] text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm font-medium relative"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaFileAlt />
                  Choose Files
                  <div className="h-6 border-l border-white mx-2 self-stretch" />
                  <FaChevronDown
                    className={`
                      text-lg transition-transform duration-300
                      ${dropdownOpen ? 'rotate-180' : 'rotate-0'}
                      group-hover:rotate-180
                    `}
                  />
                </button>

                {dropdownOpen && (
  <div className="absolute left-0 top-full mt-2 w-48 bg-white border shadow-lg rounded-lg z-50">
    <button
      className="w-full text-left px-4 py-2 text-sm text-gray-800 transition-all duration-500 
                 hover:bg-[#06044B] hover:text-white"
      onClick={handleFromDeviceClick}
    >
      From Device
    </button>
    <button
      className="w-full text-left px-4 py-2 text-sm text-gray-800 transition-all duration-500 
                 hover:bg-[#06044B] hover:text-white"
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

          <img src="/Right.png" alt="Right" className="absolute right-0 bottom-0 w-[20%] h-auto object-contain" />
        </div>
      </div>

      {/* Tool Icons */}
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
            <div className="text-[11px] font-medium text-center">{tool.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
