"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaChevronDown,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileImage,
  FaCompress,
  FaUpload,
  FaSignature,
  FaTruck,
} from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageCard from "@/components/HomePage/Shopcard";
import UplodeBox from "../components/HomePage/UplodeBox";
import Link from "next/link";
import { Span } from "next/dist/trace";

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

const routeMap = [
  {
    path: "/pdf/to/word",
    keywords: ["pdf", "word", "doc"],
    title: "PDF to Word",
    description: "Convert PDF documents to editable Word files",
    icon: FaFileWord,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    path: "/pdf/to/excel",
    keywords: ["pdf", "excel", "sheet", "xls"],
    title: "PDF to Excel",
    description: "Extract data from PDF to Excel spreadsheets",
    icon: FaFileExcel,
    color: "bg-green-500",
    gradient: "from-green-500 to-green-600",
  },
  {
    path: "/pdf/to/ppt",
    keywords: ["pdf", "ppt", "powerpoint"],
    title: "PDF to PowerPoint",
    description: "Convert PDF pages to PowerPoint slides",
    icon: FaFilePowerpoint,
    color: "bg-orange-500",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    path: "/pdf/to/image",
    keywords: ["pdf", "image", "jpg", "png"],
    title: "PDF to Image",
    description: "Convert PDF pages to high-quality images",
    icon: FaFileImage,
    color: "bg-purple-500",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    path: "/pdfcompress",
    keywords: ["pdf", "compress", "reduce"],
    title: "Compress PDF",
    description: "Reduce PDF file size without losing quality",
    icon: FaCompress,
    color: "bg-red-500",
    gradient: "from-red-500 to-red-600",
  },
  {
    path: "/drop-file",
    keywords: ["upload", "drop"],
    title: "Upload Files",
    description: "Upload and manage your documents",
    icon: FaUpload,
    color: "bg-indigo-500",
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    path: "/esign",
    keywords: ["sign", "pdf", "document", "signature", "esign"],
    title: "E-Sign Documents",
    description: "Add digital signatures to your documents",
    icon: FaSignature,
    color: "bg-teal-500",
    gradient: "from-teal-500 to-teal-600",
  },
  {
    path: "/print-and-deliver/user_2wnUNxZtME63CvOzZpEWF6nLm3a",
    keywords: ["print", "deliver", "post"],
    title: "Print & Deliver",
    description: "Print documents and deliver to your address",
    icon: FaTruck,
    color: "bg-yellow-500",
    gradient: "from-yellow-500 to-yellow-600",
  },
];

// Function to calculate Levenshtein distance using two matrix rows
function levenshteinTwoMatrixRows(str1: string, str2: string) {
  const m = str1.length;
  const n = str2.length;
  // Initialize two arrays to represent the matrix rows
  let prevRow = new Array(n + 1).fill(0);
  const currRow = new Array(n + 1).fill(0);
  // Initialize the first row with consecutive numbers
  for (let j = 0; j <= n; j++) {
    prevRow[j] = j;
  }
  // Dynamic programming to fill the matrix
  for (let i = 1; i <= m; i++) {
    currRow[0] = i;

    for (let j = 1; j <= n; j++) {
      // Check if characters at the current positions are equal
      if (str1[i - 1] === str2[j - 1]) {
        currRow[j] = prevRow[j - 1]; // No operation required
      } else {
        // Choose the minimum of three possible operations (insert, remove, replace)
        currRow[j] =
          1 +
          Math.min(
            currRow[j - 1], // Insert
            prevRow[j], // Remove
            prevRow[j - 1] // Replace
          );
      }
    }

    prevRow = [...currRow];
  }

  return currRow[n];
}

const spellingCorrector = (word: string) => {
  const dataSet = [
    "convert",
    "pdf",
    "excel",
    "jpg",
    "png",
    "word",
    "image",
    "compress",
    "upload",
    "sign",
    "esign",
    "signature",
    "deliver",
  ];
  let res;
  let Min = 99999;
  for (const all of dataSet) {
    const dist = levenshteinTwoMatrixRows(all, word);
    const prev = Min;
    Min = Math.min(Min, dist);
    if (prev != Min) res = all;
  }
  if (Min > word.length / 2) return word;
  return res;
};

const getRouteFromQuery = (query: string) => {
  const tokens = query
    .toLowerCase()
    .split(" ")
    .map((word) => spellingCorrector(word));
  let matchAccuracy = -1;
  let suggested_route = null;
  for (const route of routeMap) {
    const intersection = route.keywords.filter((value) =>
      tokens.includes(value)
    );
    const match_percentage = intersection.length / route.keywords.length;
    const prev = matchAccuracy;
    matchAccuracy = Math.max(matchAccuracy, match_percentage);
    if (prev != matchAccuracy) {
      suggested_route = route;
    }
  }
  if (matchAccuracy < 0.3) return null;

  return suggested_route; // return the full route object
};

export default function Page() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const [service, setService] = useState<any>(null);
  const [inputText, setInputText] = useState<string>("");

  const handleInput = (e: any) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    console.log(inputText);
    const route = getRouteFromQuery(inputText);
    setService(route);
  }, [inputText]);

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
            <div className="w-full max-w-5xl flex items-center gap-3 bg-gray-100 rounded-full px-6 py-3 shadow-inner transition-all duration-100 ease-in-out hover:bg-[#E2E2E2] hover:border-2 hover:border-[#06044B] hover:shadow-2xl">
              <span className="text-2xl text-[#06044B] font-bold">🔍</span>
              <input
                type="text"
                placeholder="Search print, AI tools, convert and more……"
                className="flex-grow px-2 py-2 rounded-full bg-transparent outline-none text-sm text-[#06044B]"
                onChange={handleInput}
                value={inputText}
              />
            </div>
          </div>
          {inputText != "" && !service && (
            <div className="text-black">Your prompt is not clear enough!!</div>
          )}

          {service && (
            <div className="w-full max-w-4xl mb-8 px-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#06044B] mb-2">
                  Suggested Service
                </h3>
              </div>

              <Link href={service.path} className="block">
                <Card className="group hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div
                      className={`bg-gradient-to-r ${service.gradient} p-6 text-white relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                      <div className="relative z-10 flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-1">
                            {service.title}
                          </h4>
                          <p className="text-white/90 text-sm">
                            {service.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                          >
                            Quick Access
                          </Badge>
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                            <FaChevronDown className="w-4 h-4 text-white rotate-[-90deg]" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Click to access this service</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {service.keywords.join(", ")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          )}

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
                      src={tool.img || "/placeholder.svg"}
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
