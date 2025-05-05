"use client";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(
  () => import("./pdfLoader").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <p>Loading PDF Viewer...</p>,
  }
);

export default function DocumentView({ pdfUrl }: { pdfUrl: string }) {
  // return <PdfViewer pdfUrl="/hum.pdf" signUrl="/sign.jpg" />;
  return (
    <div className="document-view mx-20 my-4 w-full  ">
      <PdfViewer pdfUrl={pdfUrl} />
    </div>
  );
}
