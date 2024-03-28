import { Link } from "react-router-dom";
import physio from "../../../assets/images/image.png";


export const recentDoctorReferences = [
  {
    doctorName: "Dr. Hem Shanksr Sharma",
    patientName: "Suresh Yadav",
    date: "2024-03-23",
    indexNumber: "12345",
  },
  {
    doctorName: "Dr.Somen Chatarji",
    patientName: "Manjit Pande",
    date: "2024-03-24",
    indexNumber: "54321",
  },
  {
    doctorName: "Dr. Amitabh Singh",
    patientName: "Bikas Kumar Singh",
    date: "2024-03-25",
    indexNumber: "67890",
  },
  {
    doctorName: "Dr. Amitabh Singh",
    patientName: "Bikas Kumar Singh",
    date: "2024-03-25",
    indexNumber: "67890",
  },
  {
    doctorName: "Dr. Amitabh Singh",
    patientName: "Bikas Kumar Singh",
    date: "2024-03-25",
    indexNumber: "67890",
  },
];
export const DoctorReferenceCard = () => {

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-[100%] ">
      <div className="px-6 py-5">
        <div className="font-bold text-xl mb-2">Recent Doctor Reference</div>
        <div className="overflow-x-auto">
          <div className="w-full">
            <div className="flex">
              <div className="  py-2 font-bold min-w-14">S.N.</div>
              <div className="  py-2 font-bold min-w-52">Doctor Name</div>
              <div className="  py-2 font-bold min-w-52">Patient Name</div>
              <div className="  py-2 font-bold min-w-52">Date</div>
              {/* Add more div elements for additional fields */}
            </div>
            {recentDoctorReferences.map((reference, index) => (
              <div key={index} className="flex divide-y">
                <div className=" py-2 min-w-14">{index + 1}</div>
                <div className=" py-2 min-w-52">{reference.doctorName}</div>
                <div className=" py-2 min-w-52">{reference.patientName}</div>
                <div className=" py-2 min-w-52">{reference.date}</div>
                {/* Add more div elements for additional data */}
              </div>
            ))}
            <div className="w-full flex justify-end">
              <Link to='doctor_reference'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                See All References
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

