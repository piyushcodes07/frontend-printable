"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import React, { useEffect, useState } from "react";


export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secured, setSecured] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  
  
  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => prev + 5);
      }, 2000);
    }
  }, [progress]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
      console.log("Files selected:", Array.from(event.target.files));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setSelectedFiles(Array.from(event.dataTransfer.files));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleProtectPDF = async() => {
    setUploading(true);
    setProcessing(true);


    try {
      const formData = new FormData();
      formData.append("fileInput", selectedFiles[0]);
      formData.append("password", password);
      const response = await axios.post("/api/remove-password", formData, {
        responseType: "blob",
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Extract filename from Content-Disposition header
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
    } catch (error) {
      console.error("PDF download failed:", error);
      alert("Failed to download PDF");
    } finally {
      setProcessing(false);
      setUploading(false);
      setSecured(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleDownload = () => {
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handlePrint = () => {
    alert("Print functionality is not implemented yet.");
  };

  const handleExport = () => {
    alert("Export functionality is not implemented yet.");
  };

  const handleShare = () => {
    alert("Share functionality is not implemented yet.");
  };

  const handleDelete = () => {
    setSelectedFiles([]);
    setPassword("");
    setConfirmPassword("");
    setSecured(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-[#e2e4eb] min-h-screen flex flex-col items-center justify-center">
      {!secured ? (
        selectedFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4">
            <h1 className="text-black font-semibold text-2xl mb-8">Unlock PDF</h1>
            <div
              className="bg-white rounded-xl p-8 w-full"
              style={{ width: "950px", height: "330px" ,borderRadius: "40px"}}  
            >
              <div
                className="border-2 border-dashed border-[#1a1a4a] rounded-lg p-8 flex flex-col items-center justify-center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ width: "100%", height: "100%" }}
              >
                <p className="text-center text-sm font-semibold text-black mb-3">
                  Drag &amp; Drop your file here
                </p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-px bg-[#bfbfbf] w-20"></div>
                  <p className="text-xs text-[#4a4a4a]">or</p>
                  <div className="h-px bg-[#bfbfbf] w-20"></div>
                </div>
                <div className="relative">
                  {/* Button with Chevron */}
                  <button
                    className="bg-[#1a1a4a] text-white text-sm font-semibold rounded px-6 py-2 flex items-center gap-2 cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <i className="fas fa-file-upload text-xs"></i> CHOOSE FILES
                    <div className="h-6 border-l border-white mx-2 self-stretch"></div>
                    <i
                      className={`fas fa-chevron-down text-xs transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    ></i>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50">
                      <label className="block px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100">
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                        Upload from Device
                      </label>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                        onClick={() => alert("Upload from Cloud selected")}
                      >
                        Upload from Cloud
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-[#7a7a7a] text-center mt-3">
                  Supported formats: .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .jpg, .jpeg, .png, .gif,
                  .txt
                  <br />
                  Max file size: 50MB
                </p>
              </div>
            </div>
            <p className="text-center text-sm text-black mt-6 max-w-lg">
              Free yourself from viewing and editing restrictions in just a few clicks—no software, no
              sign-ups, and no hassle. Whether it's a forgotten password or a locked file sent by someone
              else, our secure, browser-based tool lets you unlock your PDFs quickly and safely.
            </p>
          </div>
        ) : (
          <div className="bg-[#e1e3eb] m-0 p-0 font-sans w-full">
            <header className="border-b border-gray-300 p-2 font-bold text-black text-sm bg-white">
              Unlock PDF
            </header>
            <main className="flex flex-col md:flex-row min-h-[calc(100vh-32px)]">
            <section className="flex-1 flex flex-col items-center justify-center bg-[#e0e2eb] p-4">
  {processing ? (
    <div className="processing-container">
      <div className="image-transition">
        <img
          alt="Locked PDF icon"
          className="w-[120px] h-[140px] object-contain"
          height="140"
          src="https://storage.googleapis.com/a1aa/image/1f4ae7f5-db66-44d3-9301-687b968f56c2.jpg"
          width="120"
        />
        <div className="arrow-icon">
          <i className="fas fa-arrow-right"></i>
        </div>
        <img
          alt="Unlocked PDF icon"
          className="w-[120px] h-[140px] object-contain"
          height="140"
          src="https://storage.googleapis.com/a1aa/image/1f4ae7f5-db66-44d3-9301-687b968f56c2.jpg"
          width="120"
        />
      </div>
      <div className="file-details">
        {selectedFiles[0]?.name || "personal-letter-template.pdf"} (
        {(selectedFiles[0]?.size / 1024).toFixed(2) || "78.68"} KB)
      </div>
      <div className="securing-text">Unlocking PDF</div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center">
      <img
        alt="Pink PDF file icon with red Adobe Acrobat style logo and folded top right corner"
        className="w-[150px] h-[180px] object-contain"
        height="180"
        src="https://storage.googleapis.com/a1aa/image/22f85669-7b9f-414e-1c8d-012a90b71317.jpg"
        width="150"
      />
      <p className="text-gray-600 font-semibold mt-6">
        {selectedFiles[0]?.name || "personal-letter-template.pdf"} (
        {(selectedFiles[0]?.size / 1024).toFixed(2) || "78.68"} KB)
      </p>
      <p className="text-gray-600 font-semibold mt-6">Uploading....</p>
      <div className="w-64 h-4 rounded-full bg-white mt-2 border border-gray-200 overflow-hidden">
        <div
          className="h-full bg-[#1a1a4a] transition-transform duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )}
</section>
              <aside className="w-full md:w-[320px] bg-gradient-to-b from-[#d9f0d9] to-[#d9e0eb] p-6 flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-black text-base mb-2 text-center">
                    Unlock PDF
                  </h2>
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <p className="text-xs text-gray-700 text-center">
                      Hit unlock and you're good to go.
                    </p>
                  </div>
                  <div className="bg-white flex items-center border border-gray-300 rounded-md overflow-hidden">
                      <span className="px-3 text-gray-600 text-xs flex items-center justify-center">
                        <i className="fas fa-lock"></i>
                      </span>
                      <input
                        className="flex-1 py-2 px-3 text-xs outline-none"
                        placeholder="Enter Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        className="bg-[#1a1f56] px-3 py-2.5 text-white text-xs flex items-center justify-center"
                        type="button"
                        onClick={togglePasswordVisibility}
                      >
                        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
                </div>
                <button
                  className="mt-6 w-full border border-[#1a1f56] text-[#1a1f56] text-xs py-2 rounded-md flex items-center justify-center hover:bg-[#1a1f56] hover:text-white transition"
                  onClick={handleProtectPDF}
                  disabled={processing}
                >
                  Unlock PDF
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </aside>
            </main>
          </div>
        )
      ) : (
        <div className="bg-[#e0e2eb] w-full">
        <header className="bg-white border-b border-gray-300">
         <div className="max-w-full px-4 py-2 font-bold text-black text-[14px]">
          Protect PDF
         </div>
        </header>
        <main className="flex min-h-[calc(100vh-36px)]">
         <section className="flex-1 flex flex-col items-center justify-center gap-2 bg-[#e0e2eb] px-4">
          <img alt="Red PDF file icon with folded corner on pink background" className="w-[160px] h-[200px] rounded-xl drop-shadow-md" height="200" src="https://storage.googleapis.com/a1aa/image/e2d21a1c-a062-442f-23ae-072e1bf44239.jpg" width="160"/>
          <p className="text-gray-600 font-semibold mt-6">
            {selectedFiles[0]?.name || "personal-letter-template.pdf"} (
            {(selectedFiles[0]?.size / 1024).toFixed(2) || "78.68"} KB)
          </p>
          <p className="text-[14px] font-semibold text-black">
           PDFs are secured now!
          </p>
         </section>
         <aside className="w-[320px] bg-gradient-to-b from-[#d7f0d9] to-[#e0e2eb] px-6 py-8 flex flex-col gap-4">
  {/* File Name */}
  <p className="text-[12px] text-black underline decoration-dotted decoration-black decoration-1 cursor-pointer max-w-max">
        {selectedFiles[0]?.name || "personal-letter-template.pdf"} (
        {(selectedFiles[0]?.size / 1024).toFixed(2) || "78.68"} KB)
      </p>

  {/* Download Button */}
  <button
    className="w-full flex items-center justify-center gap-2 bg-[#050a3d] text-[10px] text-white py-2 rounded-md"
    onClick={handleDownload}
  >
    <i className="fas fa-download text-[10px]"></i>
    DOWNLOAD
    <i className="fas fa-chevron-down text-[10px]"></i>
  </button>

  {/* Separator */}
  <p className="text-[10px] text-center text-[#9a9a9a]">or</p>

  {/* Print Button */}
  <button
    className="w-full flex items-center justify-center gap-2 bg-[#050a3d] text-[10px] text-white py-2 rounded-md"
    onClick={handlePrint}
  >
    <i className="fas fa-print text-[10px]"></i>
    Print
  </button>

  {/* Export Button */}
  <button
    className="w-full flex items-center justify-center gap-2 border border-[#9a9a9a] text-[10px] text-black py-2 rounded-md"
    onClick={handleExport}
  >
    <i className="fas fa-upload text-[10px]"></i>
    Export As
    <i className="fas fa-chevron-down text-[10px]"></i>
  </button>

  {/* Share and Delete Buttons */}
  <div className="flex gap-2">
    <button
      className="flex-1 flex items-center justify-center gap-2 border border-[#9a9a9a] text-[10px] text-black py-2 rounded-md"
      onClick={handleShare}
    >
      <i className="fas fa-share-alt text-[10px]"></i>
    </button>
    <button
      className="flex-1 flex items-center justify-center gap-2 border border-[#9a9a9a] text-[10px] text-black py-2 rounded-md"
      onClick={handleDelete}
    >
      <i className="fas fa-trash-alt text-[10px]"></i>
    </button>
  </div>
</aside>
        </main>
       </div>
      
      )}
    </div>
  );
}