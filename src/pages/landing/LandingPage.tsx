import React from "react";
import hospital_icon from "../../assets/images/hospital_icon.png";
import relieved_icon from "../../assets/images/relieved_icon.png";
import ventilator_icon from "../../assets/images/vantilator_icon.png";
// import { Table } from "flowbite-react";
import doctor_icon from "../../assets/images/doctor_icon.png";
import Card from "./cards/Card";
import DailyIncomeCard from "./cards/DailyIncomeCard";
import { DoctorReferenceCard } from "./cards/DoctorReferenceCard";
import MaleFemaleRatio from "./cards/MaleFemaleRatio";
import { Link } from "react-router-dom";
import TotalRevenue from "./cards/TotalRevenue";
import TotalPatient from "./cards/TotalPatient";
import { MdWavingHand } from "react-icons/md";
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


        <div className=" w-72 h-24 bg-white  rounded-2xl p-4  shadow-basic relative overflow-hidden">
          <div className="text-sm font-bold">New Patients Today</div>
          <div className="flex mt-2 items-center">
            <div className="bg-red-400 center h-10 w-10 rounded-full text-xl  text-white "><MdWavingHand /></div>
            <div className="text-3xl ml-3">34</div>
            <div className="ml-28 cursor-pointer text-blue-500 text-md hover:scale-110 mt-3">See All</div>
            <div className="absolute right-9 top-1 w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="absolute right-7 top-5 w-3 h-3 bg-red-300 rounded-full"></div>
            <div className="absolute right-1 top-7 w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute -right-1 -top-2 w-8 h-8 bg-blue-300 rounded-full"></div>
          </div>
        </div>


        {/* <div className="flex w-52 h-20  rounded-full justify-center items-center shadow-lg  bg-white">
          <div>
            <img src={relieved_icon} alt="" className="h-10" />
          </div>
          <div className="ml-4 text-sm">
            <div>8</div>
            <div className="font-bold">New Appointments</div>
          </div>
        </div> */}
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

      <div className=" w-[100%] flex flex-col  justify-center items-center  m-auto">
        <div id="top" className=" w-full pt-5 flex gap-5   ">
          {/* <DoctorReferenceCard /> */}
          <DailyIncomeCard />
          <div className="ml-12">
            <TotalRevenue />
            <TotalPatient />

          </div>

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
