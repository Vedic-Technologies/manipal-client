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

const Patient = () => {
  const [data, setData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [patient, setPatient] = useState({});
  const [payment, setPayment] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const param = useParams();

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
    fetchPatientDetails(param.id);
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
      } catch (error) {
        console.error("Error fetching patient details:", error);
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

      {param.id !== "0" && (
        <div className="flex justify-center m-auto w-full mt-10">
          <Card className="w-full shadow-lg">
            {selectedPatient ? (
              <PatientDetailCard patient={patient} />
            ) : (
              <PatientDetailCard patient={patient} />
            )}
          </Card>
        </div>
      )}
      {param.id !== "0" && <PatientPaymentCard payment={payment} />}
    </div>
  );
};

export default Patient;
