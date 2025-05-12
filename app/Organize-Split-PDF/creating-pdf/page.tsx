'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [progress, setProgress] = useState(5); // minimum 5%
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const startProgress = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 100;
        }
        return prev + 1;
      });
    }, 30); // adjust speed if needed
  };

  const resetProgress = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setProgress(5);
  };

  const handleClick = () =>{
    router.push('/Organize-Split-PDF/Separate-pdf-DPE');
  }

  return (
    <div>
        <h1 className='ml-4 mt-2 font-bold text-black text-lg'>Split PDF</h1>
        <div className="flex items-center justify-center h-screen bg-[#e6e6ee] ">
        
       
        <div className="flex flex-col items-center gap-6 -mt-12 ">
          {/* Icon */}
         <button onClick={handleClick} className="cursor-pointer">
                     
                     <Image src="/pdfformat.png" alt="DOC" width={220} height={260} />
                   </button>
  
          {/* File name */}
          <p className="text-sm text-gray-600">
            Personal-Account-Matter-letter-upload.doc (1.1 MB)
          </p>
  
          {/* Uploading Text */}
          <p className="text-xl font-semibold text-black">
            Creating Document.....{'.'.repeat(progress % 0)}
          </p>
  
          {/* Progress Bar */}
          <div
            className="w-[400px] h-4 bg-white rounded-full shadow-inner overflow-hidden relative cursor-pointer"
            onMouseEnter={startProgress}
            onMouseLeave={resetProgress}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#1f2b59] to-[#60d394] transition-all duration-200 ]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
