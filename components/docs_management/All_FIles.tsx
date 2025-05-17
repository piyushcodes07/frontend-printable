"use client";
import { POST } from "@/app/api/flatten/route";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useRef, useState } from "react";

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch folders and files from backend
  const fetchFolders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/fileManagement/getFiles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ownerId: user?.id || "user_2wnUNxZtME63CvOzZpEWF6nLm3a",
          }),
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
    const payload = {
      folderName,
      ownerId: user?.id || "user_2wnUNxZtME63CvOzZpEWF6nLm3a",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/fileManagement/createFolder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setFolderName("");
        setCreateFolder(false);
        await fetchFolders(); // Refetch data
      } else {
        console.error("Failed to add folder");
      }
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  // Upload file
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fileSelection) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", fileSelection);

    try {
      const response = await fetch("/api/files", {
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
    }
  };

  // Rename folder
  const handleRenameFolder = async (folder: Folder, newName: string) => {
    try {
      const response = await fetch(`/api/folders/${folder.folderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderName: newName }),
      });

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
    try {
      const response = await fetch(`/api/folders/${folder.folderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOpenFolderMenuIndex(null);
        await fetchFolders(); // Refetch data
      } else {
        console.error("Failed to delete folder");
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  // Move file to folder
  const handleMoveFile = async (fileId: string, targetFolderName: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}/move`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetFolderName }),
      });

      if (response.ok) {
        setOpenFileMenuIndex(null);
        await fetchFolders(); // Refetch data
      } else {
        console.error("Failed to move file");
      }
    } catch (error) {
      console.error("Error moving file:", error);
    }
  };

  // Delete file
  const handleDeleteFile = async (fileId: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOpenFileMenuIndex(null);
        await fetchFolders(); // Refetch data
      } else {
        console.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
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
              className="relative flex items-center justify-between bg-white rounded-lg p-2 min-w-[150px] w-1/5 cursor-pointer"
            >
              <div
                className="flex items-center gap-x-2"
                onClick={() => setFileselection(folder.folderName)}
              >
                <img src="./folder.png" className="h-6 w-6" alt="" />
                <p className="text-black">{folder.folderName}</p>
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
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
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
                      onClick={() => handleDeleteFile(item.fileId)}
                    >
                      Delete
                    </div>
                    <div
                      className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer"
                      onClick={() => {
                        const targetFolder = prompt(
                          "Enter target folder name:"
                        );
                        if (targetFolder)
                          handleMoveFile(item.fileId, targetFolder);
                      }}
                    >
                      Move to Folder
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
