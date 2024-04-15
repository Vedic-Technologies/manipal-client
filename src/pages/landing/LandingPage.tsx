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
import PatientToday from "./infocard/PatientToday";
import NewPatient from "./infocard/NewPatient";
import StaffAvailable from "./infocard/StaffAvailable";
import IncomeToday from "./infocard/IncomeToday";

const LandingPage = () => {
  return (
    <div className="h-auto w-[100%] m-auto flex flex-col bg-gradient-to-r from-purple-50 to-purple-100  font-roboto px-10">
      <nav className=" flex pr-10 justify-between gap-3 mt-5 text-xl ">
        <div className="text-4xl">Dashboard</div>
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

      <div className=" flex justify-between mt-10 w-full  xl:flex-col 2xl:flex-row">
        <PatientToday />
        <NewPatient />
        <StaffAvailable />
        <IncomeToday />
      </div>

      <div className=" w-[100%] flex flex-col  justify-center items-center  m-auto">
        <div id="top" className="w-full pt-5 flex gap-5 h-full ">
          <DailyIncomeCard />
          <div className=" w-1/2 h-[100%] flex flex-col justify-around gap-y-2  m-auto">
            <TotalRevenue />
            <TotalPatient />
          </div>
        </div>

        <div id="middle" className="w-full pt-5 flex gap-5 xl:flex-col 2xl:flex-row ">
          <DoctorReferenceCard />
          <MaleFemaleRatio />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
