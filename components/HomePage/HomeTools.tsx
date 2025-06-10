import React from "react";
import Image from "next/image";
import Link from "next/link";

function HomeTools() {
  return (
    <div>
      <style jsx global>{`
        .link-underline {
          position: relative;
          text-decoration: none;
        }

        .link-underline::after {
          content: "";
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: currentColor;
          transition: width 0.3s ease-in-out;
        }

        .link-underline:hover::after {
          width: 100%;
        }
      `}</style>
      <div className="w-[1800px] py-16 px-4 flex justify-center mx-[3.6%]">
        <div className="grid grid-cols-6 gap-x-22">
          {/* AI PDF Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">AI PDF</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Chat With PDF
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  AI PDF Summarizer
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Translate PDF
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  AI Questions Generator
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  AI PRESENTATION MAKER
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Generate PPT
                </Link>
              </li>
            </ul>
          </div>

          {/* VIEW & EDIT Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">VIEW & EDIT</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Edit PDF
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Annote PDF
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  PDF Reader
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Number Pages
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Crop PDF
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Redact PDF
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Watermark PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* ORGANIZE Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">ORGANIZE</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Split PDF
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Rotate PDF
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Delete Pages
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Extract PDF Pages
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Organize PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* CONVERT FROM PDF Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              CONVERT FROM PDF
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/pdf/to/word"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  PDF to Word
                </Link>
              </li>
              <li>
                <Link
                  href="/pdf/to/excel"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  PDF to Excel
                </Link>
              </li>
              <li>
                <Link
                  href="/pdf/to/ppt"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  PDF to PPT
                </Link>
              </li>
              <li>
                <Link
                  href="/pdf/to/image"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  PDF to JPG
                </Link>
              </li>
            </ul>
          </div>

          {/* CONVERT TO PDF Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              CONVERT TO PDF
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/word/to/pdf"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Word to PDF
                </Link>
              </li>
              <li>
                <Link
                  href="/excel/to/pdf"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Excel to PDF
                </Link>
              </li>
              <li>
                <Link
                  href="/ppt/to/pdf"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  PPT to PDF
                </Link>
              </li>
              <li>
                <Link
                  href="/image/to/pdf"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  JPG to PDF
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  PDF OCR
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Tools Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">SIGN</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-base text-gray-600 link-underline hover:text-gray-900"
                  >
                    Sign PDF
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                COMPRESS
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/pdfcompress"
                    className="text-base text-gray-600 link-underline hover:text-gray-900"
                  >
                    Compress PDF
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900">SCAN</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-base text-gray-600 link-underline hover:text-gray-900"
                  >
                    PDF Scanner
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                PDF SECURITY
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-base text-gray-600 link-underline hover:text-gray-900"
                  >
                    Unlock PDF
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-base text-gray-600 link-underline hover:text-gray-900"
                  >
                    Protect PDF
                  </Link>
                </li>
                <li>
                  <Link
                    href="/drop-file"
                    className="text-base text-gray-600 link-underline hover:text-gray-900"
                  >
                    Flat PDF
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTools;
