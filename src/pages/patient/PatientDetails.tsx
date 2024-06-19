import React, { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
// import DefaultUserDetails from "../payment/DefaultUserDetails";
import { RiUserSearchLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import PatientDetailCard from "./PatientDetailCard";
import PatientPaymentCard from "./PatientPaymentCard";
import AlertWrapper from "../../custom_components/AlertWrapper";
// import JobDoneAlert from "../../custom_components/JobDoneAlert";
import { motion } from "framer-motion";
import { useGetAllPatientsQuery, useGetPatientByIdQuery } from "../../API/API";
import { Player } from "@lottiefiles/react-lottie-player";
import LoadingAnimation from "../../assets/animations/HospitalAnimation.json";
import NotFoundAnimation from "../../assets/animations/EmptStretcherAnimation.json";
import ErrorAnimation from "../../assets/animations/ErrorCatAnimation.json";
import { Link } from "react-router-dom";
import JobDoneAlertVarient from "../../custom_components/jobDoneVarient";

const Patient = () => {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const param = useParams();
  // jodDone alert message
  const [jobDoneMessage, setJobDoneMessage] = useState("");
  const [openJobDoneAlert, setOpenJobDoneAlert] = useState(false);
  const [patientError, setPatientError] = useState(false); // Additional state for managing patientByIdError

  const {
    data: allPatients = [],
    error: allPatientsError,
    isLoading: isLoadingAllPatients,
    refetch: refetchAllPatients,
  } = useGetAllPatientsQuery("");
  const {
    data: patientById = {},
    error: patientByIdError,
    isLoading: isLoadingPatientById,
    refetch: refetchPatientById,
  } = useGetPatientByIdQuery(selectedPatientId, {
    skip: !selectedPatientId,
  });

  useEffect(() => {
    if (param.id !== "0") {
      setSelectedPatientId(param.id);
      setPatientError(false);
    }
  }, [param.id]);

  useEffect(() => {
    if (selectedPatientId) {
      refetchPatientById();
      setPatientError(false);
    }
  }, [selectedPatientId, refetchPatientById]);

  useEffect(() => {
    if (patientByIdError) {
      setPatientError(true);
      setJobDoneMessage("Cannot find patient. Double-check ID!");
      setOpenJobDoneAlert(true);

      // Automatically hide the alert after 3 seconds
      setTimeout(() => {
        setOpenJobDoneAlert(false);
        setPatientError(false);
        setSelectedPatientId(null);
      }, 3000);
    }
  }, [patientByIdError]);

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedPatientId(id);
    setSearchInput("");
    setPatientError(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (searchInput) {
      setSelectedPatientId(searchInput);
      setPatientError(false);
      setJobDoneMessage("");
      setOpenJobDoneAlert(false);
    } else {
      console.error("Error fetching patient details:");
      setJobDoneMessage("Can not find Patient. Double-check ID !!");
      setOpenJobDoneAlert(true);

      // removing result not found alert automatically
      setTimeout(() => {
        setOpenJobDoneAlert(false);
      }, 3000);
    }
  };

  if (isLoadingAllPatients) {
    return (
      <div className="center flex-col gap-24 h-3/4 w-[90%]">
        <div>Loading patients...</div>
        <div>
          <Player
            autoplay
            loop
            src={LoadingAnimation}
            style={{ height: "200px", width: "200px" }}
          />
        </div>
      </div>
    );
  }

  if (allPatientsError) {
    return (
      <div className="center flex-col gap-24 h-3/4 w-[90%]">
        <div className="text-red">Error</div>
        <div className="flex flex-col gap-8 justify-center items-center ml-6">
          <div>
            <Player
              autoplay
              loop
              src={ErrorAnimation}
              style={{ height: "200px", width: "200px" }}
            />
          </div>
          <div className="retry">
            <button
              onClick={() => refetchAllPatients()}
              className="text-xl bg-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!allPatients.length) {
    return (
      <div className="center flex-col gap-24 h-3/4 w-[90%]">
        <div>No patients found.</div>
        <div>
          <Player
            autoplay
            loop
            src={NotFoundAnimation}
            style={{ height: "200px", width: "200px" }}
          />
        </div>
      </div>
    );
  }

  const handleAlert = () => {
    setOpenJobDoneAlert(false);
    setPatientError(false);
    setSelectedPatientId(null);
  };
  return (
    <div className="flex flex-col w-3/5 m-auto m-5">
      <div className="flex items-center justify-between gap-4 p-4 border-b">
        <div className="flex items-center gap-4">
          <label className="mr-2 font-medium">Search by name</label>
          <select
            value={selectedPatientId || ""}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded px-3 py-2 w-60 mt-1"
          >
            <option value="">Select a patient</option>
            {allPatients.map((user) => (
              <option key={user._id} value={user._id}>
                {user.patientName}
              </option>
            ))}
          </select>
          <div className="relative flex gap-2">
            <RiUserSearchLine className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="pl-8 w-[200px]"
              placeholder="Search by patient ID"
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <div>
              <Button onClick={handleSearch} variant="outline">
                Search
              </Button>
            </div>
          </div>
        </div>
        <Link to="../all_patients">
          <Button variant="outline" onClick={() => setSelectedPatientId(null)}>
            View All
          </Button>
        </Link>
      </div>

      <div className="flex justify-center m-auto w-full mt-10">
        <Card className="w-full mb-10 shadow-lg">
          {selectedPatientId ? (
            isLoadingPatientById ? (
              <div className="center flex-col gap-24 h-3/4 w-[90%]">
                <div>Loading patient details...</div>
                <div>
                  <Player
                    autoplay
                    loop
                    src={LoadingAnimation}
                    style={{ height: "200px", width: "200px" }}
                  />
                </div>
              </div>
            ) : patientError ? (
              <div className="center flex-col gap-24 h-3/4 w-[90%]">
                <AlertWrapper isOpen={openJobDoneAlert}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={openJobDoneAlert ? { opacity: 1, y: 0 } : {}}
                  >
                    <JobDoneAlertVarient
                      // height="h-24"
                      // width="w-52"
                      // textColor="text-white"
                      // bgColor="bg-red-400"
                      // boxShadow="shadow-[0px_0px_42px_2px_#c53030]"
                      message={jobDoneMessage}
                      isOpen={openJobDoneAlert}
                      OnCancel={handleAlert}
                      type="error"
                      // isCancelButton="block"
                      // icon={null}
                    />
                  </motion.div>
                </AlertWrapper>
              </div>
            ) : (
              <div>
                <PatientDetailCard
                  patient={patientById}
                />
                <PatientPaymentCard
                  payment={patientById.payments || []}
                  idOfPatient={patientById?._id}
                />
              </div>
            )
          ) : (
            ""
          )}
        </Card>
      </div>
    </div>
  );
};

export default Patient;
