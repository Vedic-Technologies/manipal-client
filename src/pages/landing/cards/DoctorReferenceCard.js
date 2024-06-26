import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import physio from "../../../assets/images/image.png";
import Profile from "../../../assets/images/Profile.png";

export const recentDoctorReferences = [
  {
    doctorName: "Dr. Hem Shankar Sharma",
    patientName: "Suresh Yadav",
    date: "2024-03-23",
    docId: "12345",
    patientNum: "5",
    currentStatus: "Active",
    docSpeciality: "Cardiopulmonary",
    contactNum: "1234567890",
    profileImg: <img className="h-20 w-20" src={Profile} alt="" />
  },
  {
    doctorName: "Dr.Somen Chatarji",
    patientName: "Manjit Pande",
    date: "2024-03-24",
    docId: "54321",
    patientNum: "5",
    currentStatus: "Active",
    docSpeciality: "Neurological",
    contactNum: "1234567890",
    profileImg: <img className="h-20 w-20" src={Profile} alt="" />
  },
  {
    doctorName: "Dr. Amitabh Singh",
    patientName: "Bikas Kumar Singh",
    date: "2024-03-25",
    docId: "67890",
    patientNum: "72",
    currentStatus: "Active",
    docSpeciality: "Orthopedic",
    contactNum: "1234567890",
    profileImg: <img className="h-20 w-20" src={Profile} alt="" />
  },
  {
    doctorName: "Dr. Amitabh Singh",
    patientName: "Bikas Kumar Singh",
    date: "2024-03-25",
    docId: "67890",
    patientNum: "54",
    currentStatus: "Active",
    docSpeciality: "Pediatric",
    contactNum: "1234567890",
    profileImg: <img className="h-20 w-20" src={Profile} alt="" />
  },
  {
    doctorName: "Dr. Amitabh Singh",
    patientName: "Bikas Kumar Singh",
    date: "2024-03-25",
    docId: "67890",
    patientNum: "50",
    currentStatus: "Active",
    docSpeciality: "Geriatric",
    contactNum: "1234567890",
    profileImg: <img className="h-20 w-20" src={Profile} alt="" />
  },
];


export const DoctorReferenceCard = () => {

  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(
          "https://manipal-server.onrender.com/api-docs/#/doctor/get_api_doctors_all_doctors_"
        );
        if (response.ok) {
          const data = await response.json();
          setDoctorData(data); // Set the fetched Doctor data to state
        } else {
          throw new Error("Failed to fetch Doctor data");
        }
      } catch (error) {
        console.error("Error fetching Doctor data:", error);
      }
    };

    fetchDoctorData();
  }, []); // Fetch Doctor data on component mount

  return (
    <div className="bg-white shadow-md rounded-lg overflow-auto grow w-full">
      <div className="px-6 py-5">
        <div className="font-bold text-xl mb-2">Recent Doctor Reference</div>
        <div className="overflow-x-auto">
          <div className="w-full">
            <div className="flex w-full">
              <div className="py-2 font-bold max-w-[10%] grow">Rank</div>
              <div className="py-2 font-bold max-w-[30%] grow">Doctor Name</div>
              <div className="py-2 font-bold max-w-[30%] grow">This Week</div>
              {/* <div className="py-2 font-bold max-w-[30%] grow">Date</div> */}
            </div>

            {/* {recentDoctorReferences.map((reference, index) => (
              <div key={index} className="flex divide-y w-full justify-start">
                <div className="py-2 max-w-[10%] grow">{index + 1}</div>
                <div className="py-2 max-w-[30%] grow text-left">{reference.doctorName}</div>
                <div className="py-2 max-w-[30%] grow text-left">{reference.patientName}</div>
                <div className="py-2 grow">{reference.date}</div>
              </div>
            ))} */}
c
            {doctorData.slice(0, 5).map((patient, index) => (
              <div key={index} className="flex divide-y w-full justify-start">
                <div className="py-2 max-w-[10%] grow">{index + 1}</div>
                <div className="py-2 max-w-[30%] grow text-left">{doctorData.doctorName}</div>
                <div className="py-2 max-w-[30%] grow text-left">{doctorData.patientNum}</div>
                {/* <div className="py-2 grow"> {patient.date ? patient.date : 'NA'}</div> */}
              </div>
            ))}

            <div className="w-full flex justify-end">
              <Link to="doctor_reference">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  See All References
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
