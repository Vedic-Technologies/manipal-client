import { useState, useEffect } from "react";
import physotherapist_img from "../../assets/images/physiotherapist.png"

const patientData = {
  name: "Ramesh Pashwan",
  gender: "Male",
  weight: "70 kg",
  bloodGroup: "AB+",
  age: 35,
  referTo: "Dr. Modi"
};

const PresCription = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center">PresCription
      <div className="bg-blue-100 h-[850px] w-[700px] mt-12">
        <nav className="flex justify-between gap-10 border-b-8 rounded-b-3xl border-black bg-green-200 ">
          <div className="m-2 pl-10">
            <div className="text-2xl font-semibold">Dr. Name</div>
            <div className="text-red-600">Physotherapist</div>
            <div>Qualifications</div>
            <div className="text-lg">Manipal Physiotherapy</div>
          </div>
          <img src={physotherapist_img} alt="" className="h-32 mr-20 bg-red-200 " />
        </nav>
        <div>
        <div className=" flex justify-between" >
          
        <div className="relative">
          <div className="pt-2 font-semibold">Date: {currentDate.toDateString()}, Time: {currentDate.toLocaleTimeString()}</div>
          <div className="bg-red-400 h-11 w-16 text-center mt-2"><i className="fa-solid fa-prescription text-3xl text-white p-1"></i></div>
<div className=" absolute bottom-0">Signature : </div>
            </div>
            <div className=" h-[710px] w-1/3 border-l-4 border-black p-2 flex flex-col gap-20">
            <div>Name:  {patientData.name}</div>
            <div>Gender: {patientData.gender}</div>
            <div>Weight: {patientData.weight}</div>
            <div>Blood Group: {patientData.bloodGroup}</div>
            <div>Age: {patientData.age}</div>
            <div>Refer To: {patientData.referTo}</div>
            </div>
         

          </div>
        </div>
        <footer className="bg-green-100 ">(footer)Hospital Name and all..</footer>
      </div>
    </div>
  )
}

export default PresCription
