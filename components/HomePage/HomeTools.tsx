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
      <div className="w-[1580px] h-[348px]">
        <div className="grid grid-cols-6 gap-8">
          {/* AI PDF Section */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">AI PDF</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm link-underline">
                  Chat With PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  AI PDF Summarizer
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  Translate PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  AI Questions Generator
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  AI PRESENTATION MAKER
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  Generate PPT
                </Link>
              </li>
            </ul>
          </div>
          {/* VIEW & EDIT Section */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">VIEW & EDIT</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm link-underline">
                  Edit PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  Annote PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  PDF Reader
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  Number Pages
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  Crop PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  Redact PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  Watermark PDF
                </Link>
              </li>
            </ul>
          </div>
          {/* ORGANIZE Section */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">ORGANIZE</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm link-underline">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  Rotate PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  Delete Pages
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  Extract PDF Pages
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  Organize PDF
                </Link>
              </li>
            </ul>
          </div>
          {/* CONVERT FROM PDF Section */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">CONVERT FROM PDF</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm link-underline">
                  PDF to Word
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  PDF to Excel
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  PDF to PPT
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  PDF to JPG
                </Link>
              </li>
            </ul>
          </div>
          {/* CONVERT TO PDF Section */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">CONVERT TO PDF</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm link-underline">
                  Word to PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  Excel to PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  PPT to PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  JPG to PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm link-underline">
                  PDF OCR
                </Link>
              </li>
            </ul>
          </div>
          {/* Additional Tools Section */}
          <div className="space-y-3">
            <div className="mb-6">
              <h3 className="font-medium text-gray-700">SIGN</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Sign PDF
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-medium text-gray-700">COMPRESS</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Compress PDF
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-medium text-gray-700">SCAN</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm link-underline">
                    PDF Scanner
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">PDF SECURITY</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Unlock PDF
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Protect PDF
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
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
