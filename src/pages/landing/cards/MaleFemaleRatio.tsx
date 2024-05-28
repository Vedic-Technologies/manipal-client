import React from 'react';
import { useGetAllPatientsQuery } from '../../../API/API'; // adjust the import path accordingly
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const MaleFemaleRatio = () => {
  const { data: patientsData, error, isLoading } = useGetAllPatientsQuery("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Calculate male and female counts from the patientsData
  const maleCount = patientsData.filter(patient => patient.gender === 'male').length;
  const femaleCount = patientsData.filter(patient => patient.gender === 'female').length;

  const chartData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Total Count: ",
        data: [maleCount, femaleCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
        hoverBorderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
      }
    ]
  };

  return (
    <div className='max-h-[360px] grow center rounded-3xl bg-white p-10 flex gap-10'>
      <div>
        <i className="fa-solid fa-person-dress text-6xl text-blue-300"></i>
        <span className='block text-center pt-2 text-gray-600'>{femaleCount}</span>
      </div>
      <Doughnut data={chartData} />
      <div>
        <i className="fa-solid fa-person text-6xl text-red-400"></i>
        <span className='block text-center pt-2 text-gray-600'>{maleCount}</span>
      </div>
    </div>
  );
}

export default MaleFemaleRatio;
