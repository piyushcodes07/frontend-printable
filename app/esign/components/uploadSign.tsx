import React, { useEffect, useState, useCallback } from "react";
import { Upload } from "lucide-react";
import { useSignUrl } from "../useSign";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import BackgroundRemoval from "./bgRemover";

const SignUpload = ({ removeUploadSign }: { removeUploadSign: any }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { addImage } = useSignUrl();
  const [dummySign, setDummySign] = useState<{
    signUrl: string;
  } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(
    null
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && processedImageUrl) {
        addImage(processedImageUrl);
        removeUploadSign();
      }
    };
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [processedImageUrl, addImage, removeUploadSign]);

  const uploadFile = () => {
    if (processedImageUrl) {
      addImage(processedImageUrl);
      removeUploadSign();
    }
  };

  const handleDragEvents = useCallback(
    (e: React.DragEvent, type: "enter" | "leave" | "drop") => {
      e.preventDefault();
      e.stopPropagation();

      if (type === "enter") setIsDragging(true);
      if (type === "leave") setIsDragging(false);
      if (type === "drop") {
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile && droppedFile !== file) {
          setFile(droppedFile);
          const reader = new FileReader();
          reader.onloadend = () => {
            setDummySign({
              signUrl: reader.result as string,
            });
          };
          reader.readAsDataURL(droppedFile);
        }
      }
    },
    [file]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDummySign({
          signUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleProcessedImage = (url: string) => {
    setProcessedImageUrl(url);
  };

  return (
    <Dialog open onOpenChange={removeUploadSign}>
      <DialogContent className="max-w-3xl bg-white backdrop-blur-xl md:w-[40%] border border-white/20 shadow-xl rounded-xl transition-all duration-300 ease-out animate-fade-slide">
        <DialogHeader>
          <DialogTitle className=""></DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex w-full gap-x-1">
          <button className="flex items-center justify-center px-4 w-1/3 text-gray-500 bg-gray-200 rounded-xl">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
              <path d="M2 2l7.586 7.586"></path>
              <path d="M11 11l5 5"></path>
            </svg>
            <span className="ml-2">Draw</span>
          </button>
          <button className="flex items-center justify-center py-2 px-4 w-1/3 text-gray-500 bg-gray-200 rounded-xl">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 7 4 4 20 4 20 7"></polyline>
              <line x1="9" y1="20" x2="15" y2="20"></line>
              <line x1="12" y1="4" x2="12" y2="20"></line>
            </svg>
            <span className="ml-2">Type</span>
          </button>
          <button className="flex items-center justify-center py-2 px-4 w-1/3 text-gray-800 bg-white border-t border-l border-r rounded-t-lg">
            <Upload size={18} />
            <span className="ml-2">Upload</span>
          </button>
        </div>
        {/* Toolbar */}
        <div className="flex items-center justify-between text-black bg-white">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="px-3 py-2 rounded-3xl border border-[#C0C0C0] flex items-center justify-center overflow-hidden">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <svg
                  width="8"
                  height="4"
                  viewBox="0 0 8 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                >
                  <path d="M0 0L4 4L8 0H0Z" fill="#666" />
                </svg>
              </button>
            </div>

            <div className="relative">
              <button className="flex items-center justify-between px-3 py-1 border border-[#C0C0C0] rounded-full text-sm">
                <span>Text Style</span>
                <svg
                  width="8"
                  height="4"
                  viewBox="0 0 8 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                >
                  <path d="M0 0L4 4L8 0H0Z" fill="#666" />
                </svg>
              </button>
            </div>
          </div>

          <button className="px-4 py-1 rounded-full border border-[#C0C0C0] text-sm">
            Clear
          </button>
        </div>
        {/* Upload Area */}
        <div
          className={`w-full h-[200px] text-black rounded-md bg-[#E6E6ED] border border-[#C9C9C9] flex flex-col items-center justify-center p-4 transition-all ${
            isDragging ? "bg-blue-500/10 border-blue-400" : ""
          }`}
          onDragEnter={(e) => handleDragEvents(e, "enter")}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={(e) => handleDragEvents(e, "leave")}
          onDrop={(e) => handleDragEvents(e, "drop")}
        >
          {!dummySign?.signUrl ? (
            <>
              <p className="text-center mb-2 text-black">
                <b>Drag & drop or select a file</b>
              </p>
              <label className="cursor-pointer bg-white/20 hover:bg-[#E6E6ED] text-[#06044B] py-1 px-6 border border-[#06044B] rounded-lg">
                Select File
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              <div className="mt-6 text-center text-xs text-gray-500">
                Supported formats: .jpg, .jpeg, .png
                <br />
                Max file size: 50MB
              </div>
            </>
          ) : (
            <BackgroundRemoval
              signUrl={dummySign.signUrl}
              onProcessed={handleProcessedImage}
            />
          )}
        </div>

        <DialogFooter className="flex justify-end gap-2 text-black">
          <button
            className="px-6 py-2 text-[14px] rounded-md border border-[#06044B] hover:bg-white/10"
            onClick={removeUploadSign}
          >
            Cancel
          </button>
          <button
            className="px-6 text-[14px] py-2 rounded-md bg-[#0a1142] text-white hover:bg-[#0a1142]/90"
            onClick={uploadFile}
            disabled={!processedImageUrl}
          >
            Create Signature
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpload;
