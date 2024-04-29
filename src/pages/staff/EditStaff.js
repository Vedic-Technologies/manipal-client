// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// import { BiSolidEditAlt } from "react-icons/bi";
// import { MdDeleteForever } from "react-icons/md";
// import { MdDelete } from "react-icons/md";

// const Edit_Staffs = () => {
//   const [showModal, setShowModal] = useState(false);
//   const OpenModal = () => {
//     setShowModal(!showModal);
//   }

//   const [staffInfo, setStaffInfo] = useState({
//     userName: '',
//     password: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     gender: 'male',
//     userType: 'admin',
//     phoneNumber: null,
//   });
//   const [staffs, setStaffs] = useState([]);
//   const [submitDisabled, setSubmitDisabled] = useState(true);

//   useEffect(() => {
//     getStaffs();
//     setSubmitDisabled(!(
//       staffInfo.userName &&
//       staffInfo.password &&
//       staffInfo.firstName &&
//       staffInfo.lastName &&
//       staffInfo.email &&
//       staffInfo.gender
//     ));
//   }, [staffInfo])

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStaffInfo((prevInfo) => ({
//       ...prevInfo,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('https://worldtestapi.azurewebsites.net/api/User', {
//         "userName": staffInfo.userName,
//         "password": staffInfo.password,
//         "firstName": staffInfo.firstName,
//         "lastName": staffInfo.lastName,
//         "email": staffInfo.email,
//         "gender": staffInfo.gender,
//         "userType": "staff",
//         "isActive": true,
//       })
//       getStaffs();
//       setStaffInfo({
//         userName: '',
//         password: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         gender: 'male',
//         userType: 'admin',
//         phoneNumber: null,
//       });
//     } catch (err) {
//       console.error("createStaff :: Error :: ", err);
//     }
//   };

//   const getStaffs = () => {
//     axios.get('https://worldtestapi.azurewebsites.net/api/User')
//       .then((response) => {
//         setStaffs(response.data.filter(item => item.userType === "staff"));
//       })
//       .catch((error) => {
//         console.error("Error fetching staffs: ", error);
//       });
//   };

//   const OpenEditButton = () => {
//     setmargin(margin === '20px auto'? '20px' : '20px auto' )
//   }

//   return (
//     <>
//       <div className='edit_staff_container'>
//         <div className="edit_staff_creation_info" style={{ width: '70%', margin: '20px auto' }}>
//           <div className="edit_staff_list">Edit staff List</div>
//           {staffs.map((item, index) => (
//             <div key={index} className='edit_each_staff_info'>
//               <div className='edit_staff_images'>
//                 {/* <img className="edit_staff_profile-picture" src={bird} alt="Profile" /> */}
//               </div>
//               <div className="edit_staff_name_and_email">
//                 <div className='edit_staff_name'>{item.firstName} {item.lastName}</div>
//                 <div className='edit_staff_email'>{item.email}</div>
//               </div>
//               <div className='edit_staff_number'>6201880006</div>
//               <div className=' edit_staff_btn '>
//                 <button className="edit-btn hover" onClick={() => OpenEditButton()}><BiSolidEditAlt /></button>
//                 <button className="dlt-btn edit-btn hover" onClick={() => OpenModal()}>
//                   <MdDeleteForever /> {showModal && <MdDelete />}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <form className="edit_staff-form" onSubmit={handleSubmit} style={{ transform: 'translateX(-300px)' }}>
//           <label>User Name:</label>
//           <input type="text" name="userName" value={staffInfo.userName} onChange={handleChange} required />
//           <label>Password:</label>
//           <input type="password" name="password" value={staffInfo.password} onChange={handleChange} required />
//           <div className="edit_name_container">
//             <label>First Name:</label>
//             <input type="text" name="firstName" value={staffInfo.firstName} onChange={handleChange} required />
//             <label>Last Name:</label>
//             <input type="text" name="lastName" value={staffInfo.lastName} onChange={handleChange} required />
//           </div>
//           <label>Email:</label>
//           <input type="email" name="email" value={staffInfo.email} onChange={handleChange} required />
//           <label>Phone Number:</label>
//           <input type="email" name="email" value={staffInfo.email} onChange={handleChange} required />
//           <div className="edit_gender_photo">
//             <label>Gender:</label>
//             <select name="gender" value={staffInfo.gender} onChange={handleChange}>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//             <label>Add Photo:</label>
//             <input type="file" name="" id="" />
//           </div>
//           <div className='flex center'>
//             <button type="submit" className='edit_submit_button' disabled={submitDisabled}>Save</button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Edit_Staffs;


import React, { useEffect, useState } from 'react';
import './editstaffs.css'
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { MdDelete } from "react-icons/md";
// import axios from 'axios';
// import bird from '../images/nitish.png';


// StaffForm.js

const Edit_Staffs = () => {
  // const [showModal, setShowModal] = useState(false);
  // const OpenModal = () => {
  //   setShowModal(!showModal);
// }

  // const [staffInfo, setStaffInfo] = useState({
  //   userName: '',
  //   password: '',
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   gender: 'male',
  //   userType: 'admin',
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
  //       phoneNumber: null,
  //     });
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

  // const [margin,setmargin] = useState('20px auto')
  // const [Trans,setTrans] = useState('translateX(-300px)')


  // const OpenEditButton = () => {
  //   setmargin(margin === '20px auto'? '20px' : '20px auto' )
  //   // setTrans(Trans === 'none'? 'translateX(-500px)' : 'none' )
  //   console.log(margin)
  //   console.log(Trans)

  //   // return{ margin: margin, trans: Trans}

  // }



 

  return (
    <>

      <div className='edit_staff_container'>


        <div className="edit_staff_creation_info" >
          <div className="edit_staff_list">Edit staff List</div>
    
        
               <div  className='edit_each_staff_info'>
                  <div className='edit_staff_images'>  </div>
                  <div className="edit_staff_name_and_email">
                    <div className='edit_staff_name'> Sonu </div>
                    <div className='edit_staff_email'> sonu@123gmail.com</div>
                  </div>
                  <div className='edit_staff_number'>6201880006 </div>
                  <div className=' edit_staff_btn '>
                                    <button class="edit-btn hover "  ></button>
                                    <button class="dlt-btn edit-btn hover " ></button>
                                </div>
                </div>
           
      
        </div>


        <form className="edit_staff-form"  >
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

          <div className="edit_name_container">

            <label className='edit_firstname_input' >
              First Name: <br />
              <input

                type="text"
                name="firstName"
                // value={staffInfo.firstName}
                // onChange={handleChange}
                required
              />

            </label>

            <label className='edit_lastname_input'>
              Last Name:<br />
              <input
                className='edit_firstname_input'
                type="text"
                name="lastName"
                // value={staffInfo.lastName}
                // onChange={handleChange}
                required
              />
            </label>
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
              type="email"
              name="email"
              // value={staffInfo.email}
              // onChange={handleChange}
              required
            />
          </label>

          <div className="edit_gender_photo">

            <label className='edit_gender'>
              Gender: <br />
              <select name="gender" >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className='edit_add_photo'>
              Add Photo: <br />
              <input type="file" name="" id="" />
            </label>

          </div>

          <div className='flex center'><button
            type="submit"
            className='edit_submit_button'
            
            
           
          >Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit_Staffs;


