"use client"
import React, { useEffect, useRef, useState } from 'react'

function AllFile() {
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
    const folders=["Invoice","Reports","Contracts","Marketing"];
    const nestedFile:NestedFileType={
        "Invoice":[
            { file: "Invoice_532.pdf", src: "./ss.png" },
            { file: "ProjectPlan_123.pdf", src: "./printer.png" },
        ],
        "Reports":[
            { file: "DataSheet_456.pdf", src: "./buzzer.jpg" },
            { file: "Notes_210.pdf", src: "./ss.png" },
        ],
        "Contracts":[
            { file: "Resume_789.pdf", src: "./ss1.png" },
            { file: "DataSheet_456.pdf", src: "./buzzer.jpg" },
            { file: "Notes_210.pdf", src: "./ss.png" },
        ],
        "Marketing":[
            { file: "Resume_789.pdf", src: "./ss1.png" },
            { file: "DataSheet_456.pdf", src: "./buzzer.jpg" },
            { file: "Notes_210.pdf", src: "./ss.png" },
        ],
        "PrintDrive":[
            { file: "Invoice_532.pdf", src: "./ss.png" },
            { file: "ProjectPlan_123.pdf", src: "./printer.png" },
            { file: "Resume_789.pdf", src: "./ss1.png" },
            { file: "DataSheet_456.pdf", src: "./buzzer.jpg" },
            { file: "Notes_210.pdf", src: "./ss.png" },
        ]
    }
    const [fileSelection,setFileselection]=useState<string>("PrintDrive");
    const [searchText, setSearchText] = useState<string>("");

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
        <div className="flex items-center justify-start gap-x-2 hover:bg-[#06044B] hover:text-white text-black font-thin w-full cursor-pointer  rounded-t-xl py-2 border-b border-black group p-2">
            <img src="./newfolder.png" className='h-5 w-5 object-scale-down group-hover:hidden' alt="" />
            <img src="./newfolder-white.png" className='h-5 w-5 object-scale-down group-hover:flex hidden' alt="" />

            <p className=''>New Folder </p>
        </div>
        <div className="flex items-center gap-x-2 hover:bg-[#06044B] hover:text-white text-black font-thin w-full cursor-pointer   py-2 justify-start group p-2">
            <img src="./upload.png" className='h-5 w-5 object-scale-down group-hover:hidden' alt="" />
            <img src="./upload-white.png" className='h-5 w-5 object-scale-down group-hover:flex hidden' alt="" />

            <p className=''>Upload File</p>
        </div>
        <div className="flex items-center gap-x-2 hover:bg-[#06044B] hover:text-white text-black font-thin rounded-b w-full cursor-pointer  rounded-b-lg py-2 justify-start border-t border-black/20 group p-2">
            <img src="upload.png" className='h-5 w-5 object-scale-down group-hover:hidden' alt="" />
            <img src="upload-white.png" className='h-5 w-5 object-scale-down group-hover:flex hidden' alt="" />

            <p className=''>Upload Folder</p>
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

        {/* all folders */}
        
        <div className="flex flex-col items-start w-full mt-12">
            <p className='text-black font-normal mb-6'>Folders</p>
            <div className="flex items-center flex-wrap justify-between w-full gap-4 ">
            {folders.map((item,idx)=><div className='p-2 flex items-center  bg-white rounded-lg w-1/5 justify-between min-w-[150px] cursor-pointer max-[340px]:w-full' key={idx} onClick={()=>setFileselection((prev)=>item)}>
                <div className="flex gap-x-2 items-center">
                    <img src="./folder.png"className='h-6 w-6 object-scale-down' alt="" />
                    <p className='text-black font-thin'>{item}</p>
                </div>
                <img src="./threedot.webp" className='h-4 w-4' alt="" />

            </div>)}
            </div>
        </div>

        {/* All files */}

        <div className="flex flex-col justify-start w-full mt-12">
            <p className='text-black font-normal mb-6'>Files</p>
            <div className="flex flex-wrap items-center  max-[480px]:justify-center gap-4  w-full">
                {nestedFile[fileSelection].map((item,idx)=><div className="flex flex-col items-center max-[480px]:w-4/5 min-w-[200px] bg-white min-h-[150px] max-[480px]:min-h-[170px] rounded-lg p-2 overflow-hidden" key={idx}>
                    <img src={item.src} alt="" className='max-[480px]:w-full w-[200px] h-[150px] max-[480px]:min-h-[170px] object-cover rounded-lg ' />
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-x-2">
                            <img src="./pdf.png" className='h-3 w-3 object-scale-down' alt="" />
                            <p className='text-black font-thin truncate'>{item.file}</p>
                        </div>
                        <img src="./threedot.webp" className='h-4 w-4 object-scale-down' alt="" />
                    </div>
                </div>)}

            </div>
        </div>
        
    </div>
  )
}

export default AllFile