import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  patientName: "",
  gender: "male",
  age: "",
  dob: "2018-07-22",
  contact: "",
  email: "",
  idProof: "",
  weight: "",
  height: "",
  complaint: "",
  bloodGroup: "",
  referredTo: "",
  address: {
    state: "",
    village: "",
    pincode: "",
  },
};

const signupSchema = Yup.object().shape({
  patientName: Yup.string().required("Patient name is required"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.number().required("Age is required").positive().integer(),
  dob: Yup.date().required("Date of birth is required").max(new Date()),
  contact: Yup.string()
    .required("Contact number is required")
    .matches(/^\d+$/, "Invalid phone number"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  idProof: Yup.string().required("ID proof number is required"),
  weight: Yup.number().required("Weight is required").positive(),
  height: Yup.number().required("Height is required").positive(),
  complaint: Yup.string().required("Complaint is required"),
  bloodGroup: Yup.string().required("Blood group is required"),
  referredTo: Yup.string().required("Referral doctor's name is required"),
  address: Yup.object().shape({
    state: Yup.string().required("State is required"),
    village: Yup.string().required("Village is required"),
    pincode: Yup.string().required("Pincode is required"),
  }),
});

const PresCription = () => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/admin/patient_registration",
          values
        );
        console.log(response.data);
        alert("Patient registration successful!");
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to register patient.");
      }
    },
  });

  return (
    // <div className="h-screen font-semibold bg-gray-100">
    //   <h1 className="text-2xl text-center border rounded-lg mt-10 bg-gray-200 py-2">
    //     Patient Detail
    //   </h1>
    //   <div className="flex justify-center items-center mt-5">
    //     <form className="w- rounded-lg bg-white shadow-lg p-5" onSubmit={handleSubmit}>
    //       {/* Patient Name */}
    //       <div className="flex gap-10">
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">Patient Name</label>
    //         <input
    //           className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //           type="text"
    //           name="patientName"
    //           value={values.patientName}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //         />
    //         {errors.patientName && <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>}
    //       </div>

    //       {/* Gender */}
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">Gender</label>
    //         <div className="mt-1 flex gap-1 items-center">
    //           <input
    //             type="radio"
    //             id="male"
    //             name="gender"
    //             value="male"
    //             checked={values.gender === "male"}
    //             onChange={handleChange}
    //           />
    //           <label htmlFor="male" className="ml-2">Male</label>
    //           <input
    //             type="radio"
    //             id="female"
    //             name="gender"
    //             value="female"
    //             checked={values.gender === "female"}
    //             onChange={handleChange}
    //           />
    //           <label htmlFor="female" className="ml-2">Female</label>
    //         </div>
    //         {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
    //       </div>
    //       {/* Age */}
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">Age</label>
    //         <input
    //           type="text"
    //           name="age"
    //           value={values.age}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //         />
    //         {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
    //       </div>
    //       </div>

    //      <div className="flex gap-10">
    //        {/* Date of Birth */}
    //        <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
    //         <input
    //           type="date"
    //           name="dob"
    //           value={values.dob}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //         />
    //         {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
    //       </div>

    //       {/* Contact Number */}
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">Contact Number</label>
    //         <input
    //           type="text"
    //           name="contact"
    //           value={values.contact}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //         />
    //         {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
    //       </div>

    //         {/* Email */}
    //         <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">Email</label>
    //         <input
    //           type="text"
    //           name="email"
    //           value={values.email}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //         />
    //         {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
    //       </div>

    //      </div>

        
    //      <div className="flex gap-5">
          

    //        {/* Blood Group */}
    //        <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">Blood Group</label>
    //         <input
    //           type="text"
    //           name="bloodGroup"
    //           value={values.bloodGroup}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //         />
    //         {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>}
    //       </div>

    //       {/* Weight */}
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
    //         <input
    //           type="text"
    //           name="weight"
    //           value={values.weight}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //         />
    //         {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
    //       </div>

    //       {/* Height */}
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
    //         <input
    //           type="text"
    //           name="height"
    //           value={values.height}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //         />
    //         {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
    //       </div>
    //      </div>

    //      <div className="flex gap-10">

    //         {/* ID Proof Number */}
    //         <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">ID Proof Number</label>
    //         <input
    //           type="text"
    //           name="idProof"
    //           value={values.idProof}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //         />
    //         {errors.idProof && <p className="text-red-500 text-sm mt-1">{errors.idProof}</p>}
    //       </div>
             

    //       {/* Referred To */}
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">Referred To</label>
    //         <input
    //           type="text"
    //           name="referredTo"
    //           value={values.referredTo}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //         />
    //         {errors.referredTo && <p className="text-red-500 text-sm mt-1">{errors.referredTo}</p>}
    //       </div>
    //      </div>

    //       {/* Complaint */}
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">Complaint</label>
    //         <input
    //           type="text"
    //           name="complaint"
    //           value={values.complaint}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //         />
    //         {errors.complaint && <p className="text-red-500 text-sm mt-1">{errors.complaint}</p>}
    //       </div>

      

          
    //         {/* Address */}
    //       <div className="">
    //         <label className="block text-sm font-medium text-gray-700">Address</label>
    //        <div className="flex gap-5">
    //        <div >
           
    //        <input
    //          type="text"
    //          name="address.state"
    //          placeholder="State"
    //          value={values.address.state}
    //          onChange={handleChange}
    //          onBlur={handleBlur}
    //          className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //        />
    //        {errors.address?.state && <p className="text-red-500 text-sm mt-1">{errors.address.state}</p>}
    //       </div>

    //      <div>
    //      <input
    //          type="text"
    //          name="address.village"
    //          placeholder="Village"
    //          value={values.address.village}
    //          onChange={handleChange}
    //          onBlur={handleBlur}
    //          className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //        />
    //        {errors.address?.village && <p className="text-red-500 text-sm mt-1">{errors.address.village}</p>}
    //      </div>

    //       <div>
    //       <input
    //          type="text"
    //          name="address.pincode"
    //          placeholder="Pincode"
    //          value={values.address.pincode}
    //          onChange={handleChange}
    //          onBlur={handleBlur}
    //          className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
    //        />
    //        {errors.address?.pincode && <p className="text-red-500 text-sm mt-1">{errors.address.pincode}</p>}
    //       </div>
    //        </div>
    //       </div>
        

    //       {/* Submit button */}
    //       <div className="flex justify-center mt-6">
    //         <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg">
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>

<div className="h-screen font-semibold bg-white">
      <h1 className="text-2xl ml-[30rem]  bg-white rounded-lg mt-10 py-2">
        Patient Information
      </h1>
      <h1 className=" ml-[27rem] font-normal">Fill out the foerm to collect patient details. </h1>
      <div className="flex justify-center items-center mt-5">
        <form className="w- rounded-lg bg-white  t shadow-lg p-5" onSubmit={handleSubmit}>
          {/* Patient Name */}
          <div className="flex gap-10">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700"> Name</label>
            <input
              className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
              type="text"
              name="patientName"
              value={values.patientName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your name"
            />
            {/* {errors.patientName && <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>} */}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="mt-1 flex gap-1 items-center">
              <select name="" id="" className=" rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-[15rem]">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
             </select>
             
            </div>
            </div>
            {/* {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>} */}
          </div>
      
          

         <div className="flex gap-10">
              {/* Age */}
              <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="text"
              name="age"
              value={values.age}
              onChange={handleChange}
              placeholder="Enter Age"
              onBlur={handleBlur}
              className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
            />
            {/* {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>} */}
          </div>
           {/* Date of Birth */}
           <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={values.dob}
              placeholder="Enter DOB"
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-[15rem]"
            />
            {/* {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>} */}
          </div>
          </div>
          <div className="flex gap-10">
          {/* Contact Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contact"
              value={values.contact}
              onChange={handleChange}
              placeholder="Enter number"
              onBlur={handleBlur}
              className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
            />
            {/* {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>} */}
          </div>

            {/* Email */}
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={values.email}
              placeholder="Enter Email"
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-[15rem]b"
            />
            {/* {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>} */}
          </div>
          </div>
     

        
         <div className="flex gap-5">
          
        {/* ID Proof Number */}
             <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">ID Proof Number</label>
            <input
              type="text"
              name="idProof"
              value={values.idProof}
              onChange={handleChange}
              placeholder="Enter ID number"
              onBlur={handleBlur}
              className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
            />
            {/* {errors.idProof && <p className="text-red-500 text-sm mt-1">{errors.idProof}</p>} */}
          </div>

          {/* Weight */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="text"
              name="weight"
              value={values.weight}
              onChange={handleChange}
              placeholder="Enter Weight"
              onBlur={handleBlur}
              className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
            />
            {/* {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>} */}
          </div>

          {/* Height */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="text"
              name="height"
              value={values.height}
              onChange={handleChange}
              placeholder="Enter Height"
              onBlur={handleBlur}
              className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
            />
            {/* {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>} */}
          </div>
         </div>


          {/* Complaint */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Complaint</label>
            <textarea
              
              name="complaint"
              value={values.complaint}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
            />
            {/* {errors.complaint && <p className="text-red-500 text-sm mt-1">{errors.complaint}</p>} */}
          </div>

      <div className="flex gap-10">


           {/* Blood Group */}
           <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={values.bloodGroup}
              onChange={handleChange}
              placeholder="Enter Blood Group"
              onBlur={handleBlur}
              className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
            />
            {/* {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>} */}
          </div>
 
          {/* Referred To */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Referred To</label>
            <input
              type="text"
              name="referredTo"
              value={values.referredTo}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
            />
            {/* {errors.referredTo && <p className="text-red-500 text-sm mt-1">{errors.referredTo}</p>} */}
          </div>



      </div>

          
            {/* Address */}
          <div className="">
            <label className="block text-sm font-medium text-gray-700">Address</label>
           <div className="flex gap-5">
           <div >
           
           <input
             type="text"
             name="address.state"
             placeholder="State"
             value={values.address.state}
             onChange={handleChange}
             onBlur={handleBlur}
             className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
           />
           {/* {errors.address?.state && <p className="text-red-500 text-sm mt-1">{errors.address.state}</p>} */}
          </div>

         <div>
         <input
             type="text"
             name="address.village"
             placeholder="Village"
             value={values.address.village}
             onChange={handleChange}
             onBlur={handleBlur}
             className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
           />
           {/* {errors.address?.village && <p className="text-red-500 text-sm mt-1">{errors.address.village}</p>} */}
         </div>

          <div>
          <input
             type="text"
             name="address.pincode"
             placeholder="Pincode"
             value={values.address.pincode}
             onChange={handleChange}
             onBlur={handleBlur}
             className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
           />
           {/* {errors.address?.pincode && <p className="text-red-500 text-sm mt-1">{errors.address.pincode}</p>} */}
          </div>
           </div>
          </div>
        

          {/* Submit button */}
          <div className="flex  justify-end gap-5 mt-6">
            <button className="p-7  hover:bg-blue-600  font-bold py-2 rounded-lg">
        Cancel
            </button>
            <button className="p-7 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

















  );
};

export default PresCription;
