
import React, { useState,useEffect } from 'react';
// import profile from '../../assets/images/profile.jpg'
import UserDetails from './UserDetails';
import DefaultUserDetails from './DefaultUserDetails';
import PaymentDetails from './PaymentDetails';
import AlertWrapper from '../../custom_components/AlertWrapper';
import JobDoneAlert from "../../custom_components/JobDoneAlert"
import { motion } from "framer-motion"
import { useGetAllPatientsQuery } from '../../API/API';
const PaymentEntry = () => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [patientId, setPatientId] = useState('');
 // jodDone alert message 
 const [jobDoneMessage, setJobDoneMessage] = useState("")
 const [openJobDoneAlert, setOpenJobDoneAlert] = useState(false)

 const handleCancelAlert = () => {
  setOpenJobDoneAlert(false)
}

const {data =[]} = useGetAllPatientsQuery("");

  const handleSelectChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  const handleInputChange = (e) => {
    setPatientId(e.target.value);
  };

  const handleFindButtonClick = () => {
    setSelectedPatient('');
    const foundPatient = data.find(user => user._id === patientId);
    if (foundPatient) {
      setSelectedPatient(foundPatient._id);
    } else {
      // Handle case where patient with entered ID is not found
      setSelectedPatient('');
      setJobDoneMessage("Can not find Patient. Double-check ID !!")
      setOpenJobDoneAlert(true)

    // removing result not found alert automatically
    setTimeout(() => {
      setOpenJobDoneAlert(false)
    }, 3000);

    }
  };

  const getUserDetails = () => {
    if (selectedPatient) {
      return data.find(user => user._id === selectedPatient);
    } else if (patientId) {
      return data.find(user => user._id === parseInt(patientId));
    } else {
      return null;
    }
  };

  const selectedUser = getUserDetails();

  return (
    <>
      <div className="w-4/5 m-auto flex flex-col items-start justify-start  ">
        <div className="text-xl font-semibold mb-2 mt-3">Select Patient</div>
        <div className={`container mx-auto px-4 py-4 flex border-2 rounded-2xl h-72 p-3 border-gray-300 ${selectedUser ? 'w-full' : 'w-1/2'} transition-width duration-500`}>
          <div className="w-1/2 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-3">
              <div className="flex items-start mb-4 flex-col">
                <label className="mr-2 font-medium">Enter Patient Name</label>
                <select
                  value={selectedPatient}
                  onChange={handleSelectChange}
                  className="border border-gray-300 rounded px-3 py-2 w-60 mt-1"
                >
                  <option value="">Select a patient</option>
                  {data.map((user) => (
                    <option key={user._id} value={user._id}>{user.patientName}</option>
                  ))}
                </select>
              </div>
              <div className="text-center font-semibold">---- OR ----</div>
              <div className="flex items-start mb-4 flex-col relative">
                <label className="mr-2 font-medium">Patient ID:</label>
                <input
                  type="text"
                  value={patientId}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 w-60 mt-1"
                  placeholder="Enter patient ID"
                />
                <div
                  className="bg-blue-700 py-[5px] px-5 rounded text-white text-lg cursor-pointer absolute -right-24 top-[30px]"
                  onClick={handleFindButtonClick} // Trigger search on button click
                >
                  Find
                </div>
              </div>
            </div>
          </div>
          {selectedUser ? (
            <div className="bg-sky-50 shadow-lg rounded-lg p-6 w-1/2 border boder-gray-200">
              <h2 className="text-lg font-semibold mb-4">User Details</h2>
              <UserDetails user={selectedUser}  />
            </div>
          ) : 
      
     (
        null
          )}
        </div>
      </div>
      {selectedUser && <PaymentDetails patientId={selectedUser._id} />}
      <AlertWrapper isOpen={openJobDoneAlert}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={openJobDoneAlert ? { opacity: 1, y: 0 } : {}}
            >
              <JobDoneAlert
                height="h-24"
                width="w-52"
                textColor="text-white"
                bgColor="bg-red-400"
                boxShadow=" shadow-[0px_0px_42px_2px_#c53030] "
                message={jobDoneMessage}
                isOpen={openJobDoneAlert}
                OnCancel={handleCancelAlert}
                isCancelButton="block"
              />
            </motion.div>
          </AlertWrapper>
    </>
  );
};


   
  
 

export default PaymentEntry;
