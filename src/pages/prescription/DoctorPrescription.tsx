import { trimText } from '../../util/General';
import { motion } from 'framer-motion';
import { useGetAllPatientsQuery, useDeletePatientMutation, useUpdateActiveStatusMutation } from '../../API/API';
import { useState } from 'react';
import axios from 'axios';
import PatientDetailCardDoctor from '../patient/PatientDetailCardDoctor';
import DoctorsForm from './DoctorsForm';
const DoctorPrescription = () => {
    const [showPatientForm,setShowPatientForm]=useState(false);
    const [patient, setPatient] = useState();
//    ok first find patient whose status is false
const { data: patients = [], error, isLoading, refetch } = useGetAllPatientsQuery("");
console.log(patients);
const inactivePatients = patients.filter(patient => !patient.active);
const showPatientInfo=async(id)=>
    {

        try {
            const response = await axios.get(
              `https://manipal-server.onrender.com/api/patient/${id}`
            );
            setPatient(response.data);
            setShowPatientForm(true)
          } catch (error) {
            console.error("Error fetching patient details:", error);
          }
       
        console.log(id)
    }
    return (
        <div className=" w-full mt-10 ">
        <div className='flex gap-5 overflow-x-auto  m-auto max-w-screen-2xl'>
           {inactivePatients.map((item)=>
        {
            return(
                <div className='cursor-pointer shadow-md min-w-72 items-center flex gap-5 p-2 border border-gray-300 rounded-xl '
                onClick={()=>showPatientInfo(item._id)}
                >
                    <div className="">
                        <img src={item.image} alt="" className='w-20 h-20 rounded-lg' />
                    </div>
                    <div className="">
                    <div className='text-lg font-semibold'>{item.patientName}</div>
                 
                    </div>
                </div>
            )
        })}
        </div>
        {/* Patient ka Info  */}
        {showPatientForm && (<div className=" m-auto max-w-screen-2xl">
            <PatientDetailCardDoctor patient={patient}/>
           <DoctorsForm/>
        </div>)}


        </div>
    );
};

export default DoctorPrescription;
