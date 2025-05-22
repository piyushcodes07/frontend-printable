"use client";
import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";

import { MoreVertical, FileText, Download, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { deleteFile, GetDocumentSignRecord } from "./components/utils/apiCalls";
import { toast } from "react-toastify";

export default function DocumentManagement() {
  const router = useRouter();
  const { user } = useUser();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [downloadLoading, setDownloadLoading] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const initialDocuments = [
    {
      fileId: "1",
      fileName: "Contract Agreement.pdf",
      status: "completed",
      signees: [{ Email: "user1@example.com" }, { Email: "user2@example.com" }],
      signedAt: "2025-05-22",
    },
    {
      fileId: "2",
      fileName: "Financial Report.docx",
      status: "out for signature",
      signees: [{ Email: "user3@example.com" }],
      signedAt: "2025-05-21",
    },
    {
      fileId: "3",
      fileName: "Project Plan.pptx",
      status: "canceled",
      signees: [{ Email: "user4@example.com" }],
      signedAt: "2025-05-20",
    },
  ];

  useEffect(() => {
    // Mocking data here instead of fetching from API initially
    setDocuments(initialDocuments);
    console.log("Documents after setting:", initialDocuments); // <-- Add this
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await GetDocumentSignRecord(user?.id as string);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch documents: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      setDocuments(result);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        sessionStorage.setItem(
          "file",
          JSON.stringify({ url: result, fileName: file.name })
        );
      }
    };
    fileReader.readAsDataURL(file);
    router.push(`/esign/sign-document`);
  };

  const handleDocumentAction = async (action: string, document: any) => {
    console.log(
      "handleDocumentAction called, isBrowser:",
      typeof window !== "undefined"
    );
    switch (action) {
      case "open":
        if (typeof window !== "undefined") {
          window.open(`/esign/document?id=${document.fileId}`, "_blank");
        }
        break;
      case "download":
        try {
          setDownloadLoading(document.fileId);
          const downloadUrl =
            document.fileUrl ||
            `https://blog-storage-printable.s3.amazonaws.com/documents/${document.fileId}_${document.fileName}`;

          if (typeof window !== "undefined") {
            const response = await fetch(downloadUrl, {
              method: "GET",
              headers: {
                Accept: "application/octet-stream",
              },
            });

            if (!response.ok) {
              throw new Error(`Failed to fetch file: ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = window.document.createElement("a");
            link.href = url;
            link.setAttribute("download", document.fileName);
            window.document.body.appendChild(link);
            link.click();
            window.document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success(`${document.fileName} download started`);
          } else {
            console.warn("Download attempted on server; skipping.");
            toast.error("Download is only available in the browser");
          }
        } catch (error) {
          toast.error("Download failed");
          console.error("Download error:", error);
        } finally {
          setDownloadLoading(null);
        }
        break;
      case "delete":
        try {
          setDeleteLoading(document.fileId);
          const response = await deleteFile({
            fileId: document.fileId,
            ownerId: user?.id,
            fileName: document.fileName,
          });
          const data = await response.json();
          toast.success(data.msg);
          await fetchDocuments();
        } catch (error) {
          toast.error("File delete failed");
          console.error("Delete error:", error);
        } finally {
          setDeleteLoading(null);
        }
        break;
      default:
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    let color = "";
    let icon = null;

    switch (status.toLowerCase()) {
      case "completed":
        color = "green";
        icon = <div className="mr-1.5 h-2 w-2 rounded-full bg-green-500" />;
        break;
      case "canceled":
        color = "red";
        icon = <div className="mr-1.5 h-2 w-2 rounded-full bg-red-500" />;
        break;
      case "out for signature":
        color = "amber";
        icon = <div className="mr-1.5 h-2 w-2 rounded-full bg-amber-500" />;
        break;
      default:
        color = "gray";
        icon = <div className="mr-1.5 h-2 w-2 rounded-full bg-gray-500" />;
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
      >
        {icon}
        {status}
      </span>
    );
  };

  const renderSigneeAvatars = (signees: any[]) => {
    return (
      <div className="flex -space-x-1">
        {signees.map((signee, i) => {
          const initials = signee.Email
            ? signee.Email.substring(0, 2).toUpperCase()
            : "??";
          return (
            <Avatar key={i} className="h-6 w-6 border-2 border-white">
              <AvatarFallback
                className={
                  i % 2 === 0
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }
              >
                {initials}
              </AvatarFallback>
            </Avatar>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container  mx-auto py-10 max-w-6xl text-black">
      <div className="w-full flex items-center flex-col mt-8 gap-y-8 max-[800px]:mt-0">
        <h2 className="text-4xl font-bold text-black w-full text-center">
          Start a new Document
        </h2>

        {/* Static File Upload Section */}
        <div className="w-3/5 max-[800px]:w-4/5 rounded-lg bg-white flex items-center justify-center p-6 border-2 border-[#D0D0D0]">
          <div className="relative flex border-dashed border-2 bg-[#F3F3F3] rounded-lg w-full justify-center items-center border-[#06044B]">
            <div className="w-3/5 max-[600px]:w-11/12 flex items-center flex-col gap-y-8 py-4">
              <p className="text-[20px] capitalize text-black text-center font-bold">
                Drag & Drop your file here
              </p>

              <div className="flex items-center gap-x-2 w-full">
                <p className="h-[1px] bg-black/50 w-1/2 "></p>
                <p className="text-[20px] font-normal text-black">or</p>
                <p className="h-[1px] bg-black/50 w-1/2 "></p>
              </div>

              <div className="flex items-center w-full justify-center">
                {/* Choose Files Button */}
                <label htmlFor="fileInput">
                  <div className="p-3 flex items-center justify-center gap-x-2 bg-[#06044B] rounded-l-xl cursor-pointer">
                    <span>
                      <FaRegFileAlt className="text-white" />
                    </span>
                    <p
                      className="text-white font-bold capitalize"
                      onClick={handleUploadClick}
                    >
                      Choose Files
                    </p>
                  </div>
                </label>

                <div
                  className="flex items-center justify-center p-3 bg-[#06044B] rounded-r-xl min-h-[48px] border-l border-white cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {/* Add rotation when the dropdown is shown */}
                  <IoIosArrowDown
                    className={`h-5 w-5 object-scale-down transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    } text-white`}
                  />
                </div>
              </div>

              {showDropdown && (
                <div className="absolute flex flex-col min-w-[200px] bg-white rounded-lg p-2 z-10 bottom-[2px] border border-black ">
                  <button
                    className="text-black text-left border-b border-black/50 hover:bg-gradient-to-r from-[#DFFBE7] to-[#CDCDDB] rounded-t-lg py-1 px-2 flex items-center gap-2"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <img
                      src="/MacBook.png"
                      height={16}
                      width={16}
                      className="h-4 w-4"
                      alt="MacBook"
                    />
                    <span onClick={handleUploadClick}>Choose from Device</span>
                  </button>

                  <button
                    className="text-black text-left hover:bg-gradient-to-r from-[#DFFBE7] to-[#CDCDDB] rounded-b-lg py-1 px-2 flex items-center gap-2"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <img
                      src="/Google Drive.png"
                      height={16}
                      width={16}
                      className="h-4 w-4"
                      alt="Google Drive"
                    />
                    <span>Choose from Drive</span>
                  </button>
                </div>
              )}

              {/* Static Information */}
              <div className="flex w-full max-[500px]:w-11/12 items-center justify-center">
                <div className="text-sm max-[500px]:text-xs text-[#555555] text-center w-full flex flex-col items-center">
                  <p className="truncate overflow-hidden w-full">
                    Supported formats: .pdf, .doc, .docx, .ppt, .pptx, .xls,
                    .xlsx, .jpg, .jpeg, .png, .gif, .txt
                  </p>
                  <p>Max file size: 50MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <h2 className="text-xl font-semibold mb-4 mt-20">Documents</h2>

      {/* User Data Table Section */}
      <section className="w-full mt-8">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200">
                <tr className="text-left text-sm text-slate-500 border-b">
                  <th className="pb-3 font-normal px-4 lg:px-0 md:px-0 sm:px-0">
                    Name
                  </th>
                  <th className="pb-3 font-normal px-4  lg:px-0 md:px-0 sm:px-0">
                    Status
                  </th>
                  <th className="pb-3 font-normal px-4  lg:px-0 md:px-0 sm:px-0">
                    Created by
                  </th>
                  <th className="pb-3 font-normal px-4  lg:px-0 md:px-0 sm:px-0">
                    Signees
                  </th>
                  <th className="pb-3 font-normal px-4  lg:px-0 md:px-0 sm:px-0">
                    Last updated
                  </th>
                  <th className="pb-3 font-normal px-4  lg:px-0 md:px-0 sm:px-0">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-black">
                {documents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No documents available
                    </td>
                  </tr>
                ) : (
                  documents.map((doc, idx) => (
                    <tr key={idx} className="border-b hover:bg-slate-50">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 rounded-md">
                            <FileText className="h-4 w-4 text-slate-700" />
                          </div>
                          <Link
                            href={`/esign/document?id=${doc.fileId}`}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {doc.fileName}
                          </Link>
                        </div>
                      </td>
                      <td className="py-4">{getStatusBadge(doc.status)}</td>
                      <td className="py-4 px-4 text-sm">you</td>
                      <td className="py-4 px-2">
                        {renderSigneeAvatars(doc.signees)}
                      </td>
                      <td className="py-4 text-sm">{doc.signedAt}</td>
                      <td className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full cursor-pointer "
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem
                              onSelect={() => handleDocumentAction("open", doc)}
                              className="cursor-pointer hover:bg-gray-500"
                            >
                              <FileText className="mr-2 h-4 w-4 text-black " />
                              <p className="text-black">View</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault(); // Prevent menu from closing
                                handleDocumentAction("download", doc);
                              }}
                              className="cursor-pointer hover:bg-gray-500"
                              disabled={downloadLoading === doc.fileId}
                            >
                              <Download className="mr-2 h-4 w-4 text-black" />
                              <p className="text-black">
                                {downloadLoading === doc.fileId
                                  ? "Downloading..."
                                  : "Download"}
                              </p>
                              {downloadLoading === doc.fileId && (
                                <div className="ml-2 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault(); // Prevent menu from closing
                                handleDocumentAction("delete", doc);
                              }}
                              className="cursor-pointer hover:bg-gray-500"
                              disabled={deleteLoading === doc.fileId}
                            >
                              <Trash2 className="mr-2 h-4 w-4 text-black" />
                              <p className="text-black">
                                {deleteLoading === doc.fileId
                                  ? "Deleting..."
                                  : "Delete"}
                              </p>
                              {deleteLoading === doc.fileId && (
                                <div className="ml-2 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
