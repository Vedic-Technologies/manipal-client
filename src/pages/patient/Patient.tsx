import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://manipal-server.onrender.com/api/patient/all_patients');
        setPatients(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (patientId) => {
    console.log('Edit patient:', patientId);
  };

  const handleDelete = async (patientId) => {
    try {
      const response = await axios.delete(`https://manipal-server.onrender.com/api/patient/${patientId}`);
      setPatients(patients.filter((patient) => patient._id !== patientId));

      setSearchResult(null);
      setShowDetails(false);
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastPatient = currentPage * pageSize;
  const indexOfFirstPatient = indexOfLastPatient - pageSize;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  if (isLoading) {
    return <div className="text-center p-4">Loading patients...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error.message}</div>;
  }

  if (!currentPatients.length) {
    return <div className="text-center p-4">No patients found.</div>;
  }

  const downloadExcel = () => {
    const headers = ['Patient Name', 'Gender', 'Age', 'Contact', 'Email'];
    const data = currentPatients.map(patient => {
      return [patient.patientName, patient.gender, patient.age, patient.contact, patient.email];
    });
    data.unshift(headers);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Patients');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(excelBlob);
    downloadLink.download = 'patients.xlsx';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
  };

  const searchPatient = () => {
    const result = patients.find((patient) =>
      patient.patientName === searchInput ||
      patient.patientName === searchInput.toLowerCase() ||
      patient.contact === searchInput ||
      patient.email === searchInput
    );

    if (result) {
      setSearchResult(result);
      setShowDetails(true);
    } else {
      setSearchResult(null);
      setShowDetails(false);
      alert("Patient not found, make sure spelling is correct");
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  //Patient details on click 
  const handleDetails = (patientId) => {
const selectedPatient= patients.find((patient)=>patient._id ===patientId);
if(selectedPatient){
  setSearchResult(selectedPatient);
  setShowDetails(true);
}else{
  setSearchResult(null);
  setShowDetails(false);
  alert("Patient not found.");
}
  };
  return (
    <div className="patient-list px-4 py-2 ">
      <div className='  '><span>Patients &gt; </span>
        <span className='text-gray-400 text-sm'>Patient List</span>
      </div>

      <div className='h-[600px] mt-4 py-2 px-4 rounded-md bg-white relative'>
        <div className='flex justify-between px-2 py-1 pr-10'>
          <div className='flex gap-5'>
            <div className=' font-bold text-xl'>Patient List</div>
            <div className="search relative">
              <input onKeyDown={(e) => {
                  if (e.key === "Enter") searchPatient();
                }}
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput} type="search" placeholder='Search' className='rounded-lg h-8 bg-red-100 px-2 pb-3 pr-4' />
              <i onClick={() => { searchPatient() }} className="fa-solid fa-magnifying-glass absolute right-1 bottom-2 text-gray-500 cursor-pointer"></i>
              {showDetails && (
                <div className=" bg-red-100 opacity-95 p-4 mt-4 top-8 absolute left-48 size-96 z-10 rounded-md ">
                  <div className='flex justify-between'>
                    <h2 className="text-xl font-semibold p-2">{searchResult?.patientName}</h2>
                    <div onClick={() => { setShowDetails(false) }} className="cut"><i className="fa-solid fa-xmark  text-2xl text-red-600"></i></div>
                  </div>
                  <div className='center w-full '>
                    <div>
                      <div className='p-1 px-10'>
                        <img src="https://picsum.photos/200/300" alt="profile picture" className=' opacity-100 h-28 w-28 hover:scale-[1.01] hover: transition-all duration-300 rounded-full' />
                      </div>
                      <p className='mt-1 p-1 px-10 rounded-md transition-all duration-300 bg-red-300 hover:bg-gray-400 font-medium  hover:text-white'>Gender: {searchResult?.gender}</p>
                      <p className='mt-1 p-1 px-10 rounded-md transition-all duration-300 bg-red-300 hover:bg-gray-400 font-medium  hover:text-white'>Age: {searchResult?.age}</p>
                      <p className='mt-1 p-1 px-10 rounded-md transition-all duration-300 bg-red-300 hover:bg-gray-400 font-medium  hover:text-white'>Contact: {searchResult?.contact}</p>
                      <p className='mt-1 p-1 px-10 rounded-md transition-all duration-300 bg-red-300 hover:bg-gray-400 font-medium  hover:text-white'>Email: {searchResult?.email}</p>
                    </div>
                  </div>
                  <div className='flex gap-4 mt-5 ml-2'>
                    <i className="fa-regular fa-pen-to-square edit hover:text-blue-900 text-blue-400"></i>
                    <i onClick={() => handleDelete(searchResult?._id)} className="fa-solid fa-trash-can text-red-600 delete hover:text-red-900"></i>
                  </div>
                </div>
              )}
            </div>
            <div className='bg-red-300 text-gray-800 center size-8 rounded-full cursor-pointer'><Link to="/home/prescription"><i className="fa-solid fa-plus"></i></Link></div>
            <div onClick={handleRefresh} className="bg-red-300 text-gray-800 center size-8 rounded-full cursor-pointer"><i className="fa-solid fa-rotate"></i></div>
          </div>
          <div onClick={downloadExcel} className='text-green-600 cursor-pointer '>Download Excel  <i className="fa-regular fa-file-excel text-2xl text-green-500"></i></div>
        </div>
        <div className="patient-header flex border-b border-gray-200 justify-between items-center px-2 py-2 font-medium">
          <div className="w-1/4 ">Patient Name <i className={`fa-solid fa-arrow-up text-xs text-gray-300 `}></i> <i className={`fa-solid fa-arrow-down  text-xs text-gray-300`}></i></div>
          <div className="w-1/6">Gender <i className={`fa-solid fa-arrow-up text-xs text-gray-300 `}></i> <i className={`fa-solid fa-arrow-down  text-xs text-gray-300`}></i></div>
          <div className="w-1/6">Age <i className={`fa-solid fa-arrow-up text-xs text-gray-300 `}></i> <i className={`fa-solid fa-arrow-down  text-xs text-gray-300`}></i></div>
          <div className="w-1/6 ">Contact</div>
          <div className="w-1/6 hidden sm:block">Email</div>
          <div className="w-1/6 text-center">Actions</div>
        </div>
        <div>
          {currentPatients.map((patient) => (
            <div  key={patient._id} className=" font-medium patient-row flex border-b border-gray-100  justify-between items-center px-2 py-2 hover:scale-[1.001] hover:bg-gray-100 transition-all duration-300">
             <div onClick={()=>{handleDetails(patient._id)}} className=' w-[85%] flex justify-between items-center'>
              <div className='w-1/4 flex gap-1 items-center '>
                <img src="https://picsum.photos/200/300" alt="" className='bg-green-400 size-8 rounded-full' />
                <div className=" ">{patient.patientName[0].toUpperCase() + patient.patientName.slice(1)}</div>
              </div>
              <div className="w-1/6">{patient.gender[0].toUpperCase() + patient.gender.slice(1)}</div>
              <div className="w-1/6">{patient.age}</div>
              <div className="w-1/6 text-blue-500">{patient.contact}</div>
              <div className="w-1/6 hidden sm:block">{patient.email}</div>
             
              </div> <div className="w-1/6 flex justify-center space-x-2">

                <button
                  className="edit px-2 py-1 hover:bg-gray-300 rounded-full size-10 transition-all duration-300"
                  onClick={() => handleEdit(patient._id)}
                >
                  <i className="fa-regular fa-pen-to-square hover:text-blue-900 text-blue-400"></i>
                </button>
                <button
                  className="delete hover:bg-red-300 rounded-full size-10 transition-all duration-300 "
                  onClick={() => handleDelete(patient._id)}
                >
                  <i className="fa-solid fa-trash-can text-red-600 hover:text-red-900"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between pr-8 py-2 mt-2 absolute w-full bottom-0'>
          <div className='bg-red-500 text-white w-fit p-2 rounded-md'>Showing {indexOfFirstPatient + 1} to {Math.min(indexOfLastPatient, patients.length)} of {patients.length}</div>
          <div className='flex gap-2 bg-gray-200 rounded-md'>
            <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className='px-2 py-1 text-gray-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-md'>Previous</button>
            <button className='px-2 py-1 w-12 text-white bg-red-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:rounded-md'>{currentPage}</button>
            <button disabled={indexOfLastPatient >= patients.length} onClick={() => handlePageChange(currentPage + 1)} className='px-2 py-1 text-gray-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-md'>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
