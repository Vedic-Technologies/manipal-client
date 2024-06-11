import React, { useEffect, useState } from "react";
import "./super_admin.css";
import axios from "axios";
// import bird from "../images/profile_pics/user_icon.png";
// import DeleteModal from "./DeleteModal";
// import DeleteModalStaff from "./DeleteModalStaff";
// StaffForm.js

const SuperAdmin = () => {
  const [staffInfo, setStaffInfo] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "male",
    userType: "staff",
    phoneNumber: null,
  });
  const [staffs, setStaffs] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Add useNavigate hook

  const getStaffs = () => {
    axios.get("https://manipal-server.onrender.com/api/users").then((response) => {
      setStaffs(response.data);
      console.log("]]]]]]]]]]]");
      console.log(showModal);
      console.log(response.data);
    });
  };

  useEffect(() => {
    getStaffs();
  }, [showModal]);

  useEffect(() => {
    getStaffs();
    if (
      staffInfo.userName &&
      staffInfo.password &&
      staffInfo.firstName &&
      staffInfo.lastName &&
      staffInfo.email &&
      staffInfo.gender
    ) {
      setSubmitDisabled(false);
      return;
    }
    setSubmitDisabled(true);
  }, [staffInfo]);

  const handleChange = (e) => {
    console.log(staffInfo);
    const { name, value } = e.target;
    setStaffInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://manipal-server.onrender.com/api/users/signup", {
        userName: staffInfo.userName,
        password: staffInfo.password,
        firstName: staffInfo.firstName,
        lastName: staffInfo.lastName,
        email: staffInfo.email,
        gender: staffInfo.gender,
        userType: "staff",
        phoneNumber: staffInfo.phoneNumber,
        isActive: true,
      });
      getStaffs();
      setStaffInfo({
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "male",
        userType: "admin",
        phoneNumber: "",
      });
      alert("Staff created successfully!");
    } catch (err) {
      console.error("createStaff :: Error :: ", err);
    }
  };

  const updateStaff = async () => {
    try {
      await axios.patch(`https://manipal-server.onrender.com/api/users/${staffInfo.userId}`, {
        userName: staffInfo.userName,
        password: staffInfo.password,
        firstName: staffInfo.firstName,
        lastName: staffInfo.lastName,
        email: staffInfo.email,
        gender: staffInfo.gender,
        userType: "staff",
        phoneNumber: staffInfo.phoneNumber,
        isActive: true,
      });
      getStaffs();
      setEditMode(false);
      setStaffInfo({
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "male",
        userType: "admin",
        phoneNumber: "",
      });
      alert("Staff updated successfully!");
    } catch (err) {
      console.error("updateStaff :: Error :: ", err);
    }
  };

  const fillForm = (staffId) => {
    setEditMode(true);
    console.log(staffId);
    axios
      .get(`https://manipal-server.onrender.com/api/users/${staffId}`)
      .then((response) => {
        const matchedStaff = response.data;
        setStaffInfo({
          userId: matchedStaff.userId,
          userName: matchedStaff.userName,
          password: matchedStaff.password,
          firstName: matchedStaff.firstName,
          lastName: matchedStaff.lastName,
          email: matchedStaff.email,
          gender: matchedStaff.gender,
          userType: "staff",
          phoneNumber: matchedStaff.phoneNumber,
        });

        console.log(response.data);
        console.log("Matched Staff:", matchedStaff);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const clearFields = () => {
    setEditMode(false);
    setStaffInfo({
      userName: "",
      password: "",
      firstName:
        "",
      lastName: "",
      email: "",
      gender: "male",
      userType: "admin",
      phoneNumber: "",
    });
  };

  const OpenModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="create_staff_container">
        <div className="create_staff_creation_info">
          <div className="create_staff_list">Doctor's List</div>
          {staffs?.map((item, index) => {
            if (item.userType === "staff") {
              return (
                <div key={index} className="create_each_staff_info">
                  <div className="create_staff_images">
                    {" "}
                    <img
                      className="create_staff_profile-picture"
                      src={bird}
                      alt="Profile"
                    ></img>{" "}
                  </div>
                  <div className="create_staff_name_and_email">
                    <div className="create_staff_name">
                      {" "}
                      {item.firstName} {item.lastName}{" "}
                    </div>
                    <div className="create_staff_email"> {item.email} </div>
                  </div>
                  <div className="create_staff_number">{item.phoneNumber} </div>
                  <div className="edit_staff_btn flex gap-5">
                    <button
                      className="edit-btn hover h-12"
                      onClick={() => fillForm(item.userId)}
                    >
                      <i className="fa-regular fa-pen-to-square text-blue-900"></i>
                    </button>
                    <button
                      className="dlt-btn edit-btn hover h-12 "
                      onClick={() => OpenModal()}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                      {/* {showModal && <DeleteModalStaff email={item.email} setShowModal={setShowModal} showModal={showModal} />} */}
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <form
          className="create_staff-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <label>
            User Name:
            <input
              type="text"
              name="userName"
              value={staffInfo.userName}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={staffInfo.password}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>

          <div className="create_name_container">
            <label className="create_firstname_input">
              First Name: <br />
              <input
                type="text"
                name="firstName"
                value={staffInfo.firstName}
                onChange={handleChange}
              />
            </label>

            <label className="create_lastname_input">
              Last Name:
              <br />
              <input
                className="create_firstname_input"
                type="text"
                name="lastName"
                value={staffInfo.lastName}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={staffInfo.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={staffInfo.phoneNumber}
              onChange={handleChange}
            />
          </label>

          <div className="create_gender_photo w-100">
            <label className="create_gender">
              Gender: <br />
              <select
                name="gender"
                value={staffInfo.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div className="flex gap-5 mt-20 justify-center items-center">
            {editMode ? (
              <div className="">
                <button
                  type="submit"
                  className="border border-gray-300 w-32 py-1 rounded-lg text-lg bg-blue-900 text-white"
                  disabled={submitDisabled}
                  onClick={() => updateStaff()}
                  style={{
                    opacity: submitDisabled ? 0.5 : 1,
                    cursor: submitDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="">
                <button
                  type="submit"
                  className="border border-gray-300 w-32 py-1 rounded
                  -lg text-lg bg-blue-900 text-white"
                  disabled={submitDisabled}
                  onClick={handleSubmit}
                  style={{
                    opacity: submitDisabled ? 0.5 : 1,
                    cursor: submitDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  Create
                </button>
              </div>
            )}
            <div className="">
              <button
                type="button"
                className="bg-white border border-gray-300 w-32 py-1 rounded-lg text-lg"
                onClick={clearFields}
                style={{
                  opacity: submitDisabled ? 0.5 : 1,
                  cursor: submitDisabled ? "not-allowed" : "pointer",
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SuperAdmin;
