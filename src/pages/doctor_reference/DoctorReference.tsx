import React, { useState } from 'react';
import { recentDoctorReferences } from '../landing/cards/DoctorReferenceCard';
import { data } from '../landing/cards/DailyIncomeCard';

const DoctorReference = () => {
  const [sortedData, setSortedData] = useState(recentDoctorReferences);
  const [isAscending, setIsAscending] = useState(true);

  const sortByIndexNumber = () => {
    const sorted = [...sortedData].sort((a, b) => {
      if (isAscending) {
        return a.indexNumber - b.indexNumber;
      } else {
        return b.indexNumber - a.indexNumber;
      }
    });
    setSortedData(sorted);
    setIsAscending(!isAscending);
  };

  return (
    <div className='m-6'>
      <h1 className='text-4xl'>Doctor List</h1>
      <div className='bg-white h-14 m-2 '>
        <div className='h-full flex gap-6 items-center pl-8'>
          <div className='flex gap-1'>
          
            <button className='flex gap-1 font-roboto' onClick={sortByIndexNumber}><div><i className="  fa-solid fa-check-double"></i></div>All</button>
          </div>
          <div>
            <button className='flex gap-1 font-roboto' onClick={sortByIndexNumber}><i className=" mt-1 fa-solid fa-caret-up"></i>Top</button>
          </div>
          <div>
            <button className='flex gap-1 font-roboto' onClick={sortByIndexNumber}><i className=" mt-1 fa-solid fa-caret-down"></i>Lowest</button>
          </div>
        </div>
      </div>
      <div className='h-screen bg-white '>
        <div className="container mx-auto px-4 py-2 ">
          <h2 className="text-2xl font-bold mb-4 ">Doctor-Patient Information</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-500 px-4 py-2">Doctor Name</th>
                  <th className="border border-gray-500 px-4 py-2">Patient Name</th>
                  <th className="border border-gray-500 px-4 py-2">Number of Patients</th>
                  <th className="border border-gray-500 px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 rounded-2xl">{item.doctorName}</td>
                    <td className="border border-gray-300 px-4 py-2 rounded-2xl">{item.patientName}</td>
                    <td className="border border-gray-300 px-4 py-2 rounded-2xl">{item.indexNumber}</td>
                    <td className="border border-gray-300 px-4 py-2 rounded-2xl">{item.date}</td>
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

export default DoctorReference;
