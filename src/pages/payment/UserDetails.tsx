import React from 'react'
import sun from '../../assets/logoes/sun.png';
import { PatientType } from '@/src/types/PatientTypes';
const UserDetails = ({ user } :PatientType) => {
    console.log(user)
  return (
    
    <div className="flex items-center mb-4">
    <div className="w-1/3">
      <img src={user.image} alt="User" className="rounded-lg border boder-gray-200 h-40 p-2" />
    </div>
    <div className="ml-4 w-2/3">
      <h2 className="text-lg font-semibold">Name : {user.patientName}</h2>
      <p className="text-lg font-semibold">Sex : {user.gender}</p>
      <p className="text-lg font-semibold">Email : {user.email!=='NA' ? user.email : "abhinavbgp@gmail.com"}</p>
      <p className="text-lg font-semibold"> Problem : {user.complaint}</p>
    </div>
  </div>
  )
}

export default UserDetails