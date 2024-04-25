import axios from "axios";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";




const PresCription = () => {

  type FormData = {
    patientName: string;
    gender: string;
    age: number;
    dob: string;
    contact: string;
    email: string;
    weight: number;
    height: number;
    complaint: string;
    bloodGroup: string;
    referredTo: string;
    address: {
      state: string;
      village: string;
      pincode: string;
    };
  }





  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    gender: 'male',
    age: 0,
    dob: '2018-07-22',
    contact: '',
    email: '',
    weight: 0,
    height: 0,
    complaint: '',
    bloodGroup: '',
    referredTo: '',
    address: {
      state: 'bihar',
      village: 'babhaniya',
      pincode: '810221'
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(formData)
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/admin/patient_registration', formData);
      console.log(response.data);
      alert("patient registration successful !") // handle success response
    } catch (error) {
      console.error('Error:', error); // handle error
    }
  };

  return (

    <div className="  bg-blue-50  h-screen font-semibold ">
      <h1 className="flex  justify-center h-10 border mt-10 rounded-lg text-2xl bg-slate-200 ">Patient Detail</h1>
      <div className="mt-5 ml-5 flex justify-center items-center ">

        <form className="border w-[700px] rounded-lg" onSubmit={handleSubmit}>
          <div className="ml-5 mt-5 ">
            <div className="flex items-center gap-5">
              
              <div><label htmlFor="">Patient Name :</label> 

              <input 
                placeholder="Full Name" 
                className="rounded-lg" 
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
              /></div>

              <div className="flex"><label className="gap-2" htmlFor="Gender">Gender :

              </label>
                <div className="flex  gap-2">



                  <label htmlFor="male">Male</label>
                  <input type="radio" name="gender" id="male" value="male"

                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  />
                  <label htmlFor="female">Female</label>
                  <input type="radio" name="gender" id="female" value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  /></div></div>
            </div>


            <div className="flex mt-5 items-center gap-10 ml-5">
              <div><label htmlFor="Age">Age : </label><input className="rounded-lg" placeholder="Enter Age" type="text"

                name="age"
                value={formData.age}
                onChange={handleChange}
              /></div>

              <label htmlFor="start">Date Of Birth : <input className="rounded-lg" type="date" id="start" min="2018-01-01" max="2018-12-31"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              /></label>
            </div>
          </div>

          <div className="flex gap-20 items-center mt-5 ml-5">
            <div><label htmlFor="contact">Contact : </label> <input
              className="rounded-lg"
              placeholder="Mobile Number"
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            /></div>

            <div><label htmlFor="email">Email : </label> <input
              className="rounded-lg"
              placeholder="Enter Email"
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            /></div>
          </div>

          <div className="flex gap-20 items-center mt-5 ml-5">
            <div><label htmlFor="weight">Weight : </label>        <input
              className="rounded-lg"
              placeholder="Weight in (kg)"
              type="text"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            /></div>

            <div><label htmlFor="height">Height : </label>

              <input
                className="rounded-lg"
                placeholder="in cm"
                type="text"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />

            </div>
          </div>

          <div className="flex mt-5 items-center gap-5 ml-5">
            <div><label htmlFor="complaint">Complaint : </label> <input
              className="rounded-lg"
              placeholder="Describe Your Complaint"
              type="text"
              id="complaint"
              name="complaint"
              value={formData.complaint}
              onChange={handleChange}
            /></div>


            <div><label htmlFor="BloodGroup">Blood Group : </label>   <input
              className="rounded-lg"
              placeholder="Enter Blood Group"
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            /></div>
          </div>
          <div className="mt-5 ml-5">
            <div><label htmlFor="referredTo">Referred To : </label> <input
              className="rounded-lg w-[400px]"
              placeholder="Doctor's Name"
              type="text"
              id="referredTo"
              name="referredTo"
              value={formData.referredTo}
              onChange={handleChange}
            /></div>
          </div>





          <div className="mt-10 ml-5"><label htmlFor="address">Address : </label> </div>
          <div className="flex gap-3 items-center ml-5 mt-2">

            <div><label htmlFor="state"> </label><input
              className="rounded-lg w-[200px]"
              placeholder="State"
              type="text"
              id="state"
              name="state"
              value={formData.address.state}
              onChange={handleChange}
            /></div>
            <div><label htmlFor="Village"> </label> <input
              className="rounded-lg w-[200px]"
              placeholder="Village"
              type="text"
              id="village"
              name="village"
              value={formData.address.village}
              onChange={handleChange}
            /></div>
            <div><label htmlFor="pin_code"> </label> <input
              className="rounded-lg w-[200px]"
              placeholder="Pincode"
              type="text"
              id="pincode"
              name="pincode"
              value={formData.address.pincode}
              onChange={handleChange}
            /></div>
          </div>
          <div className="flex justify-center items-center mt-10 ">
            <button className="h-10 w-16 rounded-lg bg-blue-500" type="submit">Submit</button>
          </div>
        </form>

      </div>
    </div>
  )
}


export default PresCription
