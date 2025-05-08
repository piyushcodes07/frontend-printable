"use client";
import { useUser } from "@clerk/nextjs";
import type React from "react";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PdfViewer = dynamic(
  () => import("./pdfLoader").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export default function DocumentView() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(
    "https://blog-storage-printable.s3.amazonaws.com/documents/1746677554000_roshan-pdf.pdf"
  );
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    isError?: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useUser();
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const handleFileUpload = async (selectedFile: File) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("ownerId", user?.id || "");

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);

      const response = await fetch(`${API_BASE_URL}/api/file/upload`, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.fileUrl) {
        setFileUrl(data.fileUrl);
        setStatusMessage({
          text: "File uploaded successfully!",
          isError: false,
        });
      } else {
        throw new Error("File URL is missing in the response");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatusMessage({
        text: "File upload failed. Please try again.",
        isError: true,
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const droppedFile = files[0];
      if (droppedFile.type === "application/pdf") {
        handleFileUpload(droppedFile);
      } else {
        setStatusMessage({
          text: "Please upload a PDF file.",
          isError: true,
        });
      }
    }
  }, []);

  const resetUpload = () => {
    setFile(null);
    setFileUrl(null);
    setStatusMessage(null);
  };

  return (
    <div className="document-view w-full max-w-4xl mx-auto my-8 px-4">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg shadow-lg">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">
            Uploading your document...
          </h3>
          <div className="w-full max-w-md bg-gray-700 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-gray-300">
            {Math.round(uploadProgress)}% complete
          </p>
        </div>
      ) : fileUrl ? (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-white font-medium">
                {file?.name || "Document"}
              </span>
            </div>
            <button
              onClick={resetUpload}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Upload Another
            </button>
          </div>
          <div className="pdf-container">
            <PdfViewer pdfUrl={fileUrl} />
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-all duration-200 text-center",
            isDragging
              ? "border-blue-500 bg-blue-500/10"
              : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center">
            <Upload className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              Upload your PDF document
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Drag and drop your file here, or click the button below to select
              a file
            </p>

            <label className="cursor-pointer">
              <span className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Select PDF File
              </span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <p className="text-gray-500 mt-4 text-sm">
              Supported file: PDF (Max size: 10MB)
            </p>
          </div>
        </div>
      )}

      {statusMessage && (
        <div
          className={cn(
            "mt-4 p-4 rounded-md flex items-start",
            statusMessage.isError
              ? "bg-red-900/20 text-red-400 border border-red-800"
              : "bg-green-900/20 text-green-400 border border-green-800"
          )}
        >
          {statusMessage.isError ? (
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          )}
          <p>{statusMessage.text}</p>
        </div>
      )}
    </div>
  );
}
