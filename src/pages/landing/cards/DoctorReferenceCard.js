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

  return (
    <div className="bg-white shadow-md rounded-lg overflow-auto grow">
      <div className="px-6 py-5">
        <div className="font-bold text-xl mb-2">Recent Doctor Reference</div>
        <div className="overflow-x-auto">
          <div className="w-full">
            <div className="flex w-full">
              <div className="  py-2 font-bold min-w-14 grow">S.N.</div>
              <div className="  py-2 font-bold min-w-52 grow">Doctor Name</div>
              <div className="  py-2 font-bold min-w-52 grow">Patient Name</div>
              <div className="  py-2 font-bold min-w-36 grow">Date</div>
              {/* Add more div elements for additional fields */}
            </div>
            {recentDoctorReferences.map((reference, index) => (
              <div key={index} className="flex divide-y w-full">
                <div className=" py-2 min-w-14 grow">{index + 1}</div>
                <div className=" py-2 min-w-52 grow">{reference.doctorName}</div>
                <div className=" py-2 min-w-52 grow">{reference.patientName}</div>
                <div className=" py-2 min-w-36 grow">{reference.date}</div>
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

