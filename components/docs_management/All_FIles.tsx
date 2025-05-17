
"use client"
import React, { useEffect, useRef, useState } from 'react'
import Form_data from '../../app/docs_management/data.json';

function AllFile() {
  const [createFolder, setCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [openFolderMenuIndex, setOpenFolderMenuIndex] = useState<number | null>(null);
  const [openFileMenuIndex, setOpenFileMenuIndex] = useState<string | null>(null);
  const [folders, setFolders] = useState<any[]>([]);

  useEffect(() => {
    // Load initial data
    setFolders(Form_data.data)
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  interface filetype {
    file: string,
    src: string,
  }

  interface Visible {
    file: Boolean,
    hamburger: Boolean,
  }

  const fileName: Array<filetype> = [
    { file: "Invoice_532.pdf", src: "./ss.png" },
    { file: "ProjectPlan_123.pdf", src: "./printer.png" },
    { file: "Resume_789.pdf", src: "./ss1.png" },
    { file: "DataSheet_456.pdf", src: "./buzzer.jpg" },
    { file: "Notes_210.pdf", src: "./ss.png" },
  ];

  const [files, setFiles] = useState<Array<filetype>>(fileName);
  const [fileSelection, setFileselection] = useState<string>("Root");
  const [searchText, setSearchText] = useState<string>("");

  const handleAddFolder = () => {
    if (!folderName.trim()) return;

    const newFolder = {
      folderId: Date.now().toString(), // or use uuid()
      folderName: folderName,
      files: [],
    };

    setFolders((prev) => [...prev, newFolder]);
    setFolderName('');
    setCreateFolder(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fileSelection) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newFile = {
        fileId: Date.now().toString(),
        fileName: file.name,
        fileUrl: reader.result, // for preview only (base64)
        fileType: file.type,
        fileSize: file.size,
      };

      setFolders((prevFolders) =>
        prevFolders.map((folder) => {
          const id = folder.folderName || "Root";
          if (id === fileSelection) {
            return {
              ...folder,
              files: [...folder.files, newFile],
            };
          }
          return folder;
        })
      );
    };
    reader.readAsDataURL(file);
  };

  const [visible, setVisible] = useState<Visible>({ file: false, hamburger: false });

  // UPDATED SEARCH useEffect:
  useEffect(() => {
    if (searchText.trim() === "") {
      setFiles(fileName); // No search text, show root files
    } else {
      const regex = new RegExp(searchText, "i"); // Case-insensitive match

      // Collect all files from all folders
      const allFiles = folders.flatMap(folder => folder.files || []);

      // Filter by search text on fileName
      const filtered = allFiles.filter((file: any) => regex.test(file.fileName));

      setFiles(filtered);
    }
  }, [searchText, folders]);

  return (
    <div className='flex flex-col items-center justify-start p-2 bg-[#E6E6ED] rounded-lg w-full min-h-screen w-full'>
      {/* Add/upload dropdown */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-4">
          <h2 className='font-semibold text-[#555555] w-fit text-2xl cursor-pointer' onClick={() => setFileselection("Root")}>Root</h2>
          {fileSelection !== "Root" &&
            <div className='flex items-center gap-x-2'>
              <img src="./chevronright.png" className='h-5 w-5 object-scale-down' alt="" />
              <p className='text-black text-2xl '>{fileSelection}</p>
            </div>}
        </div>
        <div className="flex bg-white rounded-full items-center relative cursor-pointer p-2 px-4" onClick={() => setVisible((prev) => ({ ...prev, file: !prev.file, hamburger: false }))}>
          <img src="./plus.png" className="h-3 w-3 object-scale-down mr-2" alt="" />
          <p className='text-black font-normal'>Add</p>
          {visible.file && <div className="flex flex-col items-center p-2 absolute bg-white top-12 right-12 min-w-[190px] rounded-lg z-50 ">
            <div className="flex items-center justify-start gap-x-2 hover:bg-[#06044B] hover:text-white text-black font-thin w-full cursor-pointer rounded-t-xl py-2 border-b border-black group p-2" onClick={() => setCreateFolder(true)}>
              <img src="./newfolder.png" className='h-5 w-5 object-scale-down group-hover:hidden' alt="" />
              <img src="./newfolder-white.png" className='h-5 w-5 object-scale-down group-hover:flex hidden' alt="" />
              <p className=''>New Folder </p>
            </div>
            <div className="flex items-center gap-x-2 hover:bg-[#06044B] hover:text-white text-black font-thin w-full cursor-pointer py-2 justify-start group p-2" onClick={() => fileInputRef.current?.click()}>
              <img src="./upload.png" className='h-5 w-5 object-scale-down group-hover:hidden' alt="" />
              <img src="./upload-white.png" className='h-5 w-5 object-scale-down group-hover:flex hidden' alt="" />
              <p>Upload File</p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileUpload}
              />
            </div>
            <div className="flex items-center gap-2 text-gray-400 font-thin rounded-b w-full py-2 px-2 border-t border-black/20 pointer-events-none cursor-default">
              <img src="./upload.png" className="h-5 w-5 object-scale-down" alt="" />
              <p>Upload Folder</p>
            </div>
          </div>}
        </div>
      </div>
      {/* search input */}
      <div className="w-full mt-6 flex items-center gap-x-2">
        <div className="relative w-11/12">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='pl-10 py-2 rounded-lg font-thin text-black/60 text-sm bg-white w-full'
            placeholder='Search'
          />
          <img src="./search.png" className='absolute h-4 w-4 top-3 left-3 z-50' alt="" />
        </div>
        <div className="bg-white rounded-lg gap-x-1 flex items-center px-4 py-2">
          <img src="./filter.png" className='h-3 w-3 object-scale-down ' alt="" />
          <p className='text-black font-normal text-sm'>Filter</p>
        </div>
        <div className="bg-white rounded-lg gap-x-1 flex items-center px-4 py-2 group relative" onClick={() => setVisible((prev) => ({ ...prev, file: false, hamburger: !prev.hamburger }))}>
          <input type="checkbox" name="" id="sortDropdown" className='peer hidden' />
          <img src="./hamburger.png" className='h-6 w-7 ' alt="" />
          {visible.hamburger && <div className="flex flex-col items-center p-2 absolute bg-white top-10 right-12 min-w-[170px] rounded-lg z-50  ">
            <div className="flex items-center pl-3 gap-x-2 hover:bg-[#06044B] hover:text-white text-[#555555] font-thin w-full cursor-pointer rounded-lg py-2  ">
              Name
            </div>
            <div className="flex items-center pl-3  gap-x-2 hover:bg-[#06044B] hover:text-white text-[#555555] font-thin w-full cursor-pointer rounded-lg py-2 ">
              Size
            </div>
            <div className="flex items-center pl-3 gap-x-2 hover:bg-[#06044B] hover:text-white text-[#555555] font-thin w-full cursor-pointer rounded-lg py-2 ">
              Last Modified
            </div>
          </div>}
        </div>
      </div>

      <div className="flex flex-col items-start w-full mt-12">
        <p className="text-black font-normal mb-6">Folders</p>
        <div className="flex flex-wrap gap-4 w-full">
          {folders.map((folder, idx) => (
            <div
              key={folder.folderId || "root"}
              className="relative flex items-center justify-between bg-white rounded-lg p-2 min-w-[150px] w-1/5 max-[340px]:w-full cursor-pointer"
            >
              <div
                className="flex items-center gap-x-2"
                onClick={() => setFileselection(folder.folderName)}
              >
                <img src="./folder.png" className="h-6 w-6 object-scale-down" alt="" />
                <p className="text-black font-thin">{folder.folderName}</p>
              </div>
              <img
                src="./threedot.webp"
                className="h-4 w-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenFolderMenuIndex(openFolderMenuIndex === idx ? null : idx);
                }}
                alt=""
              />
              {openFolderMenuIndex === idx && (
                <div className="absolute right-0 top-10 bg-white border shadow rounded z-50 w-[120px] text-sm">
                  <div
                    className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer"
                    onClick={() => setOpenFolderMenuIndex(null)}
                  >
                    Rename
                  </div>
                  <div
                    className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer"
                    onClick={() => setOpenFolderMenuIndex(null)}
                  >
                    Delete
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* folder creation */}
      {createFolder && <div className="bg-white p-6 rounded-lg shadow-md w-80 absolute ">
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
            onClick={() => handleAddFolder()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>}

      {/* Files Section */}
      <div className="flex flex-col justify-start w-full mt-12">
        <p className="text-black font-normal mb-6">
          {searchText.trim() !== "" ? `Search Results for ${searchText} `: `Files of ${fileSelection}`}
        </p>

        {/* Show search results if searching */}
        {searchText.trim() !== "" ? (
          files.length > 0 ? (
            <div className="flex flex-wrap gap-4 w-full max-[480px]:justify-center">
              {files.map((item: any) => (
                <div
                  key={item.fileId || item.file} // fallback key if fileId missing
                  className="relative flex flex-col bg-white rounded-lg p-2 max-[480px]:w-4/5 min-w-[200px] min-h-[150px] max-[480px]:min-h-[170px]"
                >
                  <img
                    src={item.fileUrl || item.src || "./ss.png"}
                    alt={item.fileName || item.file}
                    className="w-[200px] h-[150px] max-[480px]:w-full object-cover rounded-lg"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-black/70 text-sm">{item.fileName || item.file}</p>
                    <img
                      src="./threedot.webp"
                      className="h-4 w-4 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenFileMenuIndex(openFileMenuIndex === (item.fileId || item.file) ? null : (item.fileId || item.file));
                      }}
                      alt=""
                    />
                  </div>

                  {openFileMenuIndex === (item.fileId || item.file) && (
                    <div className="absolute right-0 top-full mt-1 bg-white border shadow rounded z-50 w-[150px] text-sm">
                      <div
                        className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer"
                        onClick={() => setOpenFileMenuIndex(null)}
                      >
                        Rename
                      </div>
                      <div
                        className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer"
                        onClick={() => setOpenFileMenuIndex(null)}
                      >
                        Delete
                      </div>
                      <div
                        className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer"
                        onClick={() => setOpenFileMenuIndex(null)}
                      >
                        Move to Folder
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No files found matching your search.</p>
          )
        ) : (
          // Show files of selected folder when not searching
          folders.find((folder) => folder.folderName === fileSelection)?.files && (
            <div className="flex flex-wrap gap-4 w-full max-[480px]:justify-center">
              {folders.find((folder) => folder.folderName === fileSelection)
                .files.map((item: any) => (
                  <div
                    key={item.fileId}
                    className="relative flex flex-col bg-white rounded-lg p-2 max-[480px]:w-4/5 min-w-[200px] min-h-[150px] max-[480px]:min-h-[170px]"
                  >
                    <img
                      src={item.fileType.includes("pdf")?"/pdf_file.png":item.fileUrl}
                      alt={item.fileName}
                      className="w-[200px] h-[150px] max-[480px]:w-full object-cover rounded-lg"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-black/70 text-sm">{item.fileName}</p>
                      <img
                        src="./threedot.webp"
                        className="h-4 w-4 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenFileMenuIndex(openFileMenuIndex === item.fileId ? null : item.fileId);
                        }}
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
                          onClick={() => setOpenFileMenuIndex(null)}
                        >
                          Delete
                        </div>
                        <div
                          className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer"
                          onClick={() => setOpenFileMenuIndex(null)}
                        >
                          Move to Folder
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default AllFile;
