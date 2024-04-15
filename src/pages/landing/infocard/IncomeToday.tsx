import React from 'react'
import { GiMoneyStack } from "react-icons/gi";
const IncomeToday = () => {
  return (
    <div>
         <div className=" w-[24%] h-24 bg-white  rounded-2xl p-4  shadow-basic relative overflow-hidden">
          <div className="text-sm font-bold">Income Today</div>
          <div className="flex mt-2 items-center">
            <div className="bg-red-500 center h-10 w-10 rounded-full text-xl  text-white ">
              <GiMoneyStack />
            </div>
            <div className="text-3xl ml-3">34</div>
            <div className="ml-28 cursor-pointer text-blue-500 text-md hover:scale-110 mt-3">
              See All
            </div>
            <div className="absolute right-9 top-1 w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="absolute right-7 top-5 w-3 h-3 bg-red-300 rounded-full"></div>
            <div className="absolute right-1 top-7 w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute -right-1 -top-2 w-8 h-8 bg-blue-300 rounded-full"></div>
          </div>
        </div>
    </div>
  )
}

export default IncomeToday