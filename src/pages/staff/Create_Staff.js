import React, { useEffect, useState } from 'react';
import './createstaff.css';
// StaffForm.js
const CreateStaff = () => {

  // const [staffInfo, setStaffInfo] = useState({
  //   userName: '',
  //   password: '',
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   gender: 'male',
  //   userType: 'staff',
  //   phoneNumber: null,
  // });
  // const [staffs, setStaffs] = useState([]);
  // const [submitDisabled, setSubmitDisabled] = useState(true);

  // useEffect(() => {
  //   getStaffs();
  //   if (staffInfo.userName && staffInfo.password && staffInfo.firstName && staffInfo.lastName && staffInfo.email && staffInfo.gender) {
  //     setSubmitDisabled(false);
  //     return;
  //   }
  //   setSubmitDisabled(true);
  // }, [staffInfo])

  // const handleChange = (e) => {
  //   console.log(staffInfo)
  //   const { name, value } = e.target;
  //   setStaffInfo((prevInfo) => ({
  //     ...prevInfo,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
   
  //   e.preventDefault();
  //   try {
  //     await axios.post('',
  //       {
  //         "userName": staffInfo.userName,
  //         "password": staffInfo.password,
  //         "firstName": staffInfo.firstName,
  //         "lastName": staffInfo.lastName,
  //         "email": staffInfo.email,
  //         "gender": staffInfo.gender,
  //         "userType": "staff",
  //         "phoneNumber" : staffInfo.phoneNumber,
  //         "isActive": true,
  //       })
  //     getStaffs();
  //     setStaffInfo({
  //       userName: '',
  //       password: '',
  //       firstName: '',
  //       lastName: '',
  //       email: '',
  //       gender: 'male',
  //       userType: 'admin',
  //       phoneNumber: '',
  //     });
  //     alert("staff created successfully !");
  //   } catch (err) {
  //     console.error("createStaff :: Error :: ", err);
  //   }
  // };

  // const getStaffs = () => {
  //   axios.get('')
  //     .then((response) => {
  //       response.data.map((item) => {
  //         setStaffs(response.data)
  //       })
  //     })
  // }
 

  return (
    <>

      <div className='create_staff_container'>


        <div className="create_staff_creation_info">
          <div className="create_staff_list">Staff List</div>
      
            
            
                <div className='create_each_staff_info'>
                  <div className='create_staff_images'></div>
                  <div className="create_staff_name_and_email">
                    <div className='create_staff_name'>  </div>
                    <div className='create_staff_email'>  </div>
                  </div>
                  <div className='create_staff_number'> </div>
                </div>
           
          
         
        </div>


        <form className="create_staff-form" >
          <label>
            User Name:
            <input
              type="text"
              name="userName"
              // value={staffInfo.userName}
              // onChange={handleChange}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              // value={staffInfo.password}
              // onChange={handleChange}
              required
            />
          </label>

          <div className="create_name_container">

            <label className='create_firstname_input' >
              First Name: <br />
              <input

                type="text"
                name="firstName"
                // value={staffInfo.firstName}
                // onChange={handleChange}
                required
              />

            </label>

            <lable className='create_lastname_input'>
              Last Name:<br />
              <input
                className='create_firstname_input'
                type="text"
                name="lastName"
                // value={staffInfo.lastName}
                // onChange={handleChange}
                required
              />
            </lable>
          </div>

          <label>
            Email:
            <input
              type="email"
              name="email"
              // value={staffInfo.email}
              // onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              // value={staffInfo.phoneNumber}
              // onChange={handleChange}
              required
            />
          </label>

          <div className="create_gender_photo w-100">

            <label className='create_gender'>
              Gender: <br />
              <select name="gender" >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>

            {/* <label className='create_add_photo'>
              Add Photo: <br />
              <input type="file" name="" id="" />
            </label> */}

          </div>

          <div className='w-100'><button
            type="submit"
            className='create_submit_button'
            // disabled={submitDisabled}
            // onClick={handleSubmit}
            // style={{ opacity: submitDisabled ? 0.5 : 1, cursor: submitDisabled ? 'not-allowed' : 'pointer' }}
          >Create Staff</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateStaff;


