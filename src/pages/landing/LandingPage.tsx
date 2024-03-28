import React from "react";
import hospital_icon from "../../assets/images/hospital_icon.png";
import relieved_icon from "../../assets/images/relieved_icon.png";
import ventilator_icon from "../../assets/images/vantilator_icon.png";
// import { Table } from "flowbite-react";
import doctor_icon from "../../assets/images/doctor_icon.png";
import Card from "./cards/Card";
import DailyIncomeCard from "./cards/DailyIncomeCard";
import {DoctorReferenceCard }from "./cards/DoctorReferenceCard";
import MaleFemaleRatio from "./cards/MaleFemaleRatio";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className="h-auto w-full flex flex-col bg-gradient-to-r from-purple-50 to-purple-100 p-10 font-roboto">
      <nav className=" flex pr-10 justify-between gap-3  text-xl ">
        <div className="text-4xl">Dashboard</div>
        {/* <div className="text-4xl tracking-wide"><span className="bg-blue-500 px-2 rounded-md text-white m-[0.8px] ">M</span>anipal <span className="bg-blue-500 px-2 rounded-md text-white m-[0.8px]">P</span>hysiotherapy <span className="bg-blue-500 px-2 rounded-md text-white m-[0.8px]">C</span>enter</div> */}
        <div className="flex gap-3">
        <div className=" bg-white w-10 h-10 rounded-full center">
          <i className="fa-regular fa-user "></i>
        </div>
        <div className=" bg-white w-10 h-10 rounded-full center relative">
          <i className="fa-regular fa-bell "></i>
          <div className="absolute bg-red-500 w-3 h-3 rounded-full top-0 right-0"></div>
        </div>
        </div>
       
      </nav>
     

      <div className=" flex flex-wrap  gap-5 mt-10  ml-10 ">
        <div className="flex w-52 h-20  rounded-full  justify-center items-center bg-white shadow-lg cursor-pointer hover:bg-blue-100">
          <div>
            <img src={hospital_icon} alt="" className="h-10" />
          </div>
          <div className="ml-4 text-sm">
            <div>25</div>
            <div className="font-bold">Patient Today</div>
          </div>
        </div>
        <div className="flex w-52 h-20  rounded-full justify-center items-center shadow-lg  bg-white">
          <div>
            <img src={relieved_icon} alt="" className="h-10" />
          </div>
          <div className="ml-4 text-sm">
            <div>8</div>
            <div className="font-bold">New Appointments</div>
          </div>
        </div>
        <div className="flex w-52 h-20  rounded-full justify-center items-center shadow-lg cursor-pointer  bg-white">
          <div>
            <img src={ventilator_icon} alt="" className="h-10" />
          </div>
          <div className="ml-4 text-sm">
            <div>3</div>
            <div className="font-bold">Staff Available</div>
          </div>
        </div>
        <div className="flex w-52 h-20  rounded-full justify-center items-center shadow-lg  bg-white">
          <div>
            <img src={ventilator_icon} alt="" className="h-10" />
          </div>
          <div className="ml-4 text-sm">
            <div>15,200 Rs</div>
            <div className="font-bold">Income Today</div>
          </div>
        </div>
      </div>

      <div className=" w-full flex flex-col  justify-center items-center  m-auto">
        <div id="top" className=" w-full pt-5 flex gap-5   ">
         {/* <DoctorReferenceCard /> */}
<DailyIncomeCard />
<DoctorReferenceCard />
        </div>

        <div id="middle" className="w-full pt-5 flex gap-10   h-fit">
        <DoctorReferenceCard />
        <MaleFemaleRatio />
    

        </div>
      </div>
    </div>
  );
};

export default LandingPage;
