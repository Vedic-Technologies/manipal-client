import { trimText } from '../../util/General';
import { motion } from 'framer-motion';
import { useGetAllPatientsQuery, useDeletePatientMutation, useUpdateActiveStatusMutation } from '../../API/API';
import { useState } from 'react';
import axios from 'axios';
import PatientDetailCardDoctor from '../patient/PatientDetailCardDoctor';
import PeriarthritisShoulderForm from './PeriarthritisShoulderForm';
import KidsForm from './KidsForm';
import AdultForm from './AdultForm';
import OldAgeForm from './OldAgeForm';
const DoctorPrescription = () => {
    const [showPatientForm,setShowPatientForm]=useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const [patient, setPatient] = useState();
    const TypeOfForm = ["soulder", "kids", "adult", "old age"];
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
    const renderForm = () => {
        switch (selectedForm) {
          case "soulder":
            return <PeriarthritisShoulderForm />;
          case "kids":
            return <KidsForm />;
          case "adult":
            return <AdultForm />;
          case "old age":
            return <OldAgeForm />;
          default:
            return <p>Select a form to display</p>;
        }
      };

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
            <div className="p-4">
      <div className="flex space-x-2 mb-4">
        {TypeOfForm.map((formType) => (
          <button
            key={formType}
            onClick={() => setSelectedForm(formType)}
            className={`px-4 py-2 rounded-full ${selectedForm === formType ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            {formType}
          </button>
        ))}
      </div>
      <div>
        {renderForm()}
      </div>
    </div>
        </div>)}


        </div>
    );
};

export default DoctorPrescription;