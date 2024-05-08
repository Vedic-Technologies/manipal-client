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
import { data, InfoData } from "../landing/infocard/infoData";
import InfoCard from "./infocard/InfoCard";

const LandingPage = () => {
  return (
    <div className="h-auto mb-10 w-[100%] m-auto flex flex-col bg-gradient-to-r from-purple-50 to-purple-100  font-roboto px-10">
     

      <div className=" flex  mt-10 w-full gap-5 lg- ">
        {data.map((item: InfoData) => {
          return <InfoCard item={item}/>;
        })}
      </div>

      <div className=" w-[100%] flex flex-col  justify-center items-center  m-auto">
        <div id="top" className="w-full pt-5 flex gap-5 h-full ">
          <DailyIncomeCard />
          <div className=" w-1/2 h-[100%] flex flex-col justify-around gap-y-5  m-auto">
            <TotalRevenue />
            <TotalPatient />
          </div>
        </div>

        <div
          id="middle"
          className="w-full pt-5 flex gap-5 xl:flex-col 2xl:flex-row "
        >
          <DoctorReferenceCard />
          <MaleFemaleRatio />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
