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
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

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

      if (selectedStaffId) {
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
      } else {
        await staffSignup({
          firstName,
          lastName,
          gender,
          contact,
          email,
          password,
        }).unwrap();
        console.log("Staff created successfully!");

      }

      refetch();
      clearForm();
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsSubmitting(false); // End submitting
    }
  };

  const handleEditStaff = (staff) => {
    setSelectedStaffId(staff._id);
  };

  return (
    <div>
      <div className="flex w-full gap-2 h-screen px-4 pl-8 py-2">
        <div className="w-[60%] p-2 bg-violet-50 rounded-md">
          <div className="text-4xl font-semibold text-blue-500 text-center">
            Staff List
          </div>
          <hr className="mt-5" />
          {isLoading && (
            <div className="center flex-col gap-24 h-3/4 w-[90%]">
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

        <div className="bg-violet-50 rounded-md w-[40%]">
          <div className="text-center text-black text-xl py-2">
            {selectedStaffId ? "Update Staff" : "Create Staff"}
          </div>
          <hr className="mt-5" />
          <div className="conten p-2 pl-12 w-full flex flex-col justify-center gap-4 ">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block mt-2 w-1/2 px-3 py-1 border border-black rounded-md"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block mt-2 w-1/2 px-3 py-1 border border-black rounded-md"
              />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block mt-2 w-1/2 px-3 py-1 border border-black rounded-md">
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact">Contact</label>
              <input
                type="text"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="block mt-2 w-1/2 px-3 py-1 border border-black rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block mt-2 w-1/2 px-3 py-1 border border-black rounded-md"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block mt-2 w-1/2 px-3 py-1 border border-black rounded-md"
              />
            </div>
          </div>
          <div className="actions flex gap-20 p-8 pl-10">
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
