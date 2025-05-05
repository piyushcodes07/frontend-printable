"use client";
import React, { useEffect, useState } from "react";
import SingerDetailsForm from "../components/signeeForm";
import SigningTool from "../components/signTool";
import DocumentView from "../components/documentView";
import GetFiles from "../components/utils/fetchFile";
import { File } from "lucide-react";

interface Props {
  searchParams: { id?: string };
}
interface File {
  fileUrl: string;
  view: boolean;
  sign: boolean;
}

export default function SignDocument({ searchParams }: Props) {
  const [onlyOther, setOther] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true); // just added loading state

  const userId = 1;
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { id } = await searchParams;
      if (id) {
        const FileData = await GetFiles(id, JSON.stringify(userId));
        setFile(FileData);
      }
      setLoading(false);
    };
    fetch();
  }, [searchParams]);

  console.log(file);

  return (
    <section className="sign-document text-black flex-1 ">
      <div className="doc-title flex itemm-center shadow-md  absolute   justify-center bg-white">
        <h1>file-name: Test.pdf</h1>
        <div className="icon">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_165_1467)">
              <path
                d="M16.0837 8.35767L12.7504 5.02434M3.16699 17.941L5.9873 17.6277C6.33188 17.5893 6.50416 17.5702 6.6652 17.5181C6.80807 17.4718 6.94403 17.4065 7.0694 17.3238C7.2107 17.2306 7.33328 17.1081 7.57843 16.8629L18.5837 5.85767C19.5042 4.9372 19.5042 3.44482 18.5837 2.52434C17.6632 1.60387 16.1709 1.60387 15.2504 2.52434L4.2451 13.5296C3.99995 13.7748 3.87737 13.8973 3.78419 14.0386C3.70152 14.164 3.63617 14.2999 3.58992 14.4428C3.53779 14.6038 3.51864 14.7761 3.48036 15.1207L3.16699 17.941Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_165_1467">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.5 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <div className="document-body flex flex-row  pt-10 h-[90vh] justify-between">
        <div className="DocumentArea flex   flex-3 overflow-y-scroll  overflow-x-hidden">
          {loading ? (
            <p className=" w-full h-full center">Loading File....</p>
          ) : file ? (
            <DocumentView pdfUrl={"/pdf.pdf"} />
          ) : (
            <p className="w-full h-full center">
              No Such File Exist with requested ID
            </p>
          )}
        </div>

        <div className="signingTool  flex flex-col flex-1  justify-between p-4 py-6">
          <SigningTool />
          <button className="border-1 text-[18px] rounded-xl border-[#06044B] p-3 hover:bg-[#06044B] hover:text-green-500">
            <p>Sign Document</p>
          </button>
        </div>
      </div>
    </section>
  );
}
