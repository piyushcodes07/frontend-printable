"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaChevronDown, FaFileAlt } from "react-icons/fa";
import converterConfig from "@/app/(conversion)/config";
import axios from "axios";

export default function Converter() {
    const { source, target } = useParams<{ source: string; target: string }>();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const key = `${source}-${target}`;
    const config = converterConfig[key] || {
        heading: "Unknown Converter",
        supportedFormats: "",
        description: "Unsupported conversion type.",
        allowedExtensions: "",
        outputExtension: "",
    };

    const handleFromDeviceClick = () => {
        fileInputRef.current?.click();
        setDropdownOpen(false);
    };

    const handleFromDriveClick = () => {
        alert("Google Drive integration goes here");
        setDropdownOpen(false);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("fileInput", file);
        formData.append("outputFormat", config.outputExtension); // or any user-selected format

        const endpoint = `/api/${source}/to/${target}`;

        try {
            const response = await axios.post(endpoint, formData, {
                responseType: "blob",
                headers: { "Content-Type": "multipart/form-data" },
            });

            const contentDisposition = response.headers["content-disposition"];
            let filename = "downloaded-file";

            if (contentDisposition) {
                const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)["']?/i);
                if (match && match[1]) {
                    filename = decodeURIComponent(match[1]);
                }
            }

            // Create blob URL and trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Failed to convert:", err);
            alert("Failed to convert");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center py-6 px-4 font-[Poppins]">
            {/* Title below the navbar */}
            <h1 className="text-2xl md:text-3xl font-bold text-[#06044B] mb-6 mt-4">{config.heading}</h1>

            {/* Upload box */}
            <div className="relative z-20 w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 border border-gray-200">
                <div className="bg-[#F3F3F3] border-[3px] border-dashed border-[#06044B] rounded-2xl p-10 text-center">
                    <p className="text-gray-700 font-medium mb-6 text-base">Drag & Drop your file here</p>

                    <div className="flex items-center justify-center w-full mb-5">
                        <div className="border-t border-gray-300 flex-grow mr-2" />
                        <span className="text-gray-500 text-sm">or</span>
                        <div className="border-t border-gray-300 flex-grow ml-2" />
                    </div>

                    <div className="relative inline-block" ref={dropdownRef}>
                        <button
                            className="bg-[#06044B] text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
                            onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <FaFileAlt />
                            Choose Files
                            <div className="h-6 border-l border-white mx-2 self-stretch" />
                            <FaChevronDown
                                className={`text-lg transition-transform duration-300 ${
                                    dropdownOpen ? "rotate-180" : "rotate-0"
                                }`}
                            />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute left-0 top-full mt-2 w-48 bg-white border shadow-lg rounded-lg z-50">
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#06044B] hover:text-white transition-all duration-500"
                                    onClick={handleFromDeviceClick}>
                                    From Device
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#06044B] hover:text-white transition-all duration-500"
                                    onClick={handleFromDriveClick}>
                                    From Google Drive
                                </button>
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept={config.allowedExtensions}
                        onChange={handleFileChange}
                    />

                    <p className="mt-4 text-xs text-gray-500">
                        Supported formats: {config.supportedFormats}
                        <br />
                        Max file size: 50MB
                    </p>
                </div>
            </div>

            {/* Info paragraph with left alignment */}
            <p className="mt-6 text-left max-w-2xl text-gray-600 text-sm md:text-base">{config.description}</p>
        </div>
    );
}
