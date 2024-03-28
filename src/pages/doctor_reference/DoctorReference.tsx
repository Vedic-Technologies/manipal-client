import React, { useState, useEffect } from 'react'
import { recentDoctorReferences } from '../landing/cards/DoctorReferenceCard'

const DoctorReference = () => {

  const doc = recentDoctorReferences[0]
  return (
    <div className='m-6'>
      <h1 className='text-4xl'>Doctor List</h1>
      <div className='bg-white h-14 m-2'>
        <div className='flex gap-6 ml-4'>
          <div className='mt-4'>
            <input type="checkbox" className="w-4 h-4 rounded-full" />
            <span className="ml-2">All</span>
          </div>
          <div className="mt-4">
            <input type="checkbox" className="w-4 h-4 rounded-full" />
            <span className="ml-2">Top</span>
          </div>
          <div className="mt-4">
            <input type="checkbox" className="w-4 h-4 rounded-full" />
            <span className="ml-2">Lowest</span>
          </div>
        </div>
      </div>
      <div className='h-screen bg-white'>
        <div>
          <div className='  flex flex-wrap justify-between gap-2  '>
            {recentDoctorReferences.map((item) => {
              return (
                <div className=' mt-5 ml-5 h-80 w-96 p-4 bg-green-200 '>
                  <div className='text-2xl'>Doctor - {item.doctorName}</div>
                  <div className='text-lg mt-2'>Patient - {item.patientName}</div>
                  <div className='text-lg'>Number - {item.indexNumber}</div>
                  <div className='text-lg'>Date - {item.date}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>


    </div>
  )
}

export default DoctorReference