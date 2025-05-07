"use client";
import dynamic from "next/dynamic";
// import PdfViewer from "./PdfViewer";

const PdfViewer = dynamic(
  () => import("@/app/flatten/[[...flatten]]/PdfViewer"),
  {
    ssr: false,
  }
);

export default function page() {
  return (
    <div>
      <PdfViewer />
    </div>
  );
}
