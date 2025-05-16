"use client"
import React, { useEffect, useRef, useState } from 'react'

function AllFile() {
     const[createFolder,setCreateFolder]=useState(false);
    const[folderName,setFolderName]=useState('');
     const [openFolderMenuIndex, setOpenFolderMenuIndex] = useState<number | null>(null);
      const [openFileMenuIndex, setOpenFileMenuIndex] = useState<number | null>(null);
    const [folders, setFolders] = useState(["Invoice", "Reports", "Contracts", "Marketing"]);
    const [nestedFile, setNestedFile] = useState<NestedFileType>({
  "Invoice": [
    { file: "Invoice_532.pdf", src: "./ss.png" },
    { file: "ProjectPlan_123.pdf", src: "./printer.png" },
  ],
  "Reports": [
    { file: "DataSheet_456.pdf", src: "./buzzer.jpg" },
    { file: "Notes_210.pdf", src: "./ss.png" },
  ],
  "Contracts": [
    { file: "Resume_789.pdf", src: "./ss1.png" },
    { file: "DataSheet_456.pdf", src: "./buzzer.jpg" },
    { file: "Notes_210.pdf", src: "./ss.png" },
  ],
  "Marketing": [
    { file: "Resume_789.pdf", src: "./ss1.png" },
    { file: "DataSheet_456.pdf", src: "./buzzer.jpg" },
    { file: "Notes_210.pdf", src: "./ss.png" },
  ],
  "PrintDrive": [
    { file: "Invoice_532.pdf", src: "./ss.png" },
    { file: "ProjectPlan_123.pdf", src: "./printer.png" },
    { file: "Resume_789.pdf", src: "./ss1.png" },
    { file: "DataSheet_456.pdf", src: "./buzzer.jpg" },
    { file: "Notes_210.pdf", src: "./ss.png" },
  ],
});

const fileInputRef = useRef<HTMLInputElement>(null);
    interface filetype{
        file:string,
        src:string,
    }
    interface Visible{
        file:Boolean,
        hamburger:Boolean,
    }
    type FileItem = {
        file: string;
        src: string;
      };
      
      type NestedFileType = {
        [category: string]: FileItem[];
      };
    const fileName:Array<filetype> = [
        { file: "Invoice_532.pdf", src: "./ss.png" },
        { file: "ProjectPlan_123.pdf", src: "./printer.png" },
        { file: "Resume_789.pdf", src: "./ss1.png" },
        { file: "DataSheet_456.pdf", src: "./buzzer.jpg" },
        { file: "Notes_210.pdf", src: "./ss.png" },
      ];
      
    const [files,setFiles]=useState<Array<filetype>>(fileName);
  
    const [fileSelection,setFileselection]=useState<string>("PrintDrive");
    const [searchText, setSearchText] = useState<string>("");

const handleAddFolder = () => {
  if (folderName.trim()) {
    setFolders((prev) => [...prev, folderName.trim()]); // ✅ Adds to state array
    setFolderName('');
    setCreateFolder(false);
  }
};
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const uploadedFile = e.target.files?.[0];
  if (!uploadedFile) return;

  const fileName = uploadedFile.name;

  const newFile = {
    file: fileName,
    src: "./fileicon.png", // You can use a generic icon or create previews if needed
  };

  setNestedFile((prev) => {
    const updated = { ...prev };
    if (!updated[fileSelection]) updated[fileSelection] = [];
    updated[fileSelection] = [...updated[fileSelection], newFile];
    return updated;
  });

  // Clear input (optional, if user uploads same file again)
  e.target.value = "";
};




    const [visible,setVisible]=useState<Visible>({file:false,hamburger:false});
    useEffect(() => {
        if (searchText.trim() === "") {
            setFiles(fileName); // No search text, show all
        } else {
            const regex = new RegExp(searchText, "i"); // Case-insensitive match
            const filtered = fileName.filter(item => regex.test(item.file));
            setFiles(filtered);
        }
    }, [searchText]);
    
  return (
    <div className='flex flex-col items-center justify-start p-2 bg-[#E6E6ED] rounded-lg w-full min-h-screen w-full  '>
        {/* Add/upload dropdown */}
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-x-4">
            <h2 className='font-semibold text-[#555555] w-fit text-2xl cursor-pointer' onClick={()=>setFileselection("PrintDrive")}>PrintDrive</h2>
            {fileSelection!=="PrintDrive"&& 
            <div className='flex items-center gap-x-2'>
                <img src="./chevronright.png" className='h-5 w-5 object-scale-down' alt="" />
                <p className='text-black text-2xl '>{fileSelection}</p>
                
                </div>}
            </div>
<div className="flex bg-white rounded-full  items-center relative cursor-pointers p-2 px-4" onClick={()=>setVisible((prev)=>({...prev,file:!prev.file,hamburger:false}))}>
    <img src="./plus.png" className="h-3 w-3 object-scale-down mr-2" alt="" />
    <p className='text-black font-normal'>Add</p>
    {visible.file&&<div className="flex flex-col items-center p-2 absolute bg-white top-12 right-12 min-w-[190px] rounded-lg z-50 ">
        <div className="flex items-center justify-start gap-x-2 hover:bg-[#06044B] hover:text-white text-black font-thin w-full cursor-pointer  rounded-t-xl py-2 border-b border-black group p-2" onClick={()=>setCreateFolder(true)}>
            <img src="./newfolder.png" className='h-5 w-5 object-scale-down group-hover:hidden' alt="" />
            <img src="./newfolder-white.png" className='h-5 w-5 object-scale-down group-hover:flex hidden' alt="" />

            <p className=''>New Folder </p>
        </div>
        <div className="flex items-center gap-x-2 hover:bg-[#06044B] hover:text-white text-black font-thin w-full cursor-pointer   py-2 justify-start group p-2" onClick={() => fileInputRef.current?.click()}>
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
            <div className="bg-white rounded-lg gap-x-1 flex items-center px-4 py-2 group relative" onClick={()=>setVisible((prev)=>({...prev,file:false,hamburger:!prev.hamburger}))}>
            <input type="checkbox" name="" id="sortDropdown" className='peer hidden' />

            <img src="./hamburger.png" className='h-6 w-7 ' alt="" />
            {visible.hamburger&&<div className="flex flex-col items-center p-2 absolute bg-white top-10 right-12 min-w-[170px] rounded-lg z-50  ">
            <div className="flex items-center pl-3 gap-x-2 hover:bg-[#06044B] hover:text-white text-[#555555] font-thin w-full cursor-pointer  rounded-lg py-2  ">
                Name

            </div>
            <div className="flex items-center pl-3  gap-x-2 hover:bg-[#06044B] hover:text-white text-[#555555] font-thin w-full cursor-pointer  rounded-lg py-2 ">
                Size

            </div>
            <div className="flex items-center pl-3 gap-x-2 hover:bg-[#06044B] hover:text-white text-[#555555] font-thin w-full cursor-pointer  rounded-lg py-2 ">
                Last Modified

            </div>


            </div>}
            
            </div>

          
        </div>

       
        
      {/* Folder Section */}
      <div className="flex flex-col items-start w-full mt-12">
        <p className="text-black font-normal mb-6">Folders</p>
        <div className="flex flex-wrap gap-4 w-full">
          {folders.map((folder, idx) => (
            <div
              key={idx}
              className="relative flex items-center justify-between bg-white rounded-lg p-2 min-w-[150px] w-1/5 max-[340px]:w-full cursor-pointer" 
            >
              <div
                className="flex items-center gap-x-2"
                onClick={() => setFileselection(folder)}
              >
                <img src="./folder.png" className="h-6 w-6 object-scale-down" alt="" />
                <p className="text-black font-thin">{folder}</p>
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
                  <div className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer">Rename</div>
                  <div className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer">Delete</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

        {/*folder creation */}
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
                onClick={() =>setCreateFolder(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                 onClick={()=>handleAddFolder()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
              </div>
          </div>
}
        
      {/* File Section */}
          <div className="flex flex-col justify-start w-full mt-12">
        <p className="text-black font-normal mb-6">Files of {fileSelection}</p>
        <div className="flex flex-wrap gap-4 w-full max-[480px]:justify-center">
          {nestedFile[fileSelection]?.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col bg-white rounded-lg p-2 max-[480px]:w-4/5 min-w-[200px] min-h-[150px] max-[480px]:min-h-[170px]"
            >
              <img
                src={item.src}
                alt={item.file}
                className="w-[200px] h-[150px] max-[480px]:w-full object-cover rounded-lg"
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-black/70 text-sm">{item.file}</p>
                <img
                  src="./threedot.webp"
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setOpenFileMenuIndex(openFileMenuIndex === idx ? null : idx)}
                  alt=""
                />
              </div>

              {openFileMenuIndex === idx && (
                <div className="absolute right-2 top-16 bg-white border shadow rounded z-50 w-[150px] text-sm">
                  <div className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer">Rename</div>
                  <div className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer">Delete</div>
                  <div className="hover:bg-[#06044B] hover:text-white p-2 cursor-pointer">Move to Folder</div>
                </div>
              )}
            </div>
          ))}
         </div>
       </div>
        
    </div>



  )
}

export default AllFile
