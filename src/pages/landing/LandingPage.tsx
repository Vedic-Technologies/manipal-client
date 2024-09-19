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
import { useInfoData, InfoData } from "../landing/infocard/infoData";
import InfoCard from "./infocard/InfoCard";

const LandingPage = () => {
  const { data } = useInfoData();
  return (
    <div className=" mb-10 w-[100%]  flex flex-col bg-gradient-to-r from-purple-50 to-purple-100  font-roboto px-10">
     

      <div className=" flex justify-between  mt-10 w-full gap-5 lg- ">
        {data.map((item: InfoData) => {
          return <InfoCard item={item}/>;
        })}
      </div>

      <div className=" w-full flex flex-col  m-auto mt-5 h-full">
        <div  className="w-full h-full flex gap-5  ">
          <DailyIncomeCard />
          <div className=" w-1/2 h-full  flex flex-col justify-around gap-5  ">
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
