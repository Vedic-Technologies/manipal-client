import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profile from '../../assets/images/profile.jpg';
import pay from '../../assets/images/payment.jpg';

const PaymentEntry = () => {
  const [paymentType, setPaymentType] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [data, setData] = useState([]);
  const [patientDetails, setPatientDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send payment data to the server)
    console.log({ paymentType, amount, paymentDate });

    // Reset form fields after submission
    setPaymentType('');
    setAmount('');
    setPaymentDate('');
  };

  const getData = async () => {
    try {
      const response = await axios.get('https://manipal-server.onrender.com/api/patient/all_patients');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const findPatientDetails = async () => {
    try {
      const response = await axios.get(`https://manipal-server.onrender.com/api/patient/${selectedPatient}`);
      setPatientDetails(response.data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  const handleInputChange = (e) => {
    setSelectedPatient(e.target.value); // Update selectedPatient when input changes
  };

  const UserDetails = ({ user }) => {
    return (
      <div className="flex items-center mb-4">
        <div className="w-1/3">
          {/* <img src={profile} alt="User" className="rounded w-32 h-32" /> */}
        </div>
        <div className="ml-4 w-2/3">
          <h2 className="text-lg font-semibold">{user.patientName}</h2>
          <p className="text-gray-600">{user.gender}</p>
          <p className="text-gray-600">{user.email}</p>
          {/* <p className="text-gray-600">{user.problem}</p> */}
        </div>
      </div>
    );
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6 ml-36 mt-3">Select Patient</h1>
      <div className="container mx-auto px-4 py-4 flex border-2 rounded-2xl h-72 p-3 border-gray-300 border-dashed w-4/5">
        <div className="w-1/2 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-3">
            <div className="flex items-start mb-4 flex-col ">
              <label className="mr-2 font-medium">Enter Patient Name</label>
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
            </div>
            <div className="text-center font-semibold">---- OR ----</div>
            <div className="flex items-start mb-4 flex-col relative">
              <label className="mr-2 font-medium">Patient ID:</label>
              <input
                type="text"
                value={selectedPatient}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 w-60 mt-1"
                placeholder="Enter patient ID"
              />

              <button className="bg-blue-700 py-[5px] px-5 rounded text-white text-lg cursor-pointer absolute -right-24 top-[30px]"
                onClick={findPatientDetails}
              >
                Find</button>

            </div>
          </div>
        </div>
        {patientDetails ? (
          <div className="bg-white shadow-lg rounded-lg p-6 w-1/2">
            <h2 className="text-lg font-semibold mb-4">User Details</h2>
            <UserDetails user={patientDetails} />
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 w-1/2">
            <img src={profile} alt="" className="rounded w-32 h-32" />
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8 w-4/5 ">
        <h1 className="text-2xl font-semibold mb-6">Enter Payment Details</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w- ">
          <div className="flex">
            <div className="w-1/2">
              <div className="mb-4">
                <label htmlFor="paymentType" className="block text-gray-700 text-sm font-bold mb-2">
                  Payment Type
                </label>
                <select
                  id="paymentType"
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  required
                >
                  {/* Render options based on data1 */}
                  {data.map((payment) => (
                    <option key={payment._id} value={payment.paymentType}>
                      {payment.paymentType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="paymentDate" className="block text-gray-700 text-sm font-bold mb-2">
                  Payment Date
                </label>
                <input
                  id="paymentDate"
                  type="date"
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="w-1/2">
              <img className="h-80 w-96" src={pay} alt="" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentEntry;
