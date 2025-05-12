"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import FileUploader from "./fileUplaoder"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

enum Stage {
  Idle = "Idle",
  Uploading = "Uploading",
  Flattening = "Flattening",
  Done = "Done",
}

// function FileUploader({ onFileSelect }: { onFileSelect: (file: File) => void }) {
//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     if (acceptedFiles[0]) onFileSelect(acceptedFiles[0]);
//   }, [onFileSelect]);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "application/pdf": [".pdf"] },
//     maxSize: 50 * 1024 * 1024,
//   });
//   return (
//     <div className="mx-auto max-w-screen-2xl bg-[#E6E6ED] w-full h-[calc(100vh-64px)] flex items-center justify-center">
//       <div className="w-full flex items-center flex-col mt-8 gap-y-8 max-[800px]:mt-0">
//         <h2 className="text-4xl font-bold text-black w-full text-center">Flatten PDF Files</h2>
//         <div className="w-3/5 max-[800px]:w-4/5 rounded-lg bg-white flex items-center justify-center p-6 border-2 border-[#D0D0D0]">
//           <div
//             {...getRootProps()}
//             className={`flex border-dashed border-2 bg-[#F3F3F3] rounded-lg w-full justify-center items-center ${
//               isDragActive ? "border-blue-500 bg-blue-100" : "border-[#06044B]"
//             }`}
//           >
//             <input {...getInputProps()} />
//             <p className="text-[20px] capitalize text-black text-center font-bold">
//               Drag & Drop your file here or click to select
//             </p>
//           </div>
//         </div>
//         <p className="text-center text-black font-thin">
//           Flatten your PDF — no sign-up or download required
//         </p>
//       </div>
//     </div>
//   );
// }

function ProgressScreen({ label, progress }: { label: string; progress: number }) {
  return (
    <div className="flex flex-col mt-12 items-center w-3/5 mx-auto">
      <p className="text-black text-[24px] font-semibold mt-2 text-center">{label}</p>
      <div className="w-3/6 min-w-[250px] h-3 bg-white rounded-full shadow-inner overflow-hidden mt-4">
        <div
          className="h-full bg-gradient-to-r from-[#06044B] to-[#61E987] rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function PdfViewerWithSidebar({ url, filename, originalSize, flattenedSize }: {
  url: string;
  filename: string;
  originalSize: string;
  flattenedSize: string;
}) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState<number>(600);
  useEffect(() => {
    const zoomFactor = 0.6; 
    const updateWidth = () => {
      if (containerRef.current) {
        setPageWidth(containerRef.current.offsetWidth * zoomFactor);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto flex bg-[#E6E6ED] h-[calc(100vh-64px)]">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center bg-white px-4 py-1 shadow-lg w-full">
          <p className="text-black font-bold text-[24px]">Flatten PDF</p>
        </div>
        <div className="flex items-start justify-center bg-[#E6E6ED] w-full overflow-hidden">
          <div ref={containerRef} className="flex justify-center items-center h-full w-4/5">
            <Document file={url} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
              {Array.from({ length: numPages || 0 }, (_, i) => (
                <Page key={i} pageNumber={i + 1} width={pageWidth} className="mb-4" />
              ))}
            </Document>
          </div>
          <aside className="w-1/5 min-w-[300px] px-4 py-6 shadow-lg bg-gradient-to-b from-[#DFFBE7] to-[#CDCDDB] flex flex-col gap-y-2">
            <p className="text-base font-medium mb-1 underline underline-offset-4 decoration-dashed">{filename}</p>
            <div className="w-3/5 flex items-center gap-x-2 mb-4">
              <p className="text-black text-[14px]">{originalSize}</p>
              <img src="/FLATTEN-PDF/sideArrow.png" className="h-4 w-8" alt="" />
              <p className="text-[#34C759] text-[14px]">{flattenedSize}</p>
            </div>
            <a href={url} download={`flattened-${filename}`} className="flex items-center justify-center p-2 bg-[#06044B] rounded-lg mb-2">
              <p className="text-white capitalize">Download</p>
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function FlattenPage() {
  const [stage, setStage] = useState<Stage>(Stage.Idle);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [flattenProgress, setFlattenProgress] = useState(0);
  const [pdfUrl, setPdfUrl] = useState("");
  const [sizes, setSizes] = useState({ original: "", flattened: "" });

  const handleFileSelect = async (selected: File) => {
    setFile(selected);
    setSizes({ original: `${(selected.size/(1024*1024)).toFixed(2)} MB`, flattened: "" });
    setStage(Stage.Uploading);
    const formData = new FormData();
    formData.append("fileInput", selected);
    formData.append("flattenOnlyForms", "false");
    try {
      const response = await axios.post("/api/flatten", formData, {
        responseType: 'arraybuffer',
        onUploadProgress: (e) => setUploadProgress(Math.round((e.loaded / e.total!) * 100)),
        onDownloadProgress: (e) => {
          setFlattenProgress(Math.round((e.loaded / e.total!) * 100));
          if (stage !== Stage.Flattening) setStage(Stage.Flattening);
        },
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setSizes(s => ({ ...s, flattened: `${(blob.size/(1024*1024)).toFixed(2)} MB` }));
      setStage(Stage.Done);
    } catch (err) {
      console.error(err);
      setStage(Stage.Idle);
    }
  };

  return (
    <>
      {stage === Stage.Idle && <FileUploader onFileSelect={handleFileSelect} />}
      {stage === Stage.Uploading && <ProgressScreen label="Uploading..." progress={uploadProgress} />}
      {stage === Stage.Flattening && <ProgressScreen label="Flattening PDF..." progress={flattenProgress} />}
      {stage === Stage.Done && file && (
        <PdfViewerWithSidebar
          url={pdfUrl}
          filename={file.name}
          originalSize={sizes.original}
          flattenedSize={sizes.flattened}
        />
      )}
    </>
  );
}
