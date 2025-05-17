"use client";
import { useUser } from "@clerk/nextjs";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface File {
  fileId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

interface Folder {
  folderId: string | null;
  folderName: string;
  files: File[];
}
const API_URL = "http://localhost:5000/api";
function AllFile() {
  const [createFolder, setCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [openFolderMenuIndex, setOpenFolderMenuIndex] = useState<number | null>(
    null
  );
  const [openFileMenuIndex, setOpenFileMenuIndex] = useState<string | null>(
    null
  );
  const [folders, setFolders] = useState<Folder[]>([]);
  const [fileSelection, setFileselection] = useState<string>("Root");
  const [searchText, setSearchText] = useState<string>("");
  const [visible, setVisible] = useState({ file: false });
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<{
    addFolder: boolean;
    uploadFile: boolean;
    deleteFolder: boolean;
    moveFile: boolean;
    deleteFile: boolean;
  }>({
    addFolder: false,
    uploadFile: false,
    deleteFolder: false,
    moveFile: false,
    deleteFile: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch folders and files from backend
  const fetchFolders = async () => {
    try {
      const response = await fetch(
        `${API_URL}/fileManagement/getFiles/${
          user?.id || "user_2wnUNxZtME63CvOzZpEWF6nLm3a"
        }`,
        {
          method: "GET",
        }
      ); // Replace with actual endpoint
      const result: { msg: string; data: Folder[] } = await response.json();
      console.log(result);
      setFolders(result.data);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  // Initial data fetch and refetch after actions
  useEffect(() => {
    fetchFolders();
  }, []);

  // Search logic
  useEffect(() => {
    if (searchText.trim() === "") {
      fetchFolders(); // Reset to full data when search is cleared
    } else {
      const regex = new RegExp(searchText, "i");
      const allFiles = folders.flatMap((folder) => folder.files || []);
      const filtered = allFiles.filter((file) => regex.test(file.fileName));
      setFolders((prev) =>
        prev.map((folder) => ({
          ...folder,
          files: folder.folderName === fileSelection ? filtered : folder.files,
        }))
      );
    }
  }, [searchText, fileSelection]);

  // Add folder
  const handleAddFolder = async () => {
    if (!folderName.trim()) return;
    setIsLoading((prev) => ({ ...prev, addFolder: true }));
    const payload = {
      folderName,
      ownerId: user?.id || "user_2wnUNxZtME63CvOzZpEWF6nLm3a",
    };

    try {
      const response = await fetch(`${API_URL}/fileManagement/createFolder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFolderName("");
        setCreateFolder(false);
        await fetchFolders(); // Refetch data
      } else {
        console.error("Failed to add folder");
      }
    } catch (error) {
      console.error("Error adding folder:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, addFolder: false }));
    }
  };

  // Upload file
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fileSelection) return;

    setIsLoading((prev) => ({ ...prev, uploadFile: true }));
    const formData = new FormData();
    const fileId = String(Date.now());
    formData.append("file", file);
    formData.append("ownerId", user?.id || "user_2wnUNxZtME63CvOzZpEWF6nLm3a");
    formData.append("fileId", fileId);

    try {
      const response = await fetch(`${API_URL}/esign/upload-document`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await fetchFolders(); // Refetch data
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, uploadFile: false }));
    }
  };

  // Rename folder
  const handleRenameFolder = async (folder: Folder, newName: string) => {
    try {
      const response = await fetch(
        `${API_URL}/fileManagement/renameFolder/${folder.folderId}/${newName}`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        setOpenFolderMenuIndex(null);
        await fetchFolders(); // Refetch data
      } else {
        console.error("Failed to rename folder");
      }
    } catch (error) {
      console.error("Error renaming folder:", error);
    }
  };

  // Delete folder
  const handleDeleteFolder = async (folder: Folder) => {
    setIsLoading((prev) => ({ ...prev, deleteFolder: true }));
    try {
      const response = await fetch(
        `${API_URL}/fileManagement/deleteFolder/${folder.folderId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setOpenFolderMenuIndex(null);
        await fetchFolders(); // Refetch data
      } else {
        console.error("Failed to delete folder");
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, deleteFolder: false }));
    }
  };

  // Move file to folder
  const handleMoveFile = async (fileId: string, folderId: string) => {
    setIsLoading((prev) => ({ ...prev, moveFile: true }));
    try {
      const response = await fetch(
        `${API_URL}/fileManagement/moveFileToFolder`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileId, folderId }),
        }
      );

      if (response.ok) {
        setOpenFileMenuIndex(null);
        await fetchFolders(); // Refetch data
      } else {
        console.error("Failed to move file");
      }
    } catch (error) {
      console.error("Error moving file:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, moveFile: false }));
    }
  };

  // Delete file
  const handleDeleteFile = async (fileId: string, fileName: string) => {
    setIsLoading((prev) => ({ ...prev, deleteFile: true }));
    try {
      const response = await fetch(`${API_URL}/fileManagement/deleteFile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileId,
          ownerId: user?.id || "user_2wnUNxZtME63CvOzZpEWF6nLm3a",
          fileName,
        }),
      });

      if (response.ok) {
        setOpenFileMenuIndex(null);
        await fetchFolders(); // Refetch data
      } else {
        console.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, deleteFile: false }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-start p-2 bg-[#E6E6ED] rounded-lg min-h-screen w-full">
      {/* Add/upload dropdown */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-4">
          <h2
            className="font-semibold text-[#555555] text-2xl cursor-pointer"
            onClick={() => setFileselection("Root")}
          >
            Root
          </h2>
          {fileSelection !== "Root" && (
            <div className="flex items-center gap-x-2">
              <img src="./chevronright.png" className="h-5 w-5" alt="" />
              <p className="text-black text-2xl">{fileSelection}</p>
            </div>
          )}
        </div>
        <div
          className="flex bg-white rounded-full items-center cursor-pointer p-2 px-4"
          onClick={() =>
            setVisible((prev) => ({
              ...prev,
              file: !prev.file,
            }))
          }
        >
          <img src="./plus.png" className="h-3 w-3 mr-2" alt="" />
          <p className="text-black">Add</p>
          {visible.file && (
            <div className="flex flex-col p-2 absolute bg-white top-12 right-12 min-w-[190px] rounded-lg z-50">
              <div
                className="flex items-center gap-x-2 hover:bg-[#06044B] hover:text-white text-black font-thin w-full cursor-pointer py-2 p-2"
                onClick={() => setCreateFolder(true)}
              >
                <img src="./newfolder.png" className="h-5 w-5" alt="" />
                <p>New Folder</p>
              </div>
              <div
                className="flex items-center gap-x-2 hover:bg-[#06044B] hover:text-white text-black font-thin w-full cursor-pointer py-2 p-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <img src="./upload.png" className="h-5 w-5" alt="" />
                <p>Upload File</p>
                {isLoading.uploadFile && (
                  <svg
                    className="animate-spin ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search input */}
      <div className="w-full mt-6 flex items-center gap-x-2">
        <div className="relative w-11/12">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 py-2 rounded-lg text-sm bg-white w-full"
            placeholder="Search"
          />
          <img
            src="./search.png"
            className="absolute h-4 w-4 top-3 left-3"
            alt=""
          />
        </div>
        <div className="bg-white rounded-lg flex items-center px-4 py-2">
          <img src="./filter.png" className="h-3 w-3" alt="" />
          <p className="text-black text-sm">Filter</p>
        </div>
      </div>

      {/* Folders Section */}
      <div className="flex flex-col items-start w-full mt-12">
        <p className="text-black mb-6">Folders</p>
        <div className="flex flex-wrap gap-4 w-full">
          {folders.map((folder, idx) => (
            <div
              key={folder.folderId || "root"}
              className={`relative flex items-center justify-between ${
                fileSelection === folder.folderName
                  ? "bg-[#06044B] text-white"
                  : "bg-white"
              } rounded-lg p-2 min-w-[150px] w-1/5 cursor-pointer`}
            >
              <div
                className="flex items-center gap-x-2"
                onClick={() => setFileselection(folder.folderName)}
              >
                <img src="./folder.png" className="h-6 w-6" alt="" />
                <p
                  className={
                    fileSelection === folder.folderName
                      ? "text-white"
                      : "text-black"
                  }
                >
                  {folder.folderName}
                </p>
              </div>
              <img
                src="./threedot.webp"
                className="h-4 w-4"
                onClick={() =>
                  setOpenFolderMenuIndex(
                    openFolderMenuIndex === idx ? null : idx
                  )
                }
                alt=""
              />
              {openFolderMenuIndex === idx && (
                <div className="absolute right-0 top-10 bg-white border shadow rounded z-50 w-[120px] text-sm">
                  <div
                    className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer"
                    onClick={() => {
                      const newName = prompt(
                        "Enter new folder name:",
                        folder.folderName
                      );
                      if (newName) handleRenameFolder(folder, newName);
                    }}
                  >
                    Rename
                  </div>
                  <div
                    className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer"
                    onClick={() => handleDeleteFolder(folder)}
                  >
                    Delete
                    {isLoading.deleteFolder && (
                      <svg
                        className="animate-spin ml-2 h-4 w-4 inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Folder creation */}
      {createFolder && (
        <div className="bg-white p-6 rounded-lg shadow-md w-80 absolute">
          <h2 className="text-lg font-semibold mb-4">Enter Folder Name</h2>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            placeholder="Folder name"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setCreateFolder(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddFolder}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
            >
              Add
              {isLoading.addFolder && (
                <svg
                  className="animate-spin ml-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Files Section */}
      <div className="flex flex-col justify-start w-full mt-12">
        <p className="text-black mb-6">
          {searchText.trim() !== ""
            ? `Search Results for ${searchText}`
            : `Files of ${fileSelection}`}
        </p>
        <div className="flex flex-wrap gap-4 w-full">
          {folders
            .find((folder) => folder.folderName === fileSelection)
            ?.files?.map((item: File) => (
              <div
                key={item.fileId}
                className="relative flex flex-col bg-white rounded-lg p-2 min-w-[200px] min-h-[150px]"
              >
                <img
                  src={
                    item.fileType.includes("pdf")
                      ? "/pdf_file.png"
                      : item.fileUrl
                  }
                  alt={item.fileName}
                  className="w-[200px] h-[150px] object-cover rounded-lg"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-black/70 text-sm">{item.fileName}</p>
                  <img
                    src="./threedot.webp"
                    className="h-4 w-4 cursor-pointer"
                    onClick={() =>
                      setOpenFileMenuIndex(
                        openFileMenuIndex === item.fileId ? null : item.fileId
                      )
                    }
                    alt=""
                  />
                </div>
                {openFileMenuIndex === item.fileId && (
                  <div className="absolute right-0 top-full mt-1 bg-white border shadow rounded z-50 w-[150px] text-sm">
                    <div
                      className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer"
                      onClick={() => setOpenFileMenuIndex(null)}
                    >
                      Rename
                    </div>
                    <div
                      className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer"
                      onClick={() =>
                        handleDeleteFile(item.fileId, item.fileName)
                      }
                    >
                      Delete
                      {isLoading.deleteFile && (
                        <svg
                          className="animate-spin ml-2 h-4 w-4 inline"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                    </div>
                    <div className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span>Move to Folder</span>
                        {isLoading.moveFile && (
                          <svg
                            className="animate-spin ml-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}
                      </div>
                      <select
                        className="w-full mt-1 p-1 text-black bg-white rounded"
                        onChange={(e) => {
                          if (e.target.value) {
                            handleMoveFile(item.fileId, e.target.value);
                          }
                        }}
                      >
                        <option value="">Select folder</option>
                        {folders.map(
                          (folder) =>
                            folder.folderName !== fileSelection && (
                              <option
                                key={folder.folderId}
                                value={folder.folderId || ""}
                              >
                                {folder.folderName}
                              </option>
                            )
                        )}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AllFile;
