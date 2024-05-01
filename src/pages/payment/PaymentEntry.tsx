
import React, { useState } from 'react';

const PaymentEntry = () => {
  const [paymentType, setPaymentType] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, you can send the data to the server or handle it as needed
    console.log({ paymentType, amount, paymentDate });
  };

  const [selectedPatient, setSelectedPatient] = useState('');
  const [patientId, setPatientId] = useState('');

  const handleSelectChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  const handleInputChange = (e) => {
    setPatientId(e.target.value);
  };

  

  const users = [
    { id: 1, name: 'John Doe', phoneNumber: '1234567890', email: 'john@example.com', problem: 'Back Pain', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Jane Smith', phoneNumber: '9876543210', email: 'jane@example.com', problem: 'Knee Injury', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 3, name: 'Alice Johnson', phoneNumber: '5678901234', email: 'alice@example.com', problem: 'Neck Stiffness', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  ];

  const UserDetails = ({ user }) => {
    return (
      <div className="flex items-center mb-4">
        <div className="w-1/3">
          <img src={user.image} alt="User" className="rounded w-32 h-32" />
        </div>
        <div className="ml-4 w-2/3">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.phoneNumber}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.problem}</p>
        </div>
      </div>
    );
  };

  const getUserDetails = () => {
    if (selectedPatient) {
      return users.find(user => user.name === selectedPatient);
    } else if (patientId) {
      return users.find(user => user.id === parseInt(patientId));
    } else {
      return null;
    }
  };

  const selectedUser = getUserDetails();

  return (

    <>
     <h1 className="text-2xl font-semibold mb-6 ml-36 mt-3">Select Patient</h1>
       <div className="container mx-auto px-4 py-4 flex border-2 rounded-2xl h-72 p-3 border-gray-300 border-dashed w-4/5">
     <div className=" w-1/2 flex flex-col items-center justify-center ">
     <div className="flex flex-col gap-3">
     <div className="flex items-start mb-4 flex-col ">
        <label className="mr-2 font-medium">Enter Patient Name</label>
        <select
          value={selectedPatient}
          onChange={handleSelectChange}
          className="border border-gray-300 rounded px-3 py-2 w-60 mt-1"
        >
          <option value="">Select a patient</option>
          {users.map(user => (
            <option key={user.id} value={user.name}>{user.name}</option>
          ))}
        </select>
      </div>
      <div className="text-center font-semibold">---- OR ----</div>
      <div className="flex items-start mb-4 flex-col  relative">
        <label className="mr-2 font-medium">Patient ID:</label>
        <input
          type="text"
          value={patientId}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 w-60 mt-1"
          placeholder="Enter patient ID"
        />
        <div className="bg-blue-700 py-[5px] px-5 rounded text-white text-lg  cursor-pointer absolute -right-24 top-[30px]">Find</div>
      </div>
     </div>
     
      
      </div>
      {selectedUser ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-1/2">
          <h2 className="text-lg font-semibold mb-4">User Details</h2>
          <UserDetails user={selectedUser} />
        </div>
      ) :  <div className="bg-white shadow-lg rounded-lg p-6 w-1/2"></div> }
    </div>
   
    <div className="container mx-auto px-4 py-8 w-4/5">
      <h1 className="text-2xl font-semibold mb-6">Enter Payment Details</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentType">
            Payment Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="paymentType"
            type="text"
            placeholder="Enter payment type"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentDate">
            Payment Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="paymentDate"
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );
};


   
  
 

export default PaymentEntry;
