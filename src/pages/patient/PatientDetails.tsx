import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import DefaultUserDetails from "../payment/DefaultUserDetails";
import { RiUserSearchLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import PatientDetailCard from "./PatientDetailCard";
import PatientPaymentCard from "./PatientPaymentCard";
import AlertWrapper from '../../custom_components/AlertWrapper';
import JobDoneAlert from "../../custom_components/JobDoneAlert"
import { motion } from "framer-motion"

const Patient = () => {
  const [data, setData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(false);
  const [patient, setPatient] = useState();
  const [payment, setPayment] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const param = useParams();
  // jodDone alert message 
  const [jobDoneMessage, setJobDoneMessage] = useState("")
  const [openJobDoneAlert, setOpenJobDoneAlert] = useState(false)

  const handleCancelAlert = () => {
    setOpenJobDoneAlert(false)
  }
  console.log(param.id);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://manipal-server.onrender.com/api/patient/all_patients"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };
  useEffect(() => {
    if (param.id !== "0") {
      // alert(param.id)
    setSelectedPatient(true)
      fetchPatientDetails(param.id);
    }

    getData();
  }, []);
  const handleSelectChange = async (e) => {
    const id = e.target.value;
    setSelectedPatient(id);
    fetchPatientDetails(id);
  };

  const fetchPatientDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://manipal-server.onrender.com/api/patient/${id}`
      );
      setPatient(response.data);
      setPayment(response.data.payments);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    if (searchInput) {
      try {
        const response = await axios.get(
          `https://manipal-server.onrender.com/api/patient/${searchInput}`
        );
        setSelectedPatient(searchInput);
        setPatient(response.data);
        setPayment(response.data.payments);
        setJobDoneMessage("")
      setOpenJobDoneAlert(false)
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setJobDoneMessage("Can not find Patient. Double-check ID !!")
        setOpenJobDoneAlert(true)

      // removing result not found alert automatically
      setTimeout(() => {
        setOpenJobDoneAlert(false)
      }, 3000);
      }
    } else {
      // Handle case where search input is empty
      // Optionally display a message or prompt user to enter a patient ID
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col w-3/5 m-auto m-5">
      <div className="flex items-center justify-between gap-4 p-4 border-b">
        <div className="flex items-center gap-4">
          <label className="mr-2 font-medium">Search by name</label>
          <select
            value={selectedPatient}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded px-3 py-2 w-60 mt-1"
          >
            <option value="">Select a patient</option>
            {data.map((user) => (
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
        <Button variant="outline">View All</Button>
      </div>

      <div className="flex justify-center m-auto w-full mt-10">
        <Card className="w-full shadow-lg">
          {selectedPatient ? (
            <div>
              <PatientDetailCard patient={patient} />
              <PatientPaymentCard payment={payment} />
            </div>
          ) : (
            ""
          )}
        </Card>
      </div>
      <div>

<AlertWrapper isOpen={openJobDoneAlert}>
  <motion.div
    initial={{ opacity: 0, y: 50 }}
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

</div>
    </div>
  );
};

export default Patient;
