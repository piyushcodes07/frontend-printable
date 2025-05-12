"use client";
import { PlusCircle, Scissors, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SplitPDFPage() {
  const router = useRouter(); // Initialize the router

  const handleClick = () => {
    // Navigate to the next page when the button is clicked
    router.push('/Organize-Split-PDF/creating-pdf');
  };

  return (
    <>
      <h1 className='font-bold text-black text-lg bg-[#FFFFFF] shadow-sm border-b border-gray-300'>Split PDF</h1>
      <div className="flex h-screen w-full bg-[#e6e6ee]">
        {/* Left Section */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-start">
            {/* PDF Cards with Scissors Separators */}
            {[1, 2].map((page, index) => (
              <div key={page} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={page === 1 ? "/1c0c74195b8f0456799db0c7fff2b50e40390120.png" : "/25fffcd4a257bc280b12a8371b20e0f11de61fc6.png"}
                    alt={`PDF Page ${page}`}
                    className="w-40 h-56 object-cover rounded-md shadow"
                  />
                  <p className="text-sm mt-2">personal-letter-template.pdf <span className="text-gray-500">(5.1MB)</span></p>
                </div>
                
                {/* Add scissors separator except after last PDF */}
                {index < 2 && (
                  <div className="relative h-56 mb-6 flex items-center">
                    {/* Dashed vertical line */}
                    <div className="absolute left-1/2 h-full border-l-2 border-dashed border-[#006ADE4D]"></div>
                    
                    {/* Scissors with light blue background */}
                    <div className="relative z-10 rounded-full bg-blue-100">
                      <Scissors className="text-white bg-[#006ADE4D] w-8 h-8 p-1 -rotate-90 rounded-full " />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Add PDF Card */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 p-4 w-40 h-56 text-center rounded-md hover:bg-blue-50 cursor-pointer ml-4">
              <PlusCircle className="text-blue-400 w-6 h-6 mb-2" />
              <p className="text-sm text-gray-600">
                Add <span className="text-blue-600">PDF</span>, <span className="text-blue-600">Word</span>,<br />
                <span className="text-blue-600">Image</span>, <span className="text-blue-600">Excel</span><br />
                and <span className="text-blue-600">PowerPoint</span> Files
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-gradient-to-b from-green-100 to-gray-100 p-6 flex flex-col justify-between w-[350px]">
          <div>
            <h2 className="text-lg font-semibold mb-4">Split PDF</h2>
          </div>

          <button
            onClick={handleClick}
            className="flex items-center justify-center gap-2 bg-white border border-[#06044B] text-[#06044B] px-4 py-2 rounded transition-all duration-200 hover:bg-[#06044B] hover:text-green-500 cursor-pointer shadow-sm hover:shadow-lg"
          >
            Split (3 PDFs)
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
