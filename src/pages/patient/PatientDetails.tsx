import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import DefaultUserDetails from '../payment/DefaultUserDetails';
import { RiUserSearchLine } from 'react-icons/ri';

const Patient = () => {
  const [data, setData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [patient, setPatient] = useState({});
  const [payment, setPayment] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const getData = async () => {
    try {
      const response = await axios.get('https://manipal-server.onrender.com/api/patient/all_patients');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSelectChange = async (e) => {
    const id = e.target.value;
    setSelectedPatient(id);
    fetchPatientDetails(id);
  };

  const fetchPatientDetails = async (id) => {
    try {
      const response = await axios.get(`https://manipal-server.onrender.com/api/patient/${id}`);
      setPatient(response.data);
      setPayment(response.data.payments);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    if (searchInput) {
      try {
        const response = await axios.get(`https://manipal-server.onrender.com/api/patient/${searchInput}`);
        setSelectedPatient(searchInput);
        setPatient(response.data);
        setPayment(response.data.payments);
      } catch (error) {
        console.error('Error fetching patient details:', error);
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
            <div><Button onClick={handleSearch} variant="outline">
              Search
            </Button></div>
            
          </div>
        </div>
        <Button variant="outline">View All</Button>
      </div>
      <div className="flex justify-center m-auto w-full">
        <Card className="w-full shadow-lg h-[25rem]">
          {selectedPatient ? (
            <div className="mt-[-5] w-full m-10 h-[22rem] flex item-center bg-white shadow-lg justify-center">
              <div className="text-center absolute">
                <h2 className="text-lg font-semibold">User Details</h2>
              </div>
              <div className="flex w-full">
                <div className="w-[30%] mt-10 pl-10">
                  <img src={patient.image} alt="User" className="rounded-lg border-2 boder-gray-200 h-60 w-[18rem] p-2" />
                </div>
                <div className="left w-[70%] flex flex-col mt-5 pl-20">
                  <div className="flex gap-5 mt-5">
                    <h2 className="text-lg font-semibold">Name : {patient.patientName}</h2>
                    <p className="text-lg font-semibold">Sex : {patient.gender}</p>
                    <p className="text-lg font-semibold">Height : {patient.height}</p>
                  </div>
                  <div className="flex gap-5 mt-5">
                    <p className="text-lg font-semibold">Email : {patient.email !== 'NA' ? patient.email : 'abhinavbgp@gmail.com'}</p>
                    <p className="text-lg font-semibold">State : {patient.address?.state}</p>
                  </div>
                  <div className="flex gap-5 mt-5">
                    <p className="text-lg font-semibold">Village : {patient.address?.village}</p>
                    <p className="text-lg font-semibold">Pin-code : {patient.address?.pin_code}</p>
                  </div>
                  <div className="flex gap-5 mt-5">
                    <p className="text-lg font-semibold">Country : {patient.address?.country}</p>
                    <p className="text-lg font-semibold">BloodGroup : {patient.bloodGroup}</p>
                  </div>
                  <div className="flex gap-5 mt-5">
                    <p className="text-lg font-semibold">Weight : {patient.weight}</p>
                    <p className="text-lg font-semibold">Age : {patient.age}</p>
                  </div>
                  <div className="flex gap-5 mt-5">
                    <p className="text-lg font-semibold">ReferredTo : {patient.referredTo}</p>
                    <p className="text-lg font-semibold">Dob : {patient.dob}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-6 w-full border boder-gray-200">
              <h2 className="text-lg font-semibold mb-4">User Details</h2>
              <DefaultUserDetails />
            </div>
          )}
        </Card>
      </div>
      <div className="container mx-auto px-0 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:text-gray-200">
          <h2 className="text-2xl font-bold mb-4">Payments</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-end pr-24">Action</th>
                </tr>
              </thead>
              <tbody>
                {payment.map((pay) => (
                  <tr key={pay._id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-3">{pay.paymentDate}</td>
                    <td className="px-4 py-3">{pay.amount}</td>
                    <td className="px-4 py-3 flex items-center justify-end space-x-2">
                      <Button size="sm" variant="outline">
                        Delete
                      </Button>
                      <Button size="sm" variant="outline">
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
