"use client";
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useSearchParams } from "next/navigation";

// Legacy worker entry file
pdfjs.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/legacy/build/pdf.worker.entry.js");
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;
function PdfViewer() {
  const [showUploading, setShowUploading] = useState(true);
  const [progressBar, setProgressBar] = useState(0);
  const [showFlattening, setShowFlattening] = useState(false);
  const [showFlatteningProgress, setShowFlatteningProgress] = useState(0);
  const [showFile, setShowFile] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const pdfUrl = "./FLATTEN-PDF/Report for Bharatai 1.pdf";
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "document.pdf";
  const size = searchParams.get("size") || "0 MB";
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState<number | null>(null);

  useEffect(() => {
    const uploadInterval = setInterval(() => {
      setProgressBar((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setShowFlattening(true);
          setShowUploading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
    return () => clearInterval(uploadInterval);
  }, []);

  useEffect(() => {
    if (showFlattening) {
      const convertInterval = setInterval(() => {
        setShowFlatteningProgress((prev) => {
          if (prev >= 100) {
            clearInterval(convertInterval);
            setShowFile(true);
            setShowFlattening(false);
            return 100;
          }
          return prev + 5;
        });
      }, 300);
    }
  }, [showFlattening]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setPageWidth((width * 4) / 5);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto flex ">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center bg-white px-4 py-1  shadow-lg shadow-gray-400 w-full">
          <p className="text-black font-bold text-[24px] ">Flatten Pdf</p>
        </div>
        <div className="flex items-start justify-center  bg-[#E6E6ED] h-[calc(100vh-108px)] w-full">
          {showUploading && (
            <div className="flex flex-col mt-12 items-center w-3/5 gap-x-2">
              <img
                src="./FLATTEN-PDF/pdf.png"
                alt=""
                className="w-2/5 min-w-[150px] object-contain"
              />
              <p className="text-sm text-center text-[#555555]">
                {name} ({size})
              </p>
              <p className="text-black text-[24px] font-semibold mt-8 text-center">
                Uploading....
              </p>
              <div className="w-3/6 min-w-[250px] h-3 bg-white rounded-full shadow-inner overflow-hidden mt-4">
                <div
                  className="h-full bg-gradient-to-r from-[#06044B] to-[#61E987] rounded-full transition-all duration-200"
                  style={{ width: `${progressBar}%` }}
                />
              </div>
            </div>
          )}
          {showFlattening && (
            <div className="flex flex-col mt-12 items-center w-3/5 gap-x-2">
              <img
                src="./FLATTEN-PDF/letter.png"
                alt=""
                className="w-2/5 min-w-[150px] object-contain"
              />
              <p className="text-sm text-center text-[#555555] mt-2">
                {name} ({size})
              </p>
              <p className="text-black text-[24px] font-semibold mt-8 text-center">
                Flattening PDF...
              </p>
              <div className="w-3/6 min-w-[250px] h-3 bg-white rounded-full shadow-inner overflow-hidden mt-4">
                <div
                  className="h-full bg-gradient-to-r from-[#06044B] to-[#61E987] rounded-full transition-all duration-200"
                  style={{ width: `${showFlatteningProgress}%` }}
                />
              </div>
            </div>
          )}
          {!showFlattening && !showUploading && showFile && (
            <div className="w-full flex items-start justify-center h-full relative">
              <div
                ref={containerRef}
                className="flex justify-center items-center h-full w-4/5 max-[850px]:w-full "
              >
                <Document
                  file={pdfUrl}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  className="overflow-y-auto scroll-smooth h-11/12 mt-12 scrollbar-hide"
                >
                  {Array.from({ length: numPages || 0 }, (_, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      className="mb-4  object-scale-down"
                      width={pageWidth ?? 400}
                    />
                  ))}
                </Document>
              </div>
              <input
                type="checkbox"
                name="sidebar"
                id="sidebar"
                className="hidden peer"
              />
              <label
                htmlFor="sidebar"
                className="peer-checked:-translate-x-[300px] h-full  relative transition-all duration-300 min-[850px]:hidden"
              >
                <div className="group-focus:-translate-x-[300px]  rounded-full bg-gray-500 pr-3 pl-1 py-3  z-50 left-7 top-2  translate-x-3 abolute">
                  <img
                    src="./FLATTEN-PDF/dropdown.png"
                    className="h-1 w-3 rotate-90"
                    alt=""
                  />
                </div>
              </label>
              <div
                className="w-1/5 max-[850px]:translate-x-[300px]  top-28 right-0 bottom-0  min-w-[300px] px-4 py-6 shadow-lg  h-full flex flex-col gap-y-2 max-[850px]:fixed peer-checked:-translate-x-[0px] transition-all duration-300"
                style={{
                  background: "linear-gradient(to bottom, #DFFBE7, #CDCDDB)",
                }}
              >
                <div className="flex items-start w-full flex-col mb-4">
                  <p className="text-base font-medium mb-1 underline underline-offset-4 decoration-dashed ">
                    {name}
                  </p>
                  <div className="w-3/5 flex items-center gap-x-2 ">
                    <p className="text-black text-[14px]">1.24 Mb</p>
                    <img
                      src="./FLATTEN-PDF/sideArrow.png"
                      className="h-4 w-8"
                      alt=""
                    />
                    <p className="text-[#34C759] text-[14px]">66 Kb</p>
                  </div>
                </div>

                <div className="flex items-center w-full">
                  <div className="p-2 flex items-center justify-center gap-x-2 bg-[#06044B] rounded-l-xl w-full">
                    <img
                      src="./FLATTEN-PDF/download.png"
                      alt=""
                      className="h-4 w-4 object-scale-down"
                    />
                    <p className="text-white  capitalize">Download</p>
                  </div>
                  <div className="flex items-center justify-center p-2 bg-[#06044B] rounded-r-xl min-h-[40px] border-l border-white group">
                    <img
                      src="./FLATTEN-PDF/dropdown.png"
                      className="h-4 w-4 object-scale-down group-focus:rotate-180 transition-all duration-300"
                      alt=""
                    />
                  </div>
                </div>

                <p className="text-center text-base mb-2">or</p>

                <div className="flex items-center w-full justify-center bg-[#06044B] min-h-[40px] rounded-lg gap-x-2">
                  <img
                    src="./FLATTEN-PDF/print.png"
                    alt=""
                    className="h-4 w-4 object-scale-down"
                  />
                  <p className="text-white capitalize">Print</p>
                </div>

                <div className="flex items-center w-full justify-center bg-transparent border border-black/30 min-h-[40px] rounded-lg gap-x-2">
                  <img
                    src="./FLATTEN-PDF/export.png"
                    alt=""
                    className="h-4 w-4 object-scale-down"
                  />
                  <p className="text-black font-thin text-[16px] capitalize">
                    Export as
                  </p>
                  <img
                    src="./FLATTEN-PDF/mini-dropdown.png"
                    alt=""
                    className="h-4 w-4 object-scale-down"
                  />
                </div>

                <div className="flex justify-between w-full ">
                  <div className="flex items-center w-2/5 justify-center bg-transparent border border-black/50 min-h-[40px] rounded-lg gap-x-2">
                    <img
                      src="./FLATTEN-PDF/share.png"
                      alt=""
                      className="h-4 w-4 object-scale-down"
                    />
                    <p className="text-black font-thin">Share</p>
                  </div>
                  <div className="flex items-center w-2/5 justify-center bg-transparent border border-black/50 min-h-[40px] rounded-lg gap-x-2">
                    <img
                      src="./FLATTEN-PDF/dustbin.png"
                      alt=""
                      className="h-4 w-4 object-scale-down"
                    />
                    <p className="text-black font-thin ">Delete</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PdfViewer;
