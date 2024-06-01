import React from 'react'
import {InfoData} from '../infocard/infoData'
import { Link } from 'react-router-dom'
 
const InfoCard : React.FC<{item:InfoData}> = ({item }) => {
  return (
    <>
        <div className="bg-white shadow-basic  w-[20%] h-24 p-2 rounded-lg flex justify-start gap-5 items-center relative overflow-hidden">
            <div className="">
            <img src={item.icon} alt="" className='size-20 border-2 p-2 rounded-lg'/>
            </div>
            <div className="">
           <div className="font-medium text-xl lg:text-base xl:text-lg 2xl:text-xl">{item.title}</div>
           <div className="text-4xl lg:text-red-500 lg:text-2xl xl:text-black xl:text-3xl xl:font-semibold 2xl:text-base 2xl:font-semibold">{item.count}</div>
            </div>
            {/* <div className="absolute right-9 top-1 w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="absolute right-7 top-5 w-3 h-3 bg-red-300 rounded-full"></div>
            <div className="absolute right-1 top-7 w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute -right-1 -top-2 w-8 h-8 bg-blue-300 rounded-full"></div> */}
            <Link to={item.cardUrl}><div className="absolute right-4 bottom-2 bg-blue-200 px-4 py-1 rounded-full text-sm hover:bg-blue-300">Details</div></Link>
        </div>
    </>
  )
}

export default InfoCard