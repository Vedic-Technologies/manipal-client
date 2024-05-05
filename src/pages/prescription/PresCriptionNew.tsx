import React, { ChangeEvent, useEffect } from "react";
import axios from "axios";
import { useState } from "react";

type PatientData = {
  patientName: string;
  gender: string;
  age: string;
  image: string | null;
  dob: string;
  contact: string;
  email: string;
  idProof: string;
  weight: string;
  height: string;
  complaint: string;
  bloodGroup: string;
  referredTo: string;
  address: {
    state: string;
    village: string;
    pincode: string;
  };
};

const PresCriptionNew = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const [patientData, setPatientData] = useState<PatientData>({
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  // Function to handle address input changes
  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      address: {
        ...patientData.address,
        [name]: value,
      },
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        // setFieldValue("image", reader.result);

        // Store the image data URL in local storage
        localStorage.setItem("previewImage", reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setPreviewImage(null);
      // setFieldValue("image", null);
      localStorage.removeItem("previewImage");
    }
  };

  return (
    <div className="h-screen font-semibold bg-white">
      <h1 className="text-2xl ml-[30rem]  bg-white rounded-lg mt-10 py-2">
        Patient Information
      </h1>
      <h1 className=" ml-[27rem] font-normal">
        Fill out the foerm to collect patient details.{" "}
      </h1>
      <div className="flex justify-center items-center mt-5">
        <form
          className="w- rounded-lg bg-white  t shadow-lg p-5"
          onSubmit={handleSubmit}
        >
          {/* Patient Name */}
          <div className="flex gap-12">
            <div>
              <div className="flex gap-10">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {" "}
                    Name
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="mt-1 flex gap-1 items-center">
                    <select
                      name=""
                      id=""
                      className=" rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-[15rem]"
                    >
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
                  <label className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
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
                <label className="block text-sm font-medium text-gray-700">
                  Patient Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="profileImage"
                  onChange={(e) => handleImageChange(e)}
                  // onBlur={handleBlur}
                  className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                {/* {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>} */}
              </div>
              {/* Preview Image */}
              <div className="center">
                {previewImage ? (
                  <div className="mb-4 h-36 w-32 border  overflow-hidden rounded ">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="  object-fit h-full w-full"
                    />
                  </div>
                ) : (
                  <div className="mb-4 h-36 w-32 border border-gray-400 overflow-hidden rounded text-xs font-normal center">
                    {" "}
                    Image will appear here{" "}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            {/* ID Proof Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                ID Proof Number
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Height (cm)
              </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Complaint
            </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Blood Group
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Referred To
              </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <div className="flex gap-5">
              <div>
                <input
                  type="text"
                  name="address.state"
                  placeholder="State"
                  value={patientData.address.state}
                  onChange={handleAddressChange}
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
                  onChange={handleAddressChange}
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
                  onChange={handleAddressChange}
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
            <button
              type="submit"
              className="p-7 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PresCriptionNew;
