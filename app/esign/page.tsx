"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
<<<<<<< HEAD
import {
  MoreVertical,
  FileText,
  Download,
  Trash2,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  FileImage,
  FileSpreadsheet,
  FileCode,
  FileIcon as FilePdf,
  FileAudio,
  FileVideo,
  FileArchive,
  File,
  FileType,
  FileJson,
  FileIcon as FilePpt,
} from "lucide-react";
import DocumentUploader from "./components/documentUploader";
=======
import { IoIosArrowDown } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";

import { MoreVertical, FileText, Download, Trash2 } from "lucide-react";

>>>>>>> bb5e8742e937c9f9a4aa2f7814432c93089cf778
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
<<<<<<< HEAD
=======

>>>>>>> bb5e8742e937c9f9a4aa2f7814432c93089cf778
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { deleteFile, GetDocumentSignRecord } from "./components/utils/apiCalls";
import { toast } from "react-toastify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

export default function DocumentManagement() {
  const router = useRouter();
  const { user } = useUser();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [downloadLoading, setDownloadLoading] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Return original if invalid

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Return original on error
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase() || "";

    // Define styles for different file types
    const getIconStyles = (bgColor: string, iconColor: string) => {
      return {
        container: `flex items-center justify-center h-10 w-10 rounded-md ${bgColor}`,
        icon: `h-5 w-5 ${iconColor}`,
      };
    };

    let styles;
    let Icon;

    switch (extension) {
      case "pdf":
        styles = getIconStyles("bg-red-100", "text-red-600");
        Icon = FilePdf;
        break;
      case "doc":
      case "docx":
        styles = getIconStyles("bg-blue-100", "text-blue-600");
        Icon = FileText;
        break;
      case "xls":
      case "xlsx":
      case "csv":
        styles = getIconStyles("bg-green-100", "text-green-600");
        Icon = FileSpreadsheet;
        break;
      case "ppt":
      case "pptx":
        styles = getIconStyles("bg-orange-100", "text-orange-600");
        Icon = FilePpt;
        break;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "svg":
      case "webp":
        styles = getIconStyles("bg-purple-100", "text-purple-600");
        Icon = FileImage;
        break;
      case "mp3":
      case "wav":
      case "ogg":
        styles = getIconStyles("bg-amber-100", "text-amber-600");
        Icon = FileAudio;
        break;
      case "mp4":
      case "mov":
      case "avi":
      case "webm":
        styles = getIconStyles("bg-pink-100", "text-pink-600");
        Icon = FileVideo;
        break;
      case "zip":
      case "rar":
      case "7z":
      case "tar":
      case "gz":
        styles = getIconStyles("bg-orange-100", "text-orange-600");
        Icon = FileArchive;
        break;
      case "html":
      case "css":
        styles = getIconStyles("bg-cyan-100", "text-cyan-600");
        Icon = FileCode;
        break;
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
        styles = getIconStyles("bg-yellow-100", "text-yellow-600");
        Icon = FileCode;
        break;
      case "json":
        styles = getIconStyles("bg-gray-100", "text-gray-600");
        Icon = FileJson;
        break;
      case "txt":
        styles = getIconStyles("bg-gray-100", "text-gray-600");
        Icon = FileType;
        break;
      default:
        styles = getIconStyles("bg-gray-100", "text-gray-600");
        Icon = File;
    }

    return (
      <div className={styles.container}>
        <Icon className={styles.icon} />
        <span className="absolute bottom-0 right-0 text-[8px] font-bold bg-white rounded-sm px-1 shadow-sm uppercase">
          {extension}
        </span>
      </div>
    );
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
    let bgColor = "";
    let textColor = "";
    let icon = null;

    switch (status.toLowerCase()) {
      case "completed":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        icon = <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-green-600" />;
        break;
      case "canceled":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        icon = <XCircle className="mr-1.5 h-3.5 w-3.5 text-red-600" />;
        break;
      case "out for signature":
        bgColor = "bg-amber-100";
        textColor = "text-amber-800";
        icon = <Clock className="mr-1.5 h-3.5 w-3.5 text-amber-600" />;
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
        icon = <Clock className="mr-1.5 h-3.5 w-3.5 text-gray-600" />;
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
      >
        {icon}
        {status}
      </span>
    );
  };

  const renderSigneeAvatars = (signees: any[]) => {
    const maxVisible = 3;
    const visibleSignees = signees.slice(0, maxVisible);
    const remainingCount = signees.length - maxVisible;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {visibleSignees.map((signee, i) => {
                  const initials = signee.Email
                    ? signee.Email.substring(0, 2).toUpperCase()
                    : "??";

                  // Generate a consistent color based on the email
                  const colorIndex = signee.Email
                    ? signee.Email.charCodeAt(0) % 5
                    : i % 5;

                  const bgColors = [
                    "bg-[#00CCAA] text-white",
                    "bg-[#33CCFF] text-white",
                    "bg-purple-500 text-white",
                    "bg-amber-500 text-white",
                    "bg-pink-500 text-white",
                  ];

                  return (
                    <Avatar
                      key={i}
                      className="h-8 w-8 border-2 border-white transition-transform hover:scale-110"
                    >
                      <AvatarFallback className={bgColors[colorIndex]}>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  );
                })}

                {remainingCount > 0 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-600 text-xs font-medium border-2 border-white">
                    +{remainingCount}
                  </div>
                )}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white p-2 shadow-lg rounded-lg border">
            <div className="w-64">
              <h4 className="font-medium text-sm mb-2 text-gray-700 flex items-center">
                <Users className="h-4 w-4 mr-1.5" />
                All Signees
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {signees.map((signee, i) => {
                  const initials = signee.Email
                    ? signee.Email.substring(0, 2).toUpperCase()
                    : "??";

                  const colorIndex = signee.Email
                    ? signee.Email.charCodeAt(0) % 5
                    : i % 5;

                  const bgColors = [
                    "bg-[#00CCAA] text-white",
                    "bg-[#33CCFF] text-white",
                    "bg-purple-500 text-white",
                    "bg-amber-500 text-white",
                    "bg-pink-500 text-white",
                  ];

                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className={bgColors[colorIndex]}>
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm truncate">{signee.Email}</div>
                      {signee.hasSigned && (
                        <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

<<<<<<< HEAD
  const filteredDocuments = documents.filter((doc) =>
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 md:p-10 max-w-6xl bg-[#f8fafc]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-[#000033]">
          Let's Sign Documents
        </h1>
        <p className="text-slate-500">Upload, manage and sign your documents</p>
=======
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
>>>>>>> bb5e8742e937c9f9a4aa2f7814432c93089cf778
      </div>

      <div className="mb-10">
        <DocumentUploader />
      </div>

<<<<<<< HEAD
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-[#000033] flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Your Documents
          </h2>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documents..."
              className="pl-9 bg-slate-50 border-slate-200 text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 border-4 border-[#00CCAA] border-t-transparent rounded-full animate-spin"></div>
=======
      <h2 className="text-xl font-semibold mb-4 mt-20">Documents</h2>

      {/* User Data Table Section */}
      <section className="w-full mt-8">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
>>>>>>> bb5e8742e937c9f9a4aa2f7814432c93089cf778
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
<<<<<<< HEAD
              <thead>
                <tr className="text-left text-sm text-slate-500 border-b">
                  <th className="pb-3 font-medium px-4">Name</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Created by</th>
                  <th className="pb-3 font-medium">Signees</th>
                  <th className="pb-3 font-medium">Last updated</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="text-black">
                {filteredDocuments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-500">
                      {searchQuery
                        ? "No documents match your search"
                        : "No documents available"}
                    </td>
                  </tr>
                ) : (
                  filteredDocuments.map((doc, idx) => (
                    <tr
                      key={idx}
                      className="border-b hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            {getFileIcon(doc.fileName)}
                          </div>
                          <Link
                            href={`/esign/document?id=${doc.fileId}`}
                            className="text-sm text-[#000033] hover:text-[#00CCAA] hover:underline font-medium"
=======
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
>>>>>>> bb5e8742e937c9f9a4aa2f7814432c93089cf778
                          >
                            {doc.fileName}
                          </Link>
                        </div>
                      </td>
                      <td className="py-4">{getStatusBadge(doc.status)}</td>
<<<<<<< HEAD
                      <td className="py-4 px-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-[#000033] text-white text-xs">
                              {user?.firstName?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span>You</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        {renderSigneeAvatars(doc.signees)}
                      </td>
                      <td className="py-4 text-sm">
                        <div className="flex items-center text-slate-600">
                          <Calendar className="h-3.5 w-3.5 mr-1.5" />
                          {formatDate(doc.signedAt)}
                        </div>
                      </td>
=======
                      <td className="py-4 px-4 text-sm">you</td>
                      <td className="py-4 px-2">
                        {renderSigneeAvatars(doc.signees)}
                      </td>
                      <td className="py-4 text-sm">{doc.signedAt}</td>
>>>>>>> bb5e8742e937c9f9a4aa2f7814432c93089cf778
                      <td className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
<<<<<<< HEAD
                              className="h-8 w-8 rounded-full cursor-pointer hover:bg-slate-100"
=======
                              className="h-8 w-8 rounded-full cursor-pointer "
>>>>>>> bb5e8742e937c9f9a4aa2f7814432c93089cf778
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem
                              onSelect={() => handleDocumentAction("open", doc)}
<<<<<<< HEAD
                              className="cursor-pointer hover:bg-slate-100"
                            >
                              <FileText className="mr-2 h-4 w-4 text-[#000033]" />
=======
                              className="cursor-pointer hover:bg-gray-500"
                            >
                              <FileText className="mr-2 h-4 w-4 text-black " />
>>>>>>> bb5e8742e937c9f9a4aa2f7814432c93089cf778
                              <p className="text-black">View</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault(); // Prevent menu from closing
                                handleDocumentAction("download", doc);
                              }}
<<<<<<< HEAD
                              className="cursor-pointer hover:bg-slate-100"
                              disabled={downloadLoading === doc.fileId}
                            >
                              <Download className="mr-2 h-4 w-4 text-[#000033]" />
=======
                              className="cursor-pointer hover:bg-gray-500"
                              disabled={downloadLoading === doc.fileId}
                            >
                              <Download className="mr-2 h-4 w-4 text-black" />
>>>>>>> bb5e8742e937c9f9a4aa2f7814432c93089cf778
                              <p className="text-black">
                                {downloadLoading === doc.fileId
                                  ? "Downloading..."
                                  : "Download"}
                              </p>
                              {downloadLoading === doc.fileId && (
<<<<<<< HEAD
                                <div className="ml-2 h-4 w-4 border-2 border-[#00CCAA] border-t-transparent rounded-full animate-spin" />
=======
                                <div className="ml-2 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
>>>>>>> bb5e8742e937c9f9a4aa2f7814432c93089cf778
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault(); // Prevent menu from closing
                                handleDocumentAction("delete", doc);
                              }}
<<<<<<< HEAD
                              className="cursor-pointer hover:bg-slate-100"
                              disabled={deleteLoading === doc.fileId}
                            >
                              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
=======
                              className="cursor-pointer hover:bg-gray-500"
                              disabled={deleteLoading === doc.fileId}
                            >
                              <Trash2 className="mr-2 h-4 w-4 text-black" />
>>>>>>> bb5e8742e937c9f9a4aa2f7814432c93089cf778
                              <p className="text-black">
                                {deleteLoading === doc.fileId
                                  ? "Deleting..."
                                  : "Delete"}
                              </p>
                              {deleteLoading === doc.fileId && (
<<<<<<< HEAD
                                <div className="ml-2 h-4 w-4 border-2 border-[#00CCAA] border-t-transparent rounded-full animate-spin" />
=======
                                <div className="ml-2 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
>>>>>>> bb5e8742e937c9f9a4aa2f7814432c93089cf778
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
<<<<<<< HEAD
      </div>
=======
      </section>
>>>>>>> bb5e8742e937c9f9a4aa2f7814432c93089cf778
    </div>
  );
}
