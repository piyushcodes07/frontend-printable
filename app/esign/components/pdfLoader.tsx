"use client";

import { useEffect, useState, useRef } from "react";
import PdfCanvasPage from "./pdfCanvasPage";
import { drawSignatureOnPdf } from "./utils/pdfUtils";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { useSignUrl } from "../useSign";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;

const PdfLoader = ({ pdfUrl }: { pdfUrl: string }) => {
  const { signs } = useSignUrl();
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [pdfPages, setPdfPages] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pdfUrl) return;

    const loadPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const pages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        console.log(page.rotate);
        const rotation = page.rotate;
        const viewport = page.getViewport({ scale: 1, rotation });
        pages.push({ page, viewport });
      }

      const bytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
      setPdfData(bytes);
      setPdfPages(pages);
    };

    loadPdf();
  }, [pdfUrl]);

  const handleDownload = async () => {
    if (pdfData && signs) {
      await drawSignatureOnPdf(pdfData, signs);
    }
  };

  return (
    <div className="space-y-4 ">
      <div
        ref={containerRef}
        className="overflow-x-hidden center "
        style={{ maxWidth: "100%" }}
      >
        <div className="flex flex-col gap-y-8  ">
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

      <button
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleDownload}
      >
        Download Edited PDF
      </button>
    </div>
  );
};

export default PdfLoader;
