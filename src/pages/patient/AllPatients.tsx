import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import ConfirmationModal from "../../custom_components/ConfirmationModal"
import { LiaCopySolid } from 'react-icons/lia';
import { useGetAllPatientsQuery, useDeletePatientMutation, useUpdateActiveStatusMutation } from '../../API/API';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useNavigate } from 'react-router-dom';
import AlertWrapper from '../../custom_components/AlertWrapper';
import JobDoneAlert from "../../custom_components/JobDoneAlert"
import { motion } from "framer-motion"
import { Player } from '@lottiefiles/react-lottie-player';
import LoadingAnimation from "../../assets/animations/HospitalAnimation.json"
import NotFoundAnimation from '../../assets/animations/EmptStretcherAnimation.json';
import ErrorAnimation from "../../assets/animations/ErrorCatAnimation.json"

const AllPatients = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [displaySearch, setDisplaySearch] = useState(0)
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const navigate = useNavigate();
  const [goToPageNumber, setGoToPageNumber] = useState()
  const [patientsToRender, setPatientsToRender] = useState([])
  // confirmation dialogue box
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null)

  // jodDone alert message 
  const [jobDoneMessage, setJobDoneMessage] = useState("")
  const [openJobDoneAlert, setOpenJobDoneAlert] = useState(false)

  const [openIdCopiedAlert, setOpenIdCopiedAlert] = useState(false)
  const [idCopied, setIdCopied] = useState("")
  //date range
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [notFound, setNotFound] = useState(false)

  const [showTodayPatients, setShowTodayPatients] = useState(false);


  const handleCancelAlert = () => {
    setOpenJobDoneAlert(false)
  }

  //from API.tsx
  const { data: patients = [], error, isLoading, refetch } = useGetAllPatientsQuery("");

  const [deletePatient] = useDeletePatientMutation();
  const [updateActiveStatus] = useUpdateActiveStatusMutation()


  useEffect(() => {
    refetch()
  }, [patients])


  const indexOfLastPatient = (currentPage * pageSize);
  const indexOfFirstPatient = indexOfLastPatient - pageSize;
  const currentPatients = patients.slice(0)?.reverse()?.slice(indexOfFirstPatient, indexOfLastPatient);

  const handleShowAllPatients = () => {
    setPatientsToRender(currentPatients)
    setSearchInput("")
    setStartDate("")
    setEndDate("")
    setShowTodayPatients(false)
    setCurrentPage(1)
    setGoToPageNumber(0)
    setSearchResults([])
  }

  //filters
  useEffect(() => {
    const filterPatientsByDateRange = () => {
      if (!startDate || !endDate) {
        return currentPatients; // Return all payments if no date range is specified
      }

      return patients.filter(patient => {
        const registeredOnDate = new Date(patient?.createdAt);
        return registeredOnDate >= new Date(startDate) && registeredOnDate <= new Date(endDate);
      });
    };

    const filterPatientsForToday = () => {
      const today = new Date();
      const filteredTodayPatients = patients.filter(patient => {
        const registeredOnDate = new Date(patient?.createdAt);
        // Check if registration date is today's date
        console.log("aaaj ka h", registeredOnDate.toDateString(), " ", today.toDateString())
        return registeredOnDate.toDateString() === today.toDateString();
      });
      return filteredTodayPatients;
    };

    const filteredPatients = filterPatientsByDateRange();

    if (searchInput && searchResults.length >= 1) {
      setPatientsToRender(searchResults);
      setShowTodayPatients(false)
      setNotFound(false);
      setStartDate("")
      setEndDate("")

    }
    else if (showTodayPatients) {
      const todayPatients = filterPatientsForToday();
      if (todayPatients.length >= 1) {
        setPatientsToRender(todayPatients);
        setNotFound(false);
        setSearchInput("")
        setStartDate("")
        setEndDate("")

      } else {
        setPatientsToRender([]);
        setNotFound(true);
      }
    } else {
      if (filteredPatients?.length >= 1) {
        setPatientsToRender(filteredPatients);
        setNotFound(false);
        setShowTodayPatients(false)
        // setSearchInput("")


      } else {
        setPatientsToRender([]);
        setNotFound(true);
        console.log("no patient")
      }
    }
  }, [startDate, endDate, currentPatients, searchInput, searchResults]);

  // search functionality 
  const searchPatient = (inputValue) => {
    const trimmedSearchInput = inputValue.trim().toLowerCase();
    if (trimmedSearchInput === "") {
      // Reset search results and hide details
      setSearchResults([]);
      setShowDetails(false);
      setOpenJobDoneAlert(false);
      return;
    }

    const results = patients?.filter((patient) => {
      const patientName = patient?.patientName?.toLowerCase();
      const patientEmail = patient?.email?.toLowerCase();
      const patientComplaint = patient?.complaint?.toLowerCase();
      const patientContact = String(patient?.contact);
      const patientAge = String(patient?.age);
      const patientGender = patient?.gender?.toLowerCase();

      return [
        patientName === trimmedSearchInput,
        patientName?.includes(trimmedSearchInput),
        patientEmail === trimmedSearchInput,
        patientEmail?.includes(trimmedSearchInput),
        patientContact === trimmedSearchInput,
        patientAge === trimmedSearchInput,
        patientComplaint === trimmedSearchInput,
        patientComplaint?.includes(trimmedSearchInput),
        patientGender?.includes(trimmedSearchInput)
      ].some(Boolean);
    });

    if (results.length > 0) {
      setSearchResults(results);
      setJobDoneMessage("");
      setOpenJobDoneAlert(false);
    } else {
      setSearchResults([]);
      setShowDetails(false);
      setJobDoneMessage(" No Patient found !!");
    }
  };


  const displaySearchResult = searchResults.filter((result, idx) => idx === displaySearch)
  const nextSearchResult = () => {

    if (displaySearch < searchResults.length - 1) {
      setDisplaySearch(displaySearch + 1)
    } else {
      setDisplaySearch(0)
    }
  }

  const prevSearchResult = () => {
    if (displaySearch > 0) {
      setDisplaySearch(displaySearch - 1)
    } else {
      setDisplaySearch(searchResults.length - 1)
    }
  }

  const handleCancelShowDetail = () => {
    setShowDetails(false)
    setDisplaySearch(0)
    setJobDoneMessage("")
  }

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value; // Get the current input value
    setSearchInput(inputValue); // Update the search input state
    searchPatient(inputValue);
  }

  // Function to handle search action
  const handleSearch = () => {
    searchPatient(searchInput); // Call searchPatient function with current search input value
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter" && searchInput !== "" && searchResults.length > 0) {
      handleSearch()
      setShowDetails(true);
    }
    else if (e.key === "Enter" && !searchResults?.length) {
      setShowDetails(false);
      setOpenJobDoneAlert(true)
      setJobDoneMessage("Enter Some Input !")

      // removing result not found alert automatically
      setTimeout(() => {
        setOpenJobDoneAlert(false)
      }, 3000);
    }
  }

  const handleSeachIconClick = () => {
    if (searchInput !== "" && searchResults?.length > 0) {
      handleSearch();
      setShowDetails(true);
    }
    else if (!searchResults?.length) {
      setShowDetails(false);
      setOpenJobDoneAlert(true)
      setJobDoneMessage("Enter Some Input !")

      // removing result not found alert automatically
      setTimeout(() => {
        setOpenJobDoneAlert(false)
      }, 3000);

    }
  }

  // const handleEdit = (patientId) => {
  //   console.log('Edit patient:', patientId);
  // };

  // logics to delete patients
  const handleDelete = (patientId) => {
    setSelectedPatientId(patientId);
    setOpenConfirm(true);
  }
  const handleConfirmDelete = async () => {
    try {
      await deletePatient(selectedPatientId).unwrap();
      refetch();
      setSearchResults([]);
      setShowDetails(false);
      console.log("patient deleted, id:" + selectedPatientId)
    } catch (error) {
      console.error('Error deleting patient:', error);
    } finally {
      setOpenConfirm(false)
      setSelectedPatientId(null);
    }
  };


  const handleCancelDelete = () => {
    setOpenConfirm(false)
    console.log("no clicked")
  }

  //pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


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


  const handleShowDetail = (id) => {
    navigate(`/home/patient_details/${id}`)
  }

  const handleUpdateActive = async (id) => {
    try {
      const patientToUpdate = patients.find(patient => patient._id === id);
      if (patientToUpdate) {
        const updatedStatus = { ...patientToUpdate, active: !patientToUpdate.active }
        const result = await updateActiveStatus({ id, ...updatedStatus }).unwrap()
        refetch()
        console.log("activeSttaus", updatedStatus)
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
        setOpenIdCopiedAlert(true)
        setIdCopied("ID Copied.")

        setTimeout(() => {
          setOpenIdCopiedAlert(false)
        }, 300);

      })
      .catch(err => {
        setOpenIdCopiedAlert(true)
        setIdCopied("Error, no ID")

        setTimeout(() => {
          setOpenIdCopiedAlert(false)
        }, 300);

      })
  }
  const handleGoToPageNumber =()=>{
    if(goToPageNumber && goToPageNumber> 0 &&  goToPageNumber < ((patients?.length + pageSize)/pageSize)){
      setCurrentPage(goToPageNumber)
    }else{
      console.log(goToPageNumber ," page number does not exist for this data");

    }
  }

  const handleGoToPageOnPessingENTERkey = (e)=>{
    if (e.key === "Enter"){
      handleGoToPageNumber()
    }
  }
  // const patientsToRender = searchResults.length > 0 && searchInput !== "" ? searchResults : currentPatients;
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
              <input onKeyDown={handleEnterKey}
                onChange={handleSearchInputChange}
                value={searchInput} type="search" placeholder='Search by Name' className='rounded-lg h-10 w-72 bg-gray-100 px-2  pb-1 pr-7' />
              <i onClick={handleSeachIconClick} className="fa-solid fa-magnifying-glass absolute right-3 bottom-3 text-gray-500 cursor-pointer"></i>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                  drag
                  dragConstraints={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }}
                  dragElastic={0.5}
                  className=" bg-blue-100 opacity-95 p-4 mt-4 top-8 absolute left-48 min-h-[450px] w-[450px] z-10 rounded-md ">
                  {displaySearchResult?.map((patient) => {
                    return (
                      <div key={patient?._id} className='min-h-[450px]  relative pb-12 '>
                        <div className='flex justify-between'>
                          <h2 className="text-xl font-semibold p-2">{patient?.patientName[0].toUpperCase() + patient?.patientName.slice(1)}</h2>
                          <div onClick={handleCancelShowDetail} className="cut"><i className="fa-solid fa-xmark  text-2xl text-red-600"></i></div>
                        </div>
                        <div className='center w-full '>
                          <div>
                            <div className='p-1 px-10 w-full center'>
                              <img src={patient?.image} alt="profile picture" className=' h-32 w-32 hover:scale-[1.01] hover: transition-all duration-300 rounded' />
                            </div>
                            <p className='mt-1 p-1 px-10 rounded-md animate w-96 bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white flex gap-8'><div className='w-14'>Gender:</div> <div>{patient?.gender[0]?.toUpperCase() + patient?.gender?.slice(1)?.toLowerCase()}</div></p>
                            <p className='mt-1 p-1 px-10 rounded-md animate w-96 bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white flex gap-8'><div className='w-14'>Age:</div> <div>{patient?.age}</div></p>
                            <p className='mt-1 p-1 px-10 rounded-md animate w-96 bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white flex gap-8'><div className='w-14'>Contact: </div><div> {patient?.contact}</div></p>
                            <p className='mt-1 p-1 px-10 rounded-md animate w-96 bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white flex gap-8'><div className='w-14'>Problem:</div> <div>{patient?.complaint}</div></p>
                            <p className={`mt-1 p-1 px-10 rounded-md animate w-96 bg-blue-300 font-medium  hover:text-white flex gap-8 ${patient?.active === false ? "hover:bg-red-400 " : "hover:bg-green-400 "}`}> <div className='w-14'>Status:</div> <div>{patient?.active === false ? (<span>Inactive</span>) : (<span>Active</span>)}</div></p>
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
                            <span className='size-5 rounded bg-blue-200 hover:bg-blue-300 center'>{displaySearch + 1}</span>
                            <button onClick={nextSearchResult} className='size-5 rounded bg-blue-200 hover:bg-blue-300 '><i className="fa-solid fa-chevron-right"></i></button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </motion.div>
              )}
            </div>
            <Link to="/home/prescription"><div className='bg-gray-100 hover:bg-gray-200 animate text-gray-800 center size-8 rounded-full cursor-pointer'><i className="fa-solid fa-plus"></i></div></Link>
            <div onClick={handleRefresh} className="bg-gray-100 hover:bg-gray-200 animate text-gray-800 center size-8 rounded-full cursor-pointer"><i className="fa-solid fa-rotate"></i></div>
            <div onClick={handleShowAllPatients} className='bg-gray-100 hover:bg-gray-200 animate text-gray-800 center size-8 rounded-full cursor-pointer font-medium'>ALL</div>
            <div className="">
              <input type="date" value={startDate} max={new Date().toISOString().split('T')[0]} onChange={(e) => setStartDate(e.target.value)} className='ml-5 px-5' />
              <input type="date" value={endDate} max={new Date().toISOString().split('T')[0]} onChange={(e) => setEndDate(e.target.value)} className='ml-5 px-5' />
            </div>
            <div onClick={() => setShowTodayPatients(true)} className='bg-gray-100 hover:bg-gray-200 animate text-gray-800 center size-auto px-1 font-medium rounded-md cursor-pointer'>Today</div>

          </div>
          <div onClick={downloadExcel} className='text-green-600 cursor-pointer '>Download Excel  <i className="fa-regular fa-file-excel text-2xl text-green-500"></i></div>
        </div>
        <div className='mt-5'>
          <div className="patient-header flex border-b border-gray-200 justify-between items-center px-2 py-2 font-medium">
            <div className="w-[30%]">Patient Name <i className={`fa-solid fa-arrow-up text-xs text-gray-300 `}></i> <i className={`fa-solid fa-arrow-down  text-xs text-gray-300`}></i></div>
            <div className="w-[12%]">Gender <i className={`fa-solid fa-arrow-up text-xs text-gray-300 `}></i> <i className={`fa-solid fa-arrow-down  text-xs text-gray-300`}></i></div>
            <div className="w-[12%]">Age <i className={`fa-solid fa-arrow-up text-xs text-gray-300 `}></i> <i className={`fa-solid fa-arrow-down  text-xs text-gray-300`}></i></div>
            <div className="w-1/6 ">Contact</div>
            <div className="w-[27%] hidden sm:block">Problem</div>
            <div className="w-[12%] hidden sm:block">Status</div>
            <div className="w-1/6 text-center">Actions</div>
          </div>
          <div className='pt-5 h-[430px] overflow-y-auto overflow-x-hidden'>
  {isLoading ? (
    <div className="center flex-col gap-24 h-3/4 w-[90%]">
      <div>Loading patients...</div>
      <div>
        <Player
          autoplay
          loop
          src={LoadingAnimation} // Replace with actual LoadingAnimation source
          style={{ height: '200px', width: '200px' }}
        />
      </div>
    </div>
  ) : error ? (
    <div className="center flex-col gap-24 h-3/4 w-[90%]">
      <div className='text-red'>Error</div>
      <div className='flex flex-col gap-8 justify-center items-center ml-6'>
        <div>
          <Player
            autoplay
            loop
            src={ErrorAnimation} // Replace with actual ErrorAnimation source
            style={{ height: '200px', width: '200px' }}
          />
        </div>
        <div className="retry">
          <button onClick={refetch} className='text-xl bg-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded'>Retry</button>
        </div>
      </div>
    </div>
  ) : (
    <>
      {patientsToRender?.length > 0 ? (
        patientsToRender.map((patient, index) => (
          <motion.div key={patient?._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * index }} className="font-medium patient-row flex border-b border-gray-100 justify-between items-center px-2 py-2 hover:scale-[1.001] hover:bg-gray-100 animate cursor-pointer rounded-md">
            <div className='w-[86%] flex justify-between items-center' onClick={() => handleShowDetail(patient?._id)}>
              <div className='w-[30%] flex gap-1 items-center'>
                <img src={patient?.image} alt="" className='bg-sky-400 min-w-8 size-8 rounded-full' />
                <div className='w-full flex justify-between ml-4'>
                  <div>{patient?.patientName?.[0]?.toUpperCase() + patient?.patientName?.slice(1)}</div>
                </div>
              </div>
              <div className="w-[12%]">{patient?.gender?.[0]?.toUpperCase() + patient?.gender?.slice(1)}</div>
              <div className="w-[12%]">{patient?.age}</div>
              <div className="w-1/6">{patient?.contact}</div>
              <div className="w-[27%] hidden sm:block">{patient?.complaint}</div>
              <div className="w-[12%] hidden sm:block">{patient?.active === false ? (<span>Inactive</span>) : (<span>Active</span>)}</div>
            </div>
            <div className="w-[13%] flex justify-center items-center space-x-2">
              <div className='center'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div onClick={() => { handleCopyPatientId(patient._id) }} className='px-2 py-1 hover:bg-gray-300 rounded-full min-w-8 size-8 animate flex items-center'>
                        <span><LiaCopySolid className="text-blue-500 hover:text-blue-900" /></span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className='size-full px-2 py-1 bg-gray-200 center rounded-md text-sm font-normal'>Copy Patient ID</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <button className="delete px-2 py-1 hover:bg-red-300 rounded-full min-w-8 size-8 animate" onClick={() => handleDelete(patient?._id)}>
                <i className="fa-solid fa-trash-can text-red-600 hover:text-red-900"></i>
              </button>
              <button onClick={() => { handleUpdateActive(patient?._id) }} className='rounded text-sm font-n h-7 min-w-20 text-gray-100'>
                {patient.active === false ? (<div className='bg-green-400 center size-full rounded hover:bg-green-500'>Activate</div>) : (<div className='bg-red-400 center size-full rounded hover:bg-red-500'>Deactivate</div>)}
              </button>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}

      {(!patientsToRender?.length || notFound) && (
        <div className="center flex-col gap-24 h-3/4 w-[90%]">
          <div>No patients found.</div>
          <div>
            <Player
              autoplay
              loop
              src={NotFoundAnimation} // Replace with actual NotFoundAnimation source
              style={{ height: '200px', width: '200px' }}
            />
          </div>
        </div>
      )}
    </>
  )}
</div>

          <div className='flex justify-between pr-6 py-2 mt-2 absolute w-full bottom-1'>
          {(searchResults?.length >=1 || (startDate && endDate) ||showTodayPatients ) ? (
             <div className='w-fit p-2 rounded-md'>Showing {patientsToRender?.length}</div>
          ) : (
          <div className='w-fit p-2 rounded-md'>Showing {indexOfFirstPatient + 1} to {Math.min(indexOfLastPatient, patients?.length)} of {patients?.length}</div>
        )}            {(searchResults?.length >= 1 || (startDate && endDate) || showTodayPatients) ? ("") : (
              <div className='flex gap-12 items-center'>
                <div className='flex gap-6 items-center'>
                  <input type="number"
                    placeholder='Go to'
                    value={goToPageNumber}
                    onKeyDown={handleGoToPageOnPessingENTERkey}
                    onChange={(e) => setGoToPageNumber(e.target.value)}
                    className='border-2 border-black rounded-md w-20 focus:outline-none hover:border-blue-500 focus:border-blue-500 px-2 py-1'
                  />
                  <button onClick={handleGoToPageNumber} className='px-2 py-2 w-12 bg-gray-300 hover:bg-black hover:text-white rounded-md'>Go</button>

                </div>
                <div className='flex gap-2 rounded-md bg-gray-200'>
                  <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className='px-2 py-2 text-gray-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md'>Previous</button>
                  <button className='px-2 py-2 w-12 text-white bg-blue-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:rounded-md'>{currentPage}</button>
                  <button disabled={(indexOfLastPatient >= patients?.length) || (searchResults?.length >= 1 || (startDate && endDate) || showTodayPatients)} onClick={() => handlePageChange(currentPage + 1)} className='px-2 py-2 text-gray-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md'>Next</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <ConfirmationModal
            isOpen={openConfirm}
            question="Are you sure you want to delete this patient?"
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        </div>
        <div>
          <AlertWrapper isOpen={openJobDoneAlert}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={openJobDoneAlert ? { opacity: 1, y: 0 } : {}}
            >
              <JobDoneAlert
                height="h-40"
                width="w-52"
                textColor="text-white"
                bgColor="bg-gradient-to-r from-rose-400 to-red-500"
                boxShadow=" shadow-[0px_0px_42px_2px_#c53030] "
                message={jobDoneMessage}
                isOpen={openJobDoneAlert}
                OnCancel={handleCancelAlert}
                isCancelButton="block"
                icon={<i className="fa-regular fa-face-frown-open fa-bounce text-white pt-4"></i>}
              />
            </motion.div>
          </AlertWrapper>
        </div>
        <div>
          <AlertWrapper isOpen={openIdCopiedAlert}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={openIdCopiedAlert ? { opacity: 1, y: 0 } : {}}
            >
              <JobDoneAlert
                height="h-12"
                width="w-24"
                textColor="text-black"
                bgColor="bg-gray-300"
                boxShadow={null}
                message={idCopied}
                isOpen={openIdCopiedAlert}
                OnCancel={null}
                isCancelButton="hidden"
                icon={null}
              />
            </motion.div>
          </AlertWrapper>
        </div>
      </div>
    </div>
  );
};

export default AllPatients;
