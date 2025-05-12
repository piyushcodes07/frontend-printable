"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) onFileSelect(acceptedFiles[0]);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 50 * 1024 * 1024,
    noClick: true,        
    noKeyboard: true, 
  });

  return (
    <div className="mx-auto max-w-screen-2xl bg-[#E6E6ED] w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-black mb-8">Flatten PDF</h2>

      <div className="w-3/5 max-[800px]:w-4/5 bg-white p-8 rounded-lg border-2 border-dashed border-[#CBD5E1]">
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center w-full h-64 rounded-lg transition-colors
            ${isDragActive
              ? "border-2 border-dashed border-blue-500 bg-blue-50"
              : "border-2 border-dashed border-[#CBD5E1] bg-white"}
          `}
        >
          <input {...getInputProps()} />

          {/* 1) Drag & Drop text */}
          <p className="text-lg font-medium text-gray-700 mb-6">
            Drag &amp; Drop your file here
          </p>

          {/* 2) Divider */}
          <div className="flex items-center w-full mb-6">
            <span className="flex-grow h-px bg-gray-300"></span>
            <span className="px-4 text-gray-500 uppercase text-sm">or</span>
            <span className="flex-grow h-px bg-gray-300"></span>
          </div>

          {/* 3) Split button */}
          <div className="relative inline-flex rounded-md overflow-hidden shadow-sm">
            {/* only this label triggers file picker */}
            <label
              htmlFor="fileInput"
              className="flex items-center bg-[#06044B] px-4 py-2 cursor-pointer"
            >
              <img
                src="/FLATTEN-PDF/file.png"
                alt=""
                className="h-5 w-5 mr-2"
              />
              <span className="text-white font-semibold">CHOOSE FILES</span>
            </label>

            {/* the arrow lives outside the label */}
            <button
              type="button"
              onClick={() => setShowDropdown((v) => !v)}
              className="flex items-center justify-center bg-[#06044B] px-3 py-2"
            >
              <img
                src="/FLATTEN-PDF/dropdown.png"
                alt=""
                className={`h-4 w-4 transform transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    document.getElementById("fileInput")?.click();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Choose from Device
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    // TODO: drive picker
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Choose from Drive
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Supported formats */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Supported formats: .pdf — Max file size: 50MB
        </p>
      </div>

      {/* Footer copy */}
      <p className="mt-8 max-w-xl text-center text-gray-600">
        Effortlessly convert your PDFs into fully editable Excel spreadsheets
        online—completely free of charge. Extract data seamlessly for easy
        editing, with no sign-ups or downloads required.
      </p>

      {/* hidden input */}
      <input
        type="file"
        id="fileInput"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
      />
    </div>
  );
}
