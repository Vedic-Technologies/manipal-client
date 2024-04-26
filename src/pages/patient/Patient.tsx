import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:8000/api/admin/all_patients');
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
    // Implement logic to handle edit functionality (e.g., navigate to edit page)
    console.log('Edit patient:', patientId);
  };

  const handleDelete = async (patientId) => {
    // Implement logic to handle delete functionality (e.g., API call to delete patient)
    try {
      const response = await axios.delete(`http://localhost:8000/api/admin/patient/${patientId}`);
      setPatients(patients.filter((patient) => patient._id !== patientId)); // Update local state
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading patients...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error.message}</div>;
  }

  if (!patients.length) {
    return <div className="text-center p-4">No patients found.</div>;
  }

  return (
    <div className="patient-list px-4 py-2">
      <div className="patient-header flex border-b border-gray-200 justify-between items-center px-2 py-2 font-medium">
        <div className="w-1/4">Patient Name</div>
        <div className="w-1/6">Gender</div>
        <div className="w-1/6">Age</div>
        <div className="w-1/6">Contact</div>
        <div className="w-1/6 hidden sm:block">Email</div>
        <div className="w-1/6 text-center">Actions</div>
        {/* Add more headers as needed */}
      </div>
      {patients.map((patient) => (
        <div key={patient._id} className="patient-row flex border-b border-gray-200 justify-between items-center px-2 py-2">
          <div className="w-1/4">{patient.patientName}</div>
          <div className="w-1/6">{patient.gender}</div>
          <div className="w-1/6">{patient.age}</div>
          <div className="w-1/6">{patient.contact}</div>
          <div className="w-1/6 hidden sm:block">{patient.email}</div>
          <div className="w-1/6 flex justify-center space-x-2">
            <button
              className="px-2 py-1 text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
              onClick={() => handleEdit(patient._id)}
            >
              Edit
            </button>
            <button
              className="px-2 py-1 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-md"
              onClick={() => handleDelete(patient._id)}
            >
              Delete
            </button>
          </div>
          {/* Add more values as needed */}
        </div>
      ))}
    </div>
  );
};

export default Patient;
