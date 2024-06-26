import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

// const initialpatientData = {
//   patientName: "",
//   gender: "male",
//   age: "",
//   image:"",
//   dob: "2018-07-22",
//   contact: "",
//   email: "",
//   idProof: "",
//   weight: "",
//   height: "",
//   complaint: "",
//   bloodGroup: "",
//   referredTo: "",
//   address: {
//     state: "",
//     village: "",
//     pincode: "",
//   },
//   image: null,
// };

// const signupSchema = Yup.object().shape({
//   patientName: Yup.string().required("Patient name is required"),
//   gender: Yup.string().required("Gender is required"),
//   age: Yup.number().required("Age is required").positive().integer(),
//   dob: Yup.date().required("Date of birth is required").max(new Date()),
//   contact: Yup.string()
//     .required("Contact number is required")
//     .matches(/^\d+$/, "Invalid phone number"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   idProof: Yup.string().required("ID proof number is required"),
//   weight: Yup.number().required("Weight is required").positive(),
//   height: Yup.number().required("Height is required").positive(),
//   complaint: Yup.string().required("Complaint is required"),
//   bloodGroup: Yup.string().required("Blood group is required"),
//   referredTo: Yup.string().required("Referral doctor's name is required"),
//   address: Yup.object().shape({
//     state: Yup.string().required("State is required"),
//     village: Yup.string().required("Village is required"),
//     pincode: Yup.string().required("Pincode is required"),
//   }),
//   image: Yup.mixed().required("Profile image is required"),
// });




const PresCription = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const [patientData, setPatientData] = useState({
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
    image: null,
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   // Create FormData to include image
  //   const formData = new FormData();
  //   Object.keys(patientData).forEach((key) => {
  //     formData.append(key, patientData[key]);
  //   });
  
  //   try {
  //     const response = await axios.post(
  //       "https://manipal-server.onrender.com/api/patient/patient_registration",
  //       patientData
  //     );
  //     console.log(response.data);
  //     alert("Patient registration successful!");
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Failed to register patient.");
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  // Function to handle address input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      address: {
        ...patientData.address,
        [name]: value,
      },
    });
  };

 
  const handleImageChange = (e) => {
    console.log("image is ......")
    setPatientData({
      ...patientData,
      image: e.target.files[0],
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to include image
    const formData = new FormData();
    Object.keys(patientData).forEach((key) => {
      formData.append(key, patientData[key]);
    });

    try {
      const response = await axios.post(
        "https://manipal-server.onrender.com/api/patient/patient_registration",
        formData
      );
      console.log(response.data);
      alert("Patient registration successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register patient.");
    }
  };


  // const { patientData, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
  //   initialpatientData,
  //   validationSchema: signupSchema,
  //   onSubmit: async (patientData) => {
  //     try {
  //       const response = await axios.post(
  //         "https://manipal-server.onrender.com/api/patient/patient_registration",
  //         patientData
  //       );
  //       console.log(response.data);
  //       alert("Patient registration successful!");
  //     } catch (error) {
  //       console.error("Error:", error);
  //       alert("Failed to register patient.");
  //     }
  //   },
  // });



  //storing uploaded image on local storage for now..
  // const handleImageChange = (e) => {
  //   const imageFile = e.target.files[0];
  //   if (imageFile) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setPreviewImage(reader.result);
  //       // setFieldValue("image", reader.result);

  //       // Store the image data URL in local storage
  //       localStorage.setItem("previewImage", reader.result);
  //     };
  //     reader.readAsDataURL(imageFile);
  //   } else {
  //     setPreviewImage(null);
  //     // setFieldValue("image", null);
  //     localStorage.removeItem("previewImage");
  //   }
  // };

  // useEffect(() => {
  //   const savedImage = localStorage.getItem("previewImage");
  //   if (savedImage) {
  //     setPreviewImage(savedImage);
  //   }
  // }, []);

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
    //           value={patientData.patientName}
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
    //             checked={patientData.gender === "male"}
    //             onChange={handleChange}
    //           />
    //           <label htmlFor="male" className="ml-2">Male</label>
    //           <input
    //             type="radio"
    //             id="female"
    //             name="gender"
    //             value="female"
    //             checked={patientData.gender === "female"}
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
    //           value={patientData.age}
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
    //           value={patientData.dob}
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
    //           value={patientData.contact}
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
    //           value={patientData.email}
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
    //           value={patientData.bloodGroup}
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
    //           value={patientData.weight}
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
    //           value={patientData.height}
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
    //           value={patientData.idProof}
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
    //           value={patientData.referredTo}
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
    //           value={patientData.complaint}
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
    //          value={patientData.address.state}
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
    //          value={patientData.address.village}
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
    //          value={patientData.address.pincode}
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
      <h1 className=" ml-[27rem] font-normal">Fill out the form to collect patient details. </h1>
      <div className="flex justify-center items-center mt-5">
        <form className="w- rounded-lg bg-white  t shadow-lg p-5" onSubmit={handleSubmit}>
          {/* Patient Name */}
          <div className="flex gap-12">
            <div>
          <div className="flex gap-10">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700"> Name</label>
                <input
                  className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
                  type="text"
                  name="patientName"
                  value={patientData.patientName}
                  onChange={handleChange}
                  // onBlur={handleBlur}
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
                  value={patientData.age}
                  onChange={handleChange}
                  placeholder="Enter Age"
                  // onBlur={handleBlur}
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
                  value={patientData.dob}
                  placeholder="Enter DOB"
                  onChange={handleChange}
                  // onBlur={handleBlur}
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
                  value={patientData.contact}
                  onChange={handleChange}
                  placeholder="Enter number"
                  // onBlur={handleBlur}
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
                  value={patientData.email}
                  placeholder="Enter Email"
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-[15rem]b"
                />
                {/* {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>} */}
              </div>
              </div>
            </div>
            <div>
              {/* Profile Image */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Patient Image</label>
                <input
                  type="file"
                  accept="image/*"
                  name="profileImage"
                  onChange={(e)=>handleImageChange(e)}
                  // onBlur={handleBlur}
                  className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                {/* {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>} */}
              </div>
              {/* Preview Image */}
              <div className="center">
              {previewImage ?  (
                
                <div className="mb-4 h-36 w-32 border  overflow-hidden rounded ">
                  <img src={previewImage} alt="Preview" className="  object-fit h-full w-full" />
                </div>
              ) :(
                <div className="mb-4 h-36 w-32 border border-gray-400 overflow-hidden rounded text-xs font-normal center"> Image will appear here </div>
              )}
            </div></div>
          </div>



          <div className="flex gap-5">

            {/* ID Proof Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">ID Proof Number</label>
              <input
                type="text"
                name="idProof"
                value={patientData.idProof}
                onChange={handleChange}
                placeholder="Enter ID number"
                // onBlur={handleBlur}
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
                value={patientData.weight}
                onChange={handleChange}
                placeholder="Enter Weight"
                // onBlur={handleBlur}
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
                value={patientData.height}
                onChange={handleChange}
                placeholder="Enter Height"
                // onBlur={handleBlur}
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
              value={patientData.complaint}
              onChange={handleChange}
              // onBlur={handleBlur}
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
                value={patientData.bloodGroup}
                onChange={handleChange}
                placeholder="Enter Blood Group"
                // onBlur={handleBlur}
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
                value={patientData.referredTo}
                onChange={handleChange}
                // onBlur={handleBlur}
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
                  value={patientData.address.state}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
                />
                {/* {errors.address?.state && <p className="text-red-500 text-sm mt-1">{errors.address.state}</p>} */}
              </div>

              <div>
                <input
                  type="text"
                  name="address.village"
                  placeholder="Village"
                  value={patientData.address.village}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
                />
                {/* {errors.address?.village && <p className="text-red-500 text-sm mt-1">{errors.address.village}</p>} */}
              </div>

              <div>
                <input
                  type="text"
                  name="address.pincode"
                  placeholder="Pincode"
                  value={patientData.address.pincode}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
                />
                {/* {errors.address?.pincode && <p className="text-red-500 text-sm mt-1">{errors.address.pincode}</p>} */}
              </div>
            </div>
          </div>


          {/* Submit button */}
          <div className="flex  justify-end gap-5 mt-6">
            <button className="p-7   font-bold py-2 rounded-lg border border-black">
              Cancel
            </button>
            <button type="submit" className="p-7 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

















  );
};

export default PresCription;