import React, { useState, useEffect } from "react";
import {
  useGetAllStaffsQuery,
  useDeleteStaffByIdMutation,
  useStaffSignupMutation,
  useUpdateStaffByIdMutation,
} from "../../API/API";
import defaultUserImg from "../../assets/images/user_icon.png";
import LoadingAnimation from "../../assets/animations/HospitalAnimation.json";
import ErrorAnimation from "../../assets/animations/ErrorCatAnimation.json";
import { Player } from "@lottiefiles/react-lottie-player";

const ManageStaff = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const [firstNameValid, setFirstNameValid] = useState(true);
const [lastNameValid, setLastNameValid] = useState(true);
const [genderValid, setGenderValid] = useState(true);
const [contactValid, setContactValid] = useState(true);
const [emailValid, setEmailValid] = useState(true);
const [passwordValid, setPasswordValid] = useState(true);
const [submitResponse, setSubmitResponse] = useState(null)

  const { data: allStaffs, error, isLoading, refetch } = useGetAllStaffsQuery();
  const [deleteStaffById] = useDeleteStaffByIdMutation();
  const [staffSignup] = useStaffSignupMutation();
  const [updateStaffById] = useUpdateStaffByIdMutation();

  useEffect(() => {
    if (selectedStaffId) {
      const staff = allStaffs.find((staff) => staff._id === selectedStaffId);
      if (staff) {
        setFirstName(staff.firstName);
        setLastName(staff.lastName);
        setGender(staff.gender);
        setContact(staff.contact);
        setEmail(staff.email);
      }
    }
  }, [selectedStaffId, allStaffs]);

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFirstName(value);
      setFirstNameValid(true);
    } else {
      setFirstNameValid(false);
    }
  };
  
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setLastName(value);
      setLastNameValid(true);
    } else {
      setLastNameValid(false);
    }
  };
  
  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value);
    setGenderValid(!!value); 
  };
  
  const handleContactChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setContact(value);
      setContactValid(true);
    } else {
      setContactValid(false);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(!!value)
  };
  
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(!!value); // Check if field is not empty
  };
  
  const handleCancelButton = () => {
    clearForm();
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setGender("Male");
    setContact("");
    setEmail("");
    setPassword("");
    setSelectedStaffId(null);
    setFirstNameValid(true)
    setLastNameValid(true)
    setGenderValid(true)
    setContactValid(true)
    setEmailValid(true)
    setPasswordValid(true)
  };

  const capitalize = (string) => {
    return string ? string?.charAt(0)?.toUpperCase() + string?.slice(1) : "";
  };

  const handleDeleteStaff = async (id) => {
    await deleteStaffById(id).unwrap();
    refetch();
    console.log("staff deleted successfully")
  };

  const handleFormSubmit = async () => {
    try {
      setIsSubmitting(true); // Start submitting
      if (!(/^\S+@\S+\.\S+$/.test(email))) {
        setEmailValid(false);
        console.error("Please enter a valid email address.");
        return;
      }
      // Validate fields before submission
      if (!firstName || !lastName || !gender || !contact || !email || !password) {
        // Set validity state for each field
        setFirstNameValid(!!firstName);
        setLastNameValid(!!lastName);
        setGenderValid(!!gender);
        setContactValid(!!contact);
        setEmailValid(!!email);
        setPasswordValid(!!password);
        console.error("Please fill out all required fields.");
        return;
      }
  
      // Proceed with form submission if all fields are valid
      if (selectedStaffId) {
        // Update logic
        await updateStaffById({
          userId: selectedStaffId,
          updateData: {
            firstName,
            lastName,
            gender,
            contact,
            email,
            password,
          },
        }).unwrap();
        console.log("Staff updated successfully!");
        setSubmitResponse("Staff updated successfully!")
        
      } else {
        // Create logic
        await staffSignup({
          firstName,
          lastName,
          gender,
          contact,
          email,
          password,
        }).unwrap();
        console.log("Staff created successfully!");
        setSubmitResponse("Staff created successfully!")
      }
  
      refetch();
      clearForm();

      setTimeout(() => {
        setSubmitResponse(null);
      }, 2000);
  
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSubmitResponse("Failed to submit form!")

      setTimeout(() => {
        setSubmitResponse(null);
      }, 2000);
  
    } finally {
      setIsSubmitting(false); // End submitting
    }
  };
  

  const handleEditStaff = (staff) => {
    setSelectedStaffId(staff._id);
  };

  return (
    <div>
      <div className="flex w-full gap-2 h-auto  px-4 pl-8 py-2">
        <div className="w-[60%] p-2  h-[85vh] overflow-y-auto rounded-md">
          <div className="text-4xl font-semibold text-blue-500 text-center">
            Staff List
          </div>
          <hr className="mt-5" />
          {isLoading && (
            <div className="center flex-col gap-24 h-3/4 w-[90%] ">
              <div>Loading Staffs...</div>
              <div>
                <Player
                  autoplay
                  loop
                  src={LoadingAnimation}
                  style={{ height: "200px", width: "200px" }}
                />
              </div>
            </div>
          )}
          {error && (
            <div className="center flex-col gap-24 h-3/4 w-[90%]">
              <div className="text-red">Error</div>
              <div className="flex flex-col gap-8 justify-center items-center ml-6">
                <div>
                  <Player
                    autoplay
                    loop
                    src={ErrorAnimation}
                    style={{ height: "200px", width: "200px" }}
                  />
                </div>
                <div className="retry">
                  <button
                    onClick={() => refetch()}
                    className="text-xl bg-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded">
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="staff_list w-full px-8 ">
            {allStaffs?.map((staff, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center w-full border-b-2 border-blue-300 px-4 py-4">
                <div className="flex gap-5">
                  <img
                    src={defaultUserImg}
                    alt="staffImg"
                    className="size-12 rounded-full"
                  />
                  <div>
                    <div className="text-xl font-medium ">{`${capitalize(
                      staff?.firstName
                    )} ${capitalize(staff?.lastName)}`}</div>
                    <div className="text-gray-500">
                      {staff?.email || "Email not available"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-12">
                  <div>{staff?.contact || "Contact not available"}</div>
                  <div>
                    {capitalize(staff?.gender) || "Gender not Specified"}
                  </div>
                  <div className="flex gap-2 items-center justify-center">
                    <div
                      onClick={() => handleEditStaff(staff)}
                      className="bg-gray-200 hover:bg-blue-200 rounded-full size-8 center">
                      <i className="fa-regular fa-pen-to-square"></i>
                    </div>
                    <div
                      onClick={() => handleDeleteStaff(staff?._id)}
                      className="bg-gray-200 hover:bg-red-500 hover:text-gray-200 rounded-full size-8 center">
                      <i className="fa-regular fa-trash-can"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className=" rounded-md w-[40%] relative h-[700px]">
          <div className="text-center text-black text-xl py-2 pt-3">
            {selectedStaffId ? "Update Staff" : "Create Staff"}
          </div>
          <hr className="mt-5" />
          <div className="conten p-2 pl-12 w-full flex flex-col justify-center gap-4 ">
            <div className="relative">
            
              <label htmlFor="firstName" className="text-start">First Name</label>
              <input
  type="text"
  name="firstName"
  value={firstName}
  onChange={handleFirstNameChange}
  required
  className={`block mt-2 w-[70%] px-3 py-1 pl-10 border ${firstNameValid ? 'border-gray-300' : 'border-red-500'} focus:border-blue-400 focus:outline-none rounded-md`}
/>
{!firstNameValid && <p className="absolute -bottom-4 text-xs left-2 text-red-500">Enter valid First Name (required)</p>}

              <i class="fa-regular fa-user absolute top-10 left-3 text-sm text-gray-400 "></i>
              <span className="absolute h-7 border border-l-gray-400 top-[34px] left-9"></span>
            
            </div>
            <div className="relative">
              <label htmlFor="lastName">Last Name</label>
              <input
  type="text"
  name="lastName"
  value={lastName}
  onChange={handleLastNameChange}
  required
  className={`block mt-2 w-[70%] px-3 py-1 pl-10 border ${lastNameValid ? 'border-gray-300' : 'border-red-500'} focus:border-blue-400 focus:outline-none rounded-md`}
/>
{!lastNameValid && <p className="absolute -bottom-4 text-xs left-2 text-red-500">Enter valid Last Name (required)</p>}

                <i class="fa-regular fa-user absolute top-10 left-3 text-sm text-gray-400 "></i>
              <span className="absolute h-7 border border-l-gray-400 top-[34px] left-9"></span>
            
            </div>
            <div className="relative">
              <label htmlFor="gender">Gender</label>
              <select
  name="gender"
  value={gender}
  onChange={handleGenderChange}
  required
  className={`block mt-2 w-[70%] px-3 py-1 pl-10 border ${genderValid ? 'border-gray-300' : 'border-red-500'} focus:border-blue-400 focus:outline-none rounded-md`}
>
  <option value="" disabled>
    Select Gender
  </option>
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="other">Other</option>
</select>
{!genderValid && <p className="absolute -bottom-4 text-xs left-2 text-red-500">Gender is required</p>}

              <i class="fa-solid fa-person-half-dress absolute top-10 left-3 text-sm text-gray-400 "></i>
              <span className="absolute h-7 border border-l-gray-400 top-[34px] left-9"></span>
            
            </div>
            <div className="relative">
              <label htmlFor="contact">Contact</label>
              <input
  type="text"
  name="contact"
  value={contact}
  onChange={handleContactChange}
  required
  className={`block mt-2 w-[70%] px-3 py-1 pl-10 border ${contactValid ? 'border-gray-300' : 'border-red-500'} focus:border-blue-400 focus:outline-none rounded-md`}
/>
{!contactValid && <p className="absolute -bottom-4 text-xs left-2 text-red-500">Enter valid Contact (required)</p>}

                <i class="fa-regular fa-address-book absolute top-10 left-3 text-sm text-gray-400 "></i>
              <span className="absolute h-7 border border-l-gray-400 top-[34px] left-9"></span>
            
            </div>
            <div className="relative">
              <label htmlFor="email">Email</label>
              <input
  type="text"
  name="email"
  value={email}
  onChange={handleEmailChange}
  required
  className={`block mt-2 w-[70%] px-3 py-1 pl-10 border ${emailValid ? 'border-gray-300' : 'border-red-500'} focus:border-blue-400 focus:outline-none rounded-md`}
/>
{!emailValid && <p className="absolute -bottom-4 text-xs left-2 text-red-500">Enter valid Email (required)</p>}

                <i class="fa-regular fa-envelope absolute top-10 left-3 text-sm text-gray-400 "></i>
              <span className="absolute h-7 border border-l-gray-400 top-[34px] left-9"></span>
            
            </div>
            <div className="relative">
              <label htmlFor="password">Password</label>
              <input
  type="password"
  name="password"
  value={password}
  onChange={handlePasswordChange}
  required
  className={`block mt-2 w-[70%] px-3 py-1 pl-10 border ${passwordValid ? 'border-gray-300' : 'border-red-500'} focus:border-blue-400 focus:outline-none rounded-md`}
/>
{!passwordValid && <p className="absolute -bottom-4 text-xs left-2 text-red-500">Password is required</p>}
                <i class="fa-solid fa-key absolute top-10 left-3 text-sm text-gray-400 "></i>
              <span className="absolute h-7 border border-l-gray-400 top-[34px] left-9"></span>
              
            </div>
          </div>
          <div className="pl-12">
          {submitResponse && (
  <div className={`  ${submitResponse.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
    {submitResponse}
  </div>
)}
          </div>
          <div className="actions flex flex-wrap gap-20 p-8 pl-12 absolute bottom-5">
            <button
              onClick={handleFormSubmit}
              className={`px-5 py-2 bg-black hover:bg-slate-800 text-white rounded-lg ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}>
              {selectedStaffId ? "Update" : "Create"}
            </button>
            <button
              onClick={handleCancelButton}
              className="px-5 py-2 bg-black hover:bg-red-500 text-white rounded-lg">
              Cancel
            </button>
            
          </div>
     
        </div>
      </div>
    </div>
  );
};

export default ManageStaff;
