"use client";
import { useEffect, useRef, useState } from "react";
import PdfCanvasPage from "./pdfCanvasPage";
import { drawSignatureOnPdf } from "./utils/pdfUtils";

import { useSignUrl } from "../useSign";
import { SignData } from "../components/utils/pdfUtils";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;

const PdfLoader = ({ pdfUrl }: { pdfUrl: string }) => {
  const { signs, setPdfData, addSign } = useSignUrl();
  const [pdfData, setPdfBuffer] = useState<ArrayBuffer | null>(null);
  const [pdfPages, setPdfPages] = useState<any[]>([]);
  const [scale, setScale] = useState(1.5); // Start with higher scale for better quality
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse wheel zoom handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        setScale((prev) => {
          let next = prev + (e.deltaY < 0 ? 0.02 : -0.02); // Smaller step for smoothness
          next = Math.max(0.5, Math.min(next, 4));
          return next;
        });
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  const loadPdf = async (url: string, newScale: number) => {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    const pages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const options: SignData = {
        type: "documentId" as "documentId",
        value: "true", // Make sure it's a string
        color: "#80919E",
        fontSize: 10,
        signSize: { width: 100, height: 30 },
        position: { x: 380, y: 5, pageIndex: i - 1 },
      };

      addSign(options);
      const page = await pdf.getPage(i);
      const rotation = page.rotate;
      // Use devicePixelRatio for sharper rendering
      const deviceScale = newScale * (window.devicePixelRatio || 1);
      const viewport = page.getViewport({ scale: deviceScale, rotation });
      pages.push({ page, viewport });
    }
    console.log("file url", url);
    const bytes = await fetch(url).then((res) => res.arrayBuffer());
    setPdfBuffer(bytes);
    setPdfData(bytes);
    setPdfPages(pages);
  };

  useEffect(() => {
    if (!pdfUrl) return;
    loadPdf(pdfUrl, scale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfUrl, scale]);

  const handleDownload = async () => {
    if (pdfData && signs) {
      await drawSignatureOnPdf(pdfData, signs);
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="relative space-y-4">
      <div
        ref={containerRef}
        className="overflow-x-hidden center"
        style={{ maxWidth: "100%", cursor: "zoom-in" }} // Show zoom-in cursor
      >
        <div className="flex flex-col gap-y-8">
          {pdfPages.map((p, i) => (
            <PdfCanvasPage
              key={i}
              page={p.page}
              viewport={p.viewport}
              pageIndex={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PdfLoader;
