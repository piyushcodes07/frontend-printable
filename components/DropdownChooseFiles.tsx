
import Image from 'next/image'
import React from 'react'

const ChooseDropdown=()=>{
    
    const download=[
        {
            image:'/doc.png',
            name:'From Device'
        },
        {
            image:'/Excel.png',
            name:'From Printable'
        },
        {
            image:'/dropbox.png',
            name:'From Dropbox'
        },
        {
            image:'/drive.png',
            name:'From Drive'
        }
    ];
    return(
        <div className=' relative top-[-185px] left-[30px]'>
            <ul className="bg-white p-2 rounded-lg">
                <div>
                {
                    download.map((item,index)=>(
                        <div key={index} className='flex gap-2 items-center p-1 hover:text-white hover:bg-[#06044B]'>
                <Image src={item.image} alt='image' width={18} height={18}></Image>
                <li className="text-[14px] hover:text-white ">{item.name}</li>
                </div>
                    ))
                }
                </div>
            </ul>
        </div>
    )
}
export default ChooseDropdown