import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Male", "Female"],
  datasets: [
    {
      label: "Total Count: ",
      data: [64, 36],
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
}

const MaleFemaleRatio = () => {
  return (
    <div className='min-w-[600px] h-[350px] center rounded-3xl bg-white p-2 flex gap-10'>
      <div>
        <i className="fa-solid fa-person-dress text-6xl text-blue-300"></i>
        <span className='block text-center pt-2 text-gray-600'>{data.datasets[0].data[1]}</span>
      </div>
      <Doughnut data={data} />
      <div>
        <i className="fa-solid fa-person text-6xl text-red-400"></i>
        <span className='block text-center pt-2 text-gray-600'>{data.datasets[0].data[0]}</span>
      </div>
    </div>
  )
}

export default MaleFemaleRatio