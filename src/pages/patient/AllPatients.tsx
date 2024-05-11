import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import ConfirmationModal from "../../custom_components/ConfirmationModal"
import { LiaCopySolid } from 'react-icons/lia';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip"

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [displaySearch, setDisplaySearch] = useState(0)
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);


  // confirmation dialogue box
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://manipal-server.onrender.com/api/patient/all_patients');
        setPatients(response.data);
        console.log(response.data)
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  // search functionality 
  const searchPatient = () => {
  
    const trimmedSearchInput = searchInput.trim();

    const results = patients?.filter((patient) =>
      patient?.patientName === trimmedSearchInput ||
      patient?.patientName?.toLowerCase() === trimmedSearchInput.toLowerCase() ||
      patient?.contact === trimmedSearchInput ||
      patient?.email?.toLowerCase() === trimmedSearchInput?.toLowerCase() ||
      patient?.age === parseInt(trimmedSearchInput) || 
      patient?._id === trimmedSearchInput ||
      patient?.patientName.toLowerCase()?.includes(trimmedSearchInput?.toLowerCase()) ||
      
      patient?.email?.toLowerCase()?.includes(trimmedSearchInput?.toLowerCase()) ||
      patient?.age === parseInt(trimmedSearchInput) ||
      patient?._id?.includes(trimmedSearchInput)
    
    );

    if (results.length > 0) {
      setSearchResults(results);
      setShowDetails(true);
    } else {
      setSearchResults([]);
      setShowDetails(false);
      alert("Patient not found, make sure spelling is correct");
    }
  };

  const displaySearchResult = searchResults.filter((result, idx)=> idx=== displaySearch)

  const nextSearchResult = () => {
   
    if(displaySearch < searchResults.length -1){
      setDisplaySearch(displaySearch + 1)
    }else{
      setDisplaySearch(0)
    }
    }
 
  const prevSearchResult=()=>{
    if(displaySearch>0){
      setDisplaySearch(displaySearch - 1)
    }else{
      setDisplaySearch(searchResults.length-1)
    }
    }

    const handleCancelShowDetail=()=>{
      setShowDetails(false)
      setDisplaySearch(0)
      setSearchInput("")
    }


  // //Patient details on click 
  // const handleDetails = (patientId) => {
  //   const selectedPatient = patients.find((patient) => patient._id === patientId);
  //   if (selectedPatient) {
  //     setSearchResults([selectedPatient]);
  //     setShowDetails(true);
  //   } else {
  //     setSearchResults([]);
  //     setShowDetails(false);
  //     alert("Patient not found.");
  //   }
  // };

  // const displaySearchResult = searchResults.filter((result,idx)=> result._id=== displaySearch)

  const handleEdit = (patientId) => {
    console.log('Edit patient:', patientId);
  };

  // logics to delete patients
  const handleDelete = (patientId) => {
    setSelectedPatientId(patientId);
    setOpenConfirm(true);
  }
  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`https://manipal-server.onrender.com/api/patient/${selectedPatientId}`);
      setPatients(patients.filter((patient) => patient._id !== selectedPatientId));

      setSearchResults([]);
      setShowDetails(false);
    } catch (error) {
      console.error('Error deleting patient:', error);
    } finally {
      setOpenConfirm(false)
    }
  };




  const handleCancelDelete = () => {
    setOpenConfirm(false)
  }

  //pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const indexOfLastPatient = (currentPage * pageSize);
  const indexOfFirstPatient = indexOfLastPatient - pageSize;
  const currentPatients = patients.slice(0)?.reverse()?.slice(indexOfFirstPatient, indexOfLastPatient);



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

  const handleRefresh = () => {
    window.location.reload();
  };




  const handleUpdateActive = async (id) => {
    try {
      const patientToUpdate = patients.find(patient => patient._id === id);
      if (patientToUpdate) {
        const updateActiveStatus = { ...patientToUpdate, active: !patientToUpdate.active }
        const response = await axios.patch(`https://manipal-server.onrender.com/api/patient/${id}`, updateActiveStatus);
        setPatients(patients.map(patient => (patient._id === id ? updateActiveStatus : patient)));
      }
    }
    catch (error) {
      console.error('Error changing active status:', error);
    }
  }


  // enable user to copy patient id
  const handleCopyPatientId = (id) => {
    navigator.clipboard.writeText(id)
      .then(() => {
        alert("Patient ID copied to clipboard")

      })
      .catch(err => {
        console.error("Failed to copy id ", err)
      })
  }

  return (
    <div className="patient-list px-4 pl-8 py-2 ">
      <div className='  '><span>Patient &gt; </span>
        <span className='text-gray-400 text-sm'>All Patients</span>
      </div>

      <div className='h-[600px] mt-4  py-2 px-4 rounded-md bg-white relative'>
        <div className='flex justify-between  px-2 py-1 pr-10'>
          <div className='flex gap-5 items-center'>
            <div className=' font-bold text-xl'>Patient List</div>
            <div className="search relative">
              <input onKeyDown={(e) => {
                if (e.key === "Enter") searchPatient();
              }}
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput} type="search" placeholder='Search' className='rounded-lg h-10 w-72 bg-gray-100 px-2  pb-1 pr-7' />
              <i onClick={() => { searchPatient() }} className="fa-solid fa-magnifying-glass absolute right-3 bottom-3 text-gray-500 cursor-pointer"></i>
              {showDetails && (
                <div className=" bg-blue-100 opacity-95 p-4 mt-4 top-8 absolute left-48 size-[450px] z-10 rounded-md ">
                  {displaySearchResult?.map((patient) => {
                    return (
                      <div key={patient?._id} className='h-full relative'>
                        <div className='flex justify-between'>
                          <h2 className="text-xl font-semibold p-2">{patient?.patientName[0].toUpperCase() + patient?.patientName.slice(1)}</h2>
                          <div onClick={handleCancelShowDetail} className="cut"><i className="fa-solid fa-xmark  text-2xl text-red-600"></i></div>
                        </div>
                        <div className='center w-full '>
                          <div>
                            <div className='p-1 px-10 w-full center'>
                              <img src={patient?.image} alt="profile picture" className=' opacity-100 h-28 w-28 hover:scale-[1.01] hover: transition-all duration-300 rounded-full' />
                            </div>
                            <p className='mt-1 p-1 px-10 rounded-md animate w-80 bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white'>Gender: {patient?.gender}</p>
                            <p className='mt-1 p-1 px-10 rounded-md animate w-80 bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white'>Age: {patient?.age}</p>
                            <p className='mt-1 p-1 px-10 rounded-md animate w-80 bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white'>Contact: {patient?.contact}</p>
                            <p className='mt-1 p-1 px-10 rounded-md animate w-80 bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white'>Email: {patient?.email}</p>
                            <p className={`mt-1 p-1 px-10 rounded-md animate w-80 bg-blue-300 font-medium  hover:text-white ${patient?.active === false ? "hover:bg-red-400 " : "hover:bg-green-400 "}`}>Status: {patient?.active === false ? (<span>Inactive</span>) : (<span>Active</span>)}</p>
                          </div>
                        </div>
                        <div className='absolute bottom-0 mt-5 w-full  flex justify-between'>
                        <div className='flex gap-4 ml-2 '>
                          <i className="fa-regular fa-pen-to-square edit hover:text-blue-900 text-blue-400"></i>
                          <i onClick={() => handleDelete(patient?._id)} className="fa-solid fa-trash-can text-red-600 delete hover:text-red-900"></i>
                        </div>
                        <div className='text-sm flex gap-2'>
                         Showing {displaySearch + 1}th of {searchResults.length} found
                         <button onClick={prevSearchResult} className='size-5 rounded bg-blue-200 hover:bg-blue-300 '><i className="fa-solid fa-chevron-left"></i></button>
                         <span  className='size-5 rounded bg-blue-200 hover:bg-blue-300 center'>{displaySearch + 1}</span>
                         <button onClick={nextSearchResult} className='size-5 rounded bg-blue-200 hover:bg-blue-300 '><i className="fa-solid fa-chevron-right"></i></button>
                        </div>
                        </div>
                     
                      </div>
                    )
                  })}


                </div>
              )}
            </div>
            <div className='bg-gray-100 hover:bg-gray-200 animate text-gray-800 center size-8 rounded-full cursor-pointer'><Link to="/home/prescription"><i className="fa-solid fa-plus"></i></Link></div>
            <div onClick={handleRefresh} className="bg-gray-100 hover:bg-gray-200 animate text-gray-800 center size-8 rounded-full cursor-pointer"><i className="fa-solid fa-rotate"></i></div>
          </div>
          <div onClick={downloadExcel} className='text-green-600 cursor-pointer '>Download Excel  <i className="fa-regular fa-file-excel text-2xl text-green-500"></i></div>
        </div>
        <div className='mt-5'>
          <div className="patient-header flex border-b border-gray-200 justify-between items-center px-2 py-2 font-medium">
            <div className="w-[30%]">Patient Name <i className={`fa-solid fa-arrow-up text-xs text-gray-300 `}></i> <i className={`fa-solid fa-arrow-down  text-xs text-gray-300`}></i></div>
            <div className="w-[12%]">Gender <i className={`fa-solid fa-arrow-up text-xs text-gray-300 `}></i> <i className={`fa-solid fa-arrow-down  text-xs text-gray-300`}></i></div>
            <div className="w-[12%]">Age <i className={`fa-solid fa-arrow-up text-xs text-gray-300 `}></i> <i className={`fa-solid fa-arrow-down  text-xs text-gray-300`}></i></div>
            <div className="w-1/6 ">Contact</div>
            <div className="w-[27%] hidden sm:block">Email</div>
            <div className="w-[12%] hidden sm:block">Status</div>
            <div className="w-1/6 text-center">Actions</div>
          </div>
          <div className='pt-5'>
            {currentPatients?.map((patient) => (
              <div key={patient?._id} className=" font-medium patient-row flex border-b border-gray-100  justify-between items-center px-2 py-2 hover:scale-[1.001] hover:bg-gray-100 animate cursor-pointer rounded-md">
                <div  className=' w-[86%] flex justify-between items-center'>
                  <div className='w-[30%] flex gap-1 items-center '>
                    <img src={patient?.image} alt="" className='bg-sky-400 min-w-8 size-8 rounded-full ' />

                    <div className='w-full flex  justify-between ml-4'>
                      <div className=" ">{patient?.patientName?.[0]?.toUpperCase() + patient?.patientName?.slice(1)}</div>
                    
                    </div>

                  </div>
                  <div className="w-[12%]">{patient?.gender?.[0]?.toUpperCase() + patient?.gender?.slice(1)}</div>
                  <div className="w-[12%]">{patient?.age}</div>
                  <div className="w-1/6">{patient?.contact}</div>
                  <div className="w-[27%]  hidden sm:block">{patient?.email}</div>
                  <div className="w-[12%] hidden sm:block">{patient?.active === false ? (<span>Inactive</span>) : (<span>Active</span>)}</div>

                </div> <div className="w-[13%] flex justify-center items-center space-x-2">

                  {/* <button
                    className="edit px-2 py-1 hover:bg-gray-300 rounded-full min-w-8 size-8 animate"
                    onClick={() => handleEdit(patient?._id)}
                  >
                    <i className="fa-regular fa-pen-to-square hover:text-blue-900 text-blue-400"></i>
                  </button> */}
                  <div className='px-2 py-1 hover:bg-gray-300 rounded-full min-w-8 size-8 animate flex items-center'>
                  <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className='pr-8' onClick={() => { handleCopyPatientId(patient._id) }}> <LiaCopySolid className="text-blue-500 hover:text-blue-900" /></span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className='size-full px-2 py-1 bg-gray-200 center rounded-md text-sm font-normal'>Copy Patient ID</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                  </div>


                  <button
                    className="delete px-2 py-1 hover:bg-red-300 rounded-full min-w-8 size-8 animate "
                    onClick={() => handleDelete(patient?._id)}
                  >
                    <i className="fa-solid fa-trash-can text-red-600 hover:text-red-900"></i>
                  </button>
                  <button onClick={() => { handleUpdateActive(patient?._id) }} className=' rounded  text-sm font-n h-7 min-w-20 text-gray-100 '> {patient.active === false ? (<div className='bg-green-400 center size-full rounded hover:bg-green-500 '>Activate</div>) : (<div className='bg-red-400 center size-full rounded hover:bg-red-500'>Deactivate</div>)}</button>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-between pr-6 py-2 mt-2 absolute w-full bottom-1'>
            <div className='w-fit p-2 rounded-md'>Showing {indexOfFirstPatient + 1} to {Math.min(indexOfLastPatient, patients.length)} of {patients.length}</div>
            <div className='flex gap-2 bg-gray-200 rounded-md'>
              <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className='px-2 py-1 text-gray-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md'>Previous</button>
              <button className='px-2 py-1 w-12 text-white bg-blue-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:rounded-md'>{currentPage}</button>
              <button disabled={indexOfLastPatient >= patients.length} onClick={() => handlePageChange(currentPage + 1)} className='px-2 py-1 text-gray-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md'>Next</button>
            </div>
          </div>
        </div>
        <ConfirmationModal
          isOpen={openConfirm}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default AllPatients;
