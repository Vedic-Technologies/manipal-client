import React, { useState, useEffect } from 'react';
import { recentDoctorReferences } from '../landing/cards/DoctorReferenceCard';
import AddDoctorForm from './AddDoctorForm';
import profileImg from '..//../assets/images/Profile.png'

const DoctorReference = () => {
  const [sortedData, setSortedData] = useState(recentDoctorReferences);
  const [isAscending, setIsAscending] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoResult, setShowNoResult] = useState(false);
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);

  const sortByIndexNumber = () => {
    const sorted = [...sortedData].sort((a, b) => {
      return isAscending ? +a.patientNum - +b.patientNum : +b.patientNum - +a.patientNum;
    });
    setSortedData(sorted);
    setIsAscending(!isAscending);
  };

  const sortByTopPatients = () => {
    const sorted = [...sortedData].sort((a, b) => +b.patientNum - +a.patientNum);
    setSortedData(sorted);
    setIsAscending(false);
  };

  const sortByLowestPatients = () => {
    const sorted = [...sortedData].sort((a, b) => +a.patientNum - +b.patientNum);
    setSortedData(sorted);
    setIsAscending(true);
  };

  useEffect(() => {
    const filteredData = recentDoctorReferences.filter(item =>
      item.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setShowNoResult(filteredData.length === 0);
    setSortedData(filteredData);
  }, [searchTerm]);

  const handleAddDoctor = (newDoctor) => {
    if (newDoctor) {
      setSortedData([...sortedData, newDoctor]);
    }
    setShowAddDoctorForm(false); // Hide the form after adding the doctor
  };

  return (
    <div className='m-6'>
      <h1 className='text-4xl'>Doctor List</h1>
      {!showAddDoctorForm ? (
        <>
          <div className='bg-white h-14 m-2 flex justify-between'>
            <div className='h-full flex gap-6 items-center pl-8'>
              <div className='flex gap-1'>
                <button className='flex gap-1 font-roboto' onClick={sortByIndexNumber}>
                  <div><i className="fa-solid fa-check-double"></i></div>All
                </button>
              </div>
              <div>
                <button className='flex gap-1 font-roboto' onClick={sortByTopPatients}>
                  <i className="mt-1 fa-solid fa-caret-up"></i>Top
                </button>
              </div>
              <div>
                <button className='flex gap-1 font-roboto' onClick={sortByLowestPatients}>
                  <i className="mt-1 fa-solid fa-caret-down"></i>Lowest
                </button>
              </div>
            </div>
            <div className="flex items-center relative">
              <input
                type="text"
                placeholder="Search Doctor Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md pl-10"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            </div>

          </div>

          <div className='h-screen bg-white'>
            <div className="container mx-auto px-4 py-2">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-4">Doctor-Patient Information</h2>
                <div className='flex justify-end '>
                  <button onClick={() => setShowAddDoctorForm(true)} className="px-4 py-2 bg-green-500 text-white rounded-md">
                    Add Doctor
                  </button>
                </div>
              </div>

              <div className="">
                <table className="table-auto w-full">
                  <thead className='bg-gray-50 border-b-2 border-gray-200'>
                    <tr className="bg-cyan-200">
                      <th className="w-6 text-sm font-semibold tracking-wide">ID</th>
                      <th className="p-3 text-sm font-semibold tracking-wide">Profile</th>
                      <th className="p-3 text-sm font-semibold tracking-wide">Doctor Name</th>
                      <th className="p-3 text-sm font-semibold tracking-wide">Doctor's Specialty</th>
                      <th className="p-3 text-sm font-semibold w-20">Status</th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-center">Patients</th>
                      <th className="p-3 text-sm font-semibold tracking-wide">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {showNoResult && <p className=" flex justify-center items-center">No results found</p>}
                    {sortedData.map((item, index) => (
                      <tr className="p-4 rounded-full shadow hover:shadow-md hover:bg-gray-200 hover:border hover:rounded-md transition duration-300 mt-5" key={index}>
                        <td className="h-16 px-4 py-2 font-bold text-blue-500 hover:underline">{item.docId}</td>
                        <td className="h-20 px-4 py-2 flex justify-center items-center">
                          <img src={item.profileImg} alt="Profile" className="h-12 w-12 rounded-full" />
                        </td>
                        <td className="h-16 px-4 py-2 font-semibold">{item.doctorName}</td>
                        <td className="h-16 px-4 py-2 font-semibold">{item.docSpeciality}</td>
                        <td className="text-center h-16 px-4 py-2">
                          <div className='w-20 p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-green-300 rounded-lg'>
                            {item.currentStatus}
                          </div>
                        </td>
                        <td className="text-center h-16 px-4 py-2">{item.patientNum}</td>
                        <td className="h-16 px-4 py-2">
                          <button>{item.contactNum}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <AddDoctorForm onAddDoctor={handleAddDoctor} />
      )}
    </div>
  );
};

export default DoctorReference;
