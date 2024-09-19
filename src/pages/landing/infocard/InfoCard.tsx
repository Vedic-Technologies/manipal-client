import React from 'react'
import { InfoData } from '../infocard/infoData'
import { Link } from 'react-router-dom'

const InfoCard: React.FC<{ item: InfoData }> = ({ item }) => {
  return (
    <>
      <div className="bg-white shadow-basic  w-[20%] h-24 p-2 rounded-lg flex justify-start gap-5 items-center relative overflow-hidden">
        <div className="">
          <img src={item.icon} alt="" className='size-20 border-2 p-2 rounded-lg hidden xl:block' />
        </div>
        <div className="">
          <div className="font-medium text-sm lg:text-lg 2xl:text-xl">{item.title}</div>
          <div
            className={`
    ${item.count > 1000 ? 'text-base lg:text-xl 2xl:text-2xl' : item.count > 100 ? 'text-xl lg:text-2xl' : item.count >= 0 ? 'text-3xl lg:text-2xl' : ''} font-medium 2xl:font-semibold
  `}
          >
            {item.count}
          </div>


        </div>
        {/* <div className="absolute right-9 top-1 w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="absolute right-7 top-5 w-3 h-3 bg-red-300 rounded-full"></div>
            <div className="absolute right-1 top-7 w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute -right-1 -top-2 w-8 h-8 bg-blue-300 rounded-full"></div> */}
        <Link to={item.cardUrl}>
          <div className="absolute right-4 bottom-2 bg-blue-200 px-4 py-1 rounded-full text-sm hover:bg-blue-300 opacity-80"><span className='hidden 2xl:block'>Details</span>
            <span className='block 2xl:hidden'><i className="fa-solid fa-info text-xs lg:text-base"></i></span></div>

        </Link>
      </div>
    </>
  )
}

export default InfoCard