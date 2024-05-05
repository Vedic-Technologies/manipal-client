import React from 'react'
import default_user_logo from '../../assets/logoes/heartbeat.png'
const DefaultUserDetails = () => {
    const user={
        patientName:"Patient Name",
        gender: "Patient Gender",
        email: "Patient Email",
        complaint: "Patient Problem"
    }
  return (
    <div className="flex items-center mb-4">
    <div className="w-1/3">
      <img src={default_user_logo} alt="User" className="rounded-lg border boder-gray-200 h-[160px] p-2" />
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

export default DefaultUserDetails