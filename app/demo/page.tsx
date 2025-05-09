"use client";

import React, { useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDownload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("fileInput", selectedFile);
    setLoading(true);
    try {
      const response = await axios.post("/api/convert", formData, {
        responseType: "blob",
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data, response);
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" }),
      );
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed:", error);
      alert("Failed to download PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Convert Word to PDF</h1>

      <input
        type="file"
        accept=".doc,.docx"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleDownload}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Converting..." : "Download PDF"}
      </button>
    </div>
  );
}
