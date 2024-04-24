import { useState, useEffect } from "react";


const patientData = {
  name: "Ramesh Pashwan",
  gender: "Male",
  weight: "70 kg",
  bloodGroup: "AB+",
  age: 35,
  referTo: "Dr. Modi"
};

const PresCription = () => {
  

  return (
    
    <div className="  bg-blue-50 font-semibold ">
      <h1 className="flex  justify-center h-10 border mt-10 rounded-lg text-2xl bg-slate-200 ">PresCription</h1>
      <div className="mt-5 ml-5 flex justify-center items-center ">
        
        <form className="border w-[700px] rounded-lg ">
          <div className="ml-5 mt-5 ">
          <div className="flex gap-5">
          <div><label htmlFor="">Patient Name :</label> <input placeholder="Full Name" className="rounded-lg" type="text" /></div>
          <div className="flex"><label className="gap-2" htmlFor="Gender">Gender : 
            
          </label>
          <div className="flex gap-2">
          <label htmlFor="male">Male</label>
            <input  type="radio" name="gender" id="male" value="male" checked />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="female" value="female"  /></div></div>
          </div>
          <div className="flex mt-5 gap-5 ml-5">
          <div><label htmlFor="Age">Age : </label><input className="rounded-lg" placeholder="Enter Age" type="text" /></div>
          <label htmlFor="start">Date Of Birth :</label>
          <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" />
          </div>
          </div>

        <div className="flex gap-20 mt-5 ml-5">
        <div><label htmlFor="contact">Contact : </label><input className="rounded-lg" placeholder="Mobile Number" type="text" /></div>
          <div><label htmlFor="email">Email : </label><input className="rounded-lg" placeholder="Enter Email" type="text" /></div>
        </div>
          
          <div className="flex gap-20 mt-5 ml-5">
          <div><label htmlFor="weight">Weight : </label><input className="rounded-lg" placeholder="Weight in (kg)" type="text" /></div>
          <div><label htmlFor="height">Height : </label><input className="rounded-lg" placeholder="in cm" type="text" /></div>
          </div>

          <div className="flex mt-5 gap-5 ml-5">
          <div><label htmlFor="complaint">Complaint : </label><input className="rounded-lg" placeholder="Describe Your Complaint" type="text" /></div>
          <div><label htmlFor="BloodGroup">Blood Group : </label> <input className="rounded-lg" placeholder="Enter Blood Group" type="text" /></div>
          </div>
          <div className="mt-5 ml-5">
            <div><label htmlFor="referredTo">Referred To : </label><input className="rounded-lg w-[400px]" placeholder="Doctor's Name" type="text" /></div>
            </div>
          

          <div className="mt-10 ml-5"><label htmlFor="address">Address : </label><input className="rounded-lg w-[450px]" placeholder="Enter Address" type="text" /></div>
          <div className="flex gap-3 ml-5 mt-2">

          <div><label htmlFor="state"> </label><input className="rounded-lg w-[200px]" placeholder="State" type="text" /></div>
          <div><label htmlFor="Village"> </label><input className="rounded-lg [200px]" placeholder="Village" type="text" /></div>
          <div><label htmlFor="pin_code"> </label><input className="rounded-lg [200px]" placeholder="Pincode" type="text" /></div>
          </div>
          <div className="flex justify-center items-center mt-10 ">
        <button className="h-10 w-16 rounded-lg bg-blue-500">Submit</button>
        </div>
        </form>
       
      </div>
    </div>
  )
}


export default PresCription
