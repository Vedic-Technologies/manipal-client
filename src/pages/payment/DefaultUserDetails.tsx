import React from 'react'
import default_user_logo from '../../assets/logoes/heartbeat.png'
const DefaultUserDetails = ({patient}) => {
   console.log(patient)
  return (
    <div className="flex items-center mb-4">
    <div className="w-1/3">
      <img src={patient?.image} alt="User" className="rounded-lg border boder-gray-200 h-[160px] p-2" />
    </div>
    <div className="ml-4 w-2/3">
      <h2 className="text-lg font-semibold">Name : {patient?.patientName}</h2>
      <p className="text-lg font-semibold">Sex : {patient?.gender}</p>
      <p className="text-lg font-semibold">Email : {patient?.email!=='NA' ? patient?.email : "abhinavbgp@gmail.com"}</p>
      <p className="text-lg font-semibold"> Problem : {patient?.complaint}</p>
    </div>
  </div>
  )
}

export default DefaultUserDetails