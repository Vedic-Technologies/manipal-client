import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import ConfirmationModal from "../../custom_components/ConfirmationModal"
import { LiaCopySolid } from 'react-icons/lia';
import formatDate from '../../util/TimeFormate'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"
import AlertWrapper from '../../custom_components/AlertWrapper';
import JobDoneAlert from "../../custom_components/JobDoneAlert"
import { motion } from "framer-motion"
import { useGetAllPaymentsQuery } from '../../API/API';
import { useDeletePaymentMutation } from '../../API/API';
import { Player } from '@lottiefiles/react-lottie-player';
import LoadingAnimation from "../../assets/animations/HospitalAnimation.json"
import NotFoundAnimation from '../../assets/animations/EmptStretcherAnimation.json';
import ErrorAnimation from "../../assets/animations/ErrorCatAnimation.json"
import { useNavigate } from 'react-router-dom';

const PatientPaymentsDetails = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [displaySearch, setDisplaySearch] = useState(0)
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [paymentsToRender, setPaymentsToRender] = useState([])
  const [loggedInUserType, setloggedInUserType] = useState({})
  const navigate = useNavigate();
  const [goToPageNumber, setGoToPageNumber] = useState()
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

  const [showTodayPayments, setShowTodayPayments] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all")
  //from API
  const { data: payments = [], error, isLoading, refetch } = useGetAllPaymentsQuery("")
  const [deletePayment] = useDeletePaymentMutation()
  useEffect(() => {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUserData = JSON.parse(currentUserString);
      setloggedInUserType(currentUserData.user.userType); // Access userType from nested user object
    }
  }, []);

  const indexOfLastPatient = (currentPage * pageSize);
  const indexOfFirstPatient = indexOfLastPatient - pageSize;
  const currentPatients = payments?.slice(0)?.reverse()?.slice(indexOfFirstPatient, indexOfLastPatient);

  const handleShowAllPayments = () => {
    setPaymentsToRender(currentPatients)
    setSearchInput("")
    setStartDate("")
    setEndDate("")
    setShowTodayPayments(false)
    setCurrentPage(1)
    setGoToPageNumber(0)
    setSearchResults([])
    setActiveFilter("all")
  }


  const handleCancelAlert = () => {
    setOpenJobDoneAlert(false)
  }
  useEffect(() => {
    refetch()
    // console.log("refetching hi")
  }, [payments])

  // search functionality 
  const searchPayment = (inputValue) => {
    const trimmedSearchInput = inputValue.trim();
    if (!trimmedSearchInput) {
      // Reset search results and hide details
      setSearchResults([]);
      setShowDetails(false);
      setOpenJobDoneAlert(false);
      setPaymentsToRender(currentPatients);
      return;
    }

    const searchLower = trimmedSearchInput.toLowerCase();
    const searchInt = parseInt(trimmedSearchInput);

    const results = payments?.filter((item) => {
      const patient = item?.patient || {};
      return (
        patient.name?.toLowerCase() === searchLower ||
        patient.name?.toLowerCase().includes(searchLower) ||
        patient.contact === trimmedSearchInput ||
        patient.contact === searchInt ||
        patient.email?.toLowerCase() === searchLower ||
        patient.email?.toLowerCase().includes(searchLower) ||
        patient.age === searchInt ||
        item._id === trimmedSearchInput ||
        item._id?.includes(trimmedSearchInput) ||
        item.paymentType?.toLowerCase() === searchLower ||
        item.paymentType?.toLowerCase().includes(searchLower) ||
        item.amount == searchInt ||
        formatDate(item.paymentDate).includes(trimmedSearchInput)
      );
    });

    if (results.length > 0) {
      setSearchResults(results);
      setOpenJobDoneAlert(false);
      setPaymentsToRender(results);
      setJobDoneMessage("")
    } else {
      setSearchResults([]);
      setShowDetails(false);
      setJobDoneMessage("Not Payment Found !!");
      setOpenJobDoneAlert(true);
      // removing result not found alert automatically
      setTimeout(() => {
        setOpenJobDoneAlert(false);
      }, 3000);
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
    setSearchInput("")
    setJobDoneMessage("")
  }


  // const handleEdit = (patientId) => {
  //   console.log('Edit patient:', patientId);
  // };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue); // Update the search input state
    searchPayment(inputValue);
    setStartDate("")
    setEndDate("")
    setShowTodayPayments(false)
  }
  // Function to handle search action
  const handleSearch = () => {
    searchPayment(searchInput); // Call searchPatient function with current search input value
  };
  const handleEnterKey = (e) => {
    if (e.key === "Enter" && searchInput !== "" && searchResults.length >= 1) {
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
    if (searchInput !== "" && searchResults.length >= 1) {
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

  const handleShowDetail = (id) => {
    navigate(`/home/patient_details/${id}`)
  }

  // logics to delete patients
  const handleDelete = (patientId) => {
    setSelectedPatientId(patientId);
    setOpenConfirm(true);
  }
  const handleConfirmDelete = async () => {
    try {
      // const response = await axios.delete(`https://manipal-server.onrender.com/api/payment/${selectedPatientId}`);
      // setPayments(payments.filter((item) => item?.patient?._id !== selectedPatientId));
      setOpenConfirm(false)
      await deletePayment(selectedPatientId).unwrap()
      refetch()
      setSearchResults([]);
      setShowDetails(false);
      console.log("patinet deleted")
    } catch (error) {
      console.error('Error deleting patient:', error);
    } finally {
      // setOpenConfirm(false)
      setSelectedPatientId(null);
    }
  };

  const handleCancelDelete = () => {
    setSelectedPatientId(null);
    setOpenConfirm(false)
  }

  //pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGoToPageNumber = () => {
    if (goToPageNumber && goToPageNumber > 0 && goToPageNumber < ((payments?.length + 8) / 8)) {
      setCurrentPage(goToPageNumber)
    } else {
      console.log(goToPageNumber, " page number does not exist for this data");

    }
  }

  const handleGoToPageOnPessingENTERkey = (e) => {
    if (e.key === "Enter") {
      handleGoToPageNumber()
    }
  }

  //filters
  useEffect(() => {
    const filterPaymentsByDateRange = () => {
      if (!startDate || !endDate) {
        return currentPatients; // Return all payments if no date range is specified
      }

      return payments.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
      });
    };

    const filterPaymentsForToday = () => {
      const today = new Date();
      const filteredTodayPayments = payments.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        // Check if payment date is today's date
        // console.log("avika h", paymentDate.toDateString(), " ",today.toDateString() )
        return paymentDate.toDateString() === today.toDateString();
      });
      return filteredTodayPayments;
    };

    const filteredPayments = filterPaymentsByDateRange();

    if (searchInput && searchResults.length >= 1) {
      setPaymentsToRender(searchResults);
      setShowTodayPayments(false)
      setNotFound(false);
      setStartDate("")
      setEndDate("")

    }
    else if (showTodayPayments) {
      const todayPayments = filterPaymentsForToday();
      if (todayPayments.length >= 1) {
        setPaymentsToRender(todayPayments);
        setNotFound(false);
        setSearchInput("")
        setStartDate("")
        setEndDate("")

      } else {
        setPaymentsToRender([]);
        setNotFound(true);
        setStartDate("")
        setEndDate("")
      }
    } else {
      if (filteredPayments?.length >= 1) {
        setPaymentsToRender(filteredPayments);
        setNotFound(false);
        setShowTodayPayments(false)
        // setSearchInput("") 

      } else {
        setPaymentsToRender([]);
        setNotFound(true);
        console.log("no payments")
        // setShowTodayPayments(false)
      }
    }
  }, [startDate, endDate, currentPatients, searchInput, searchResults]);


  // {(searchResults?.length >=1 || (startDate && endDate) ||showTodayPayments )
  useEffect(() => {
    if (paymentsToRender === currentPatients) {
      setActiveFilter("all");
    } else if (searchResults?.length >= 1) {
      setActiveFilter("");
    } else if (startDate && endDate) {
      setActiveFilter("dates");
    } else if (showTodayPayments) {
      setActiveFilter("today");
    } else {
      setActiveFilter("all");
    }
  }, [paymentsToRender, currentPatients, searchResults, startDate, endDate, showTodayPayments]);

  const handleShowTodaysPayments = () => {
    setShowTodayPayments(true)
    setActiveFilter("today")
  }

  const downloadExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(payments);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };





  const handleRefresh = () => {
    window.location.reload();
  };

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
  // const paymentsToRender = searchResults.length > 0 && searchInput !== "" ? searchResults : currentPatients;


  return (
    <div className="patient-list px-4 pl-8 py-2 ">
      <div className='  '><span>Payments &gt; </span>
        <span className='text-gray-400 text-sm'>Payment Detail</span>
      </div>

      <div className='h-[600px] mt-4  py-2 px-4 rounded-md bg-white relative'>
        <div className='flex justify-between  px-2 py-1 pr-10'>
          <div className='flex gap-5 items-center'>
            <div className=' font-bold text-xl'>Payment Detail</div>
            <div className="search relative">
              <input onKeyDown={handleEnterKey}
                onChange={handleSearchInputChange}
                value={searchInput} type="search" placeholder='Search' className='rounded-lg h-10 w-72 bg-gray-100 px-2  pb-1 pr-7' />
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
                  className=" bg-blue-100 opacity-95 p-4 mt-4 top-8 absolute left-48 w-[450px] min-h-[500px] z-10 rounded-md ">
                  {displaySearchResult?.map((item) => {
                    return (
                      <div key={item?.patient?._id} className='min-h-[500px] relative pb-12'>

                        <div className='flex justify-between'>
                          <h2 className="text-xl font-semibold p-2">{item?.patient?.name[0]?.toUpperCase() + item?.patient?.name?.slice(1)}</h2>
                          <div onClick={handleCancelShowDetail} className="cut"><i className="fa-solid fa-xmark  text-2xl text-red-600"></i></div>
                        </div>
                        <div className='center w-full '>
                          <div>
                            <div className='p-1 px-10 w-full center'>
                              <img src={item?.patient?.image} alt="profile picture" className='  h-32 w-32  hover:scale-[1.01] hover: transition-all duration-300 rounded' />
                            </div>
                            <p className='mt-1 p-1 px-10 rounded-md w-80 animate  bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white'> <div className='w-14'>Gender:</div><div>{item?.patient?.gender}</div></p>
                            <p className='mt-1 p-1 px-10 rounded-md w-80 animate bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white flex gap-8'><div className='w-14'>Age:</div> <div>{item?.patient?.age}</div></p>
                            <p className='mt-1 p-1 px-10 rounded-md w-80 animate bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white flex gap-8'><div className='w-14'>Contact: </div><div>{item?.patient?.contact}</div></p>
                            <p className='mt-1 p-1 px-10 rounded-md w-80 animate bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white flex gap-2'><div className='w-28'>Payment Type: </div><div>{item?.paymentType}</div></p>
                            <p className='mt-1 p-1 px-10 rounded-md w-80 animate bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white flex gap-8'><div className='w-14'>Amount:</div> <div>{item?.amount}</div></p>
                            <p className='mt-1 p-1 px-10 rounded-md w-80 animate bg-blue-300 hover:bg-gray-400 font-medium  hover:text-white flex gap-8'><div className='w-14'>Date:</div> <div>{formatDate(item?.paymentDate)}</div></p>
                            <p className={`mt-1 p-1 px-10 rounded-md w-80 animate bg-blue-300 font-medium  hover:text-white flex gap-8 ${item?.patient?.active === false ? "hover:bg-red-400 " : "hover:bg-green-400 "}`}> <div className='w-14'>Status:</div> <div>{item?.patient?.active === false ? (<span>Inactive</span>) : (<span>Active</span>)}</div></p>
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
            <Link to="/home/payment_entry">  <div className='bg-gray-100 hover:bg-gray-200 animate text-gray-800 center size-8 rounded-full cursor-pointer'><i className="fa-solid fa-plus"></i></div></Link>
            <div onClick={handleRefresh} className="bg-gray-100 hover:bg-gray-200 animate text-gray-800 center size-8 rounded-full cursor-pointer"><i className="fa-solid fa-rotate"></i></div>
            <div onClick={handleShowAllPayments} className={`animate center size-8 rounded-full cursor-pointer font-medium ${activeFilter === "all" ? "scale-105 bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-100 hover:bg-gray-200  text-gray-800"}`}>ALL</div>
            <div className="">
              <input type="date" value={startDate} max={new Date().toISOString().split('T')[0]} onChange={(e) => setStartDate(e.target.value)} className={`ml-5 px-5 border rounded-md focus:outline-none hover:border-blue-500 focus:border-blue-500`} />
              <input type="date" value={endDate} max={new Date().toISOString().split('T')[0]} onChange={(e) => setEndDate(e.target.value)} className={`ml-5 px-5 border rounded-md focus:outline-none hover:border-blue-500 focus:border-blue-500`} />
            </div>
            <div onClick={handleShowTodaysPayments} className={` animate center size-auto px-1 font-medium rounded-md cursor-pointer  ${activeFilter === "today" ? "bg-blue-500 text-white hover:bg-blue-600 scale-105" : "bg-gray-100 hover:bg-gray-200  text-gray-800"}`}>Today</div>
          </div>
          <div onClick={downloadExcel} className='text-green-600 cursor-pointer '>Download Excel  <i className="fa-regular fa-file-excel text-2xl text-green-500"></i></div>
        </div>
        <div className='mt-5'>
          <div className="patient-header flex border-b border-gray-200 justify-between items-center px-2 py-2 font-medium">
            <div className="w-[30%]">Patient Name <i className={`fa-solid fa-arrow-up text-xs text-gray-300 `}></i> <i className={`fa-solid fa-arrow-down  text-xs text-gray-300`}></i></div>
            <div className="w-[12%]">Contact <i className={`fa-solid fa-arrow-up text-xs text-gray-300 `}></i> <i className={`fa-solid fa-arrow-down  text-xs text-gray-300`}></i></div>
            <div className="w-[12%]">Amount <i className={`fa-solid fa-arrow-up text-xs text-gray-300 `}></i> <i className={`fa-solid fa-arrow-down  text-xs text-gray-300`}></i></div>
            <div className="w-1/6 ">Date</div>
            <div className="w-1/6 hidden sm:block">payment Type</div>
            <div className="w-[12%] hidden sm:block">Status</div>
            <div className="w-1/6 text-center">Actions</div>
          </div>

          {/* all */}
          <div className='pt-5 h-[430px] overflow-y-auto overflow-x-hidden'>
            {isLoading ? (
              <div className="center flex-col gap-24 h-3/4 w-[90%]">
                <div>Loading payments...</div>
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
                {paymentsToRender?.length > 0 ? (
                  paymentsToRender.map((item, index) => (
                    <span className={` ${selectedPatientId === item?._id && "opacity-20 cursor-not-allowed"} `}>
                      <motion.div key={item?._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * index }} className="font-medium patient-row flex border-b border-gray-100 justify-between items-center px-2 py-2 hover:scale-[1.001] hover:bg-gray-100 animate cursor-pointer rounded-md">
                        <div onClick={() => handleShowDetail(item?.patientId)} className='w-[86%] flex justify-between items-center'>
                          <div className='w-[30%] flex gap-1 items-center'>
                            <img src={item?.patient?.image} alt="" className='bg-sky-400 min-w-8 size-8 rounded-full' />
                            <div className='w-full flex justify-between ml-4'>
                              <div>{item?.patient?.name?.[0]?.toUpperCase() + item?.patient?.name?.slice(1)}</div>
                            </div>
                          </div>
                          <div className="w-[12%]">{item?.patient?.contact}</div>
                          <div className="w-[12%]">{item?.amount}</div>
                          <div className="w-1/6">{formatDate(item?.paymentDate)}</div>
                          <div className="w-1/6 hidden sm:block">{item?.paymentType}</div>
                          <div className="w-[12%] hidden sm:block">{item?.active === false ? (<span>Inactive</span>) : (<span>Active</span>)}</div>
                        </div>
                        <div className="w-[13%] flex justify-center items-center space-x-2">
                          <div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div onClick={() => { handleCopyPatientId(item?.patient?._id) }} className='px-2 py-1 hover:bg-gray-300 rounded-full min-w-8 size-8 animate flex items-center'>
                                    <span><LiaCopySolid className="text-blue-500 hover:text-blue-900" /></span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Copy Patient ID</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          {loggedInUserType === "admin" &&
                            <button disabled={selectedPatientId === item?._id}
                              className="delete px-2 py-1 hover:bg-red-300 rounded-full min-w-8 size-8 animate"
                              onClick={() => handleDelete(item?._id)}>
                              <i className="fa-solid fa-trash-can text-red-600 hover:text-red-900"></i>
                            </button>
                          }
                        </div>
                      </motion.div>
                    </span>
                  ))
                ) : (
                  <></>
                )}

                {!currentPatients?.length || notFound ? (
                  <div className="center flex-col gap-24 h-3/4 w-[90%]">
                    <div>No payments found.</div>
                    <div>
                      <Player
                        autoplay
                        loop
                        src={NotFoundAnimation} // Replace with actual NotFoundAnimation source
                        style={{ height: '200px', width: '200px' }}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>

          <div className='flex justify-between pr-6 py-2 mt-2 absolute w-full bottom-1'>
            {(searchResults?.length >= 1 || (startDate && endDate) || showTodayPayments) ? (
              <div className='w-fit p-2 rounded-md'>Showing {paymentsToRender?.length}</div>
            ) : (
              <div className='w-fit p-2 rounded-md'>Showing {indexOfFirstPatient + 1} to {Math.min(indexOfLastPatient, payments?.length)} of {payments?.length}</div>
            )}

            {/* <div className='w-fit p-2 rounded-md'>Showing {indexOfFirstPatient + 1} to {Math.min(indexOfLastPatient, paymentsToRender.length)} of {paymentsToRender.length}</div> */}
            {(searchResults?.length >= 1 || (startDate && endDate) || showTodayPayments) ? ("") : (
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
                  <button disabled={(indexOfLastPatient >= payments?.length) || (searchResults?.length >= 1 || (startDate && endDate) || showTodayPayments)} onClick={() => handlePageChange(currentPage + 1)} className='px-2 py-2 text-gray-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md'>Next</button>
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
              initial={{ opacity: 0, y: 15 }}
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

export default PatientPaymentsDetails;