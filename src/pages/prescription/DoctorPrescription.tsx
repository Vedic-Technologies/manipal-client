import { trimText } from '../../util/General';
import { useGetAllPatientsQuery, useDeletePatientMutation, useUpdateActiveStatusMutation, useGetPatientByIdQuery } from '../../API/API';
import { useState, useEffect } from 'react';
import PatientDetailCardDoctor from '../patient/PatientDetailCardDoctor';
import DoctorsForm from './DoctorsForm';
import LoadingAnimation from "../../assets/animations/HospitalAnimation.json"
import ErrorAnimation from "../../assets/animations/ErrorCatAnimation.json"
import { Player } from '@lottiefiles/react-lottie-player';

const DoctorPrescription = () => {
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [patientId, setPatientId] = useState(null); // State to store selected patient ID

  const { data: patients = [], error, isLoading, refetch } = useGetAllPatientsQuery("");
  const { data: patientById = {}, error: patientByIdError, isLoading: isLoadingPatientById, refetch: refetchPatientById } = useGetPatientByIdQuery(patientId, {
    skip: !patientId,
  });

  console.log(patients); // Optional: Log fetched patients

  const inactivePatients = patients.filter(patient => !patient.active);

  const showPatientInfo = (id) => {
    setPatientId(id); // Set patientId to trigger refetch
    setShowPatientForm(true);
  };

  if (isLoading || isLoadingPatientById) {
    <div className="center flex-col gap-24 h-3/4 w-[90%]">
    <div>Loading patients...</div>
    <div>
      <Player autoplay loop src={LoadingAnimation} style={{ height: '200px', width: '200px' }} />
    </div>
  </div>
  }

  if (error || patientByIdError) {
    return (
        <div className="center flex-col gap-24 h-3/4 w-[90%]">
        <div className='text-red'>Error</div>
        <div className='flex flex-col gap-8 justify-center items-center ml-6'>
          <div>
            <Player autoplay loop src={ErrorAnimation} style={{ height: '200px', width: '200px' }} />
          </div>
          <div className="retry">
            <button onClick={() => refetch()} className='text-xl bg-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded'>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full mt-10 ">
      <div className="flex gap-5 overflow-x-auto m-auto max-w-screen-2xl">
        {inactivePatients.map((item) => (
          <div
            className="cursor-pointer shadow-md min-w-72 items-center flex gap-5 p-2 border border-gray-300 rounded-xl"
            key={item._id} // Add key prop for performance optimization
            onClick={() => showPatientInfo(item._id)}
          >
            <div className="">
              <img src={item.image} alt="" className="w-20 h-20 rounded-lg" />
            </div>
            <div className="">
              <div className="text-lg font-semibold">{item.patientName}</div>
            </div>
          </div>
        ))}
      </div>

      {showPatientForm && (
        <div className=" m-auto max-w-screen-2xl">
          <PatientDetailCardDoctor patient={patientById} />
          <DoctorsForm />
        </div>
      )}
    </div>
  );
};

export default DoctorPrescription;
