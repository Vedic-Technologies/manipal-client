import React from 'react'
import physio from '../../../assets/images/image.png'

const Card = () => {
  return (
    <div className="w-full rounded-3xl bg-red-300 shadow-lg  p-5">
      <img className="h-10 w-24" src={physio} alt="Physiotherapy" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Physiotherapy</div>
      </div>
      <div className="px-6 py-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Book Appointment
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Learn More
        </button>
      </div>
    </div>
  )
}

export default Card