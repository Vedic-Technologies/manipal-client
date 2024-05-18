import React from 'react'
import {InfoData} from '../infocard/infoData'
import { Link } from 'react-router-dom'
 
const InfoCard : React.FC<{item:InfoData}> = ({item }) => {
  return (
    <>
        <div className="flex-1 bg-white shadow-basic  w-full h-24 p-2 rounded-lg flex justify-start gap-5 items-center relative overflow-hidden">
            <div className="">
            <img src={item.icon} alt="" className='size-20 border-2 p-2 rounded-lg'/>
            </div>
            <div className="">
           <div className="font-medium text-xl lg:text-base xl:text-lg 2xl:text-xl">{item.title}</div>
           <div className="text-4xl lg:text-red-500 lg:text-2xl xl:text-black xl:text-3xl xl:font-semibold 2xl:text-3xl 2xl:font-semibold">{item.count}</div>
            </div>
            {/* <div className="absolute right-9 top-1 w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="absolute right-7 top-5 w-3 h-3 bg-red-300 rounded-full"></div>
            <div className="absolute right-1 top-7 w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute -right-1 -top-2 w-8 h-8 bg-blue-300 rounded-full"></div> */}
            <Link to={item.cardUrl}><div className="absolute right-4 bottom-2 bg-blue-200 px-5 py-1 rounded-full text-sm hover:bg-blue-300">Details</div></Link>
        </div>
          {/* <div className=" min-w-[24%] h-24 bg-white  rounded-2xl p-4  shadow-basic relative overflow-hidden">
          <div className="text-sm font-bold"> New Patients</div>
          <div className="flex mt-2 items-center">
            <div className="bg-red-400 center min-h-10 min-w-10 rounded-full text-xl  text-white ">
              {" "}
           <img src={item.icon} alt="" className='size-20'/>
            </div>
            <div className="text-3xl ml-3">6</div>
            <div className="ml-28 min-w-32 cursor-pointer text-blue-500 text-md hover:scale-110 mt-3">
              See All
            </div>
            <div className="absolute right-9 top-1 w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="absolute right-7 top-5 w-3 h-3 bg-red-300 rounded-full"></div>
            <div className="absolute right-1 top-7 w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute -right-1 -top-2 w-8 h-8 bg-blue-300 rounded-full"></div>
          </div>
        </div> */}
    </>
  )
}

export default InfoCard