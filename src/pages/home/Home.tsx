import Leftbar from "../../custom_components/ui/Leftbar";
import { Routes, Route } from "react-router-dom";
import AllPatients from "../patient/AllPatients";
import LandingPage from "../landing/LandingPage";
import DoctorReference from "../doctor_reference/DoctorReference";
import PresCription from "../prescription/PresCription";
import MonthlyIncExp from "../monthly_income/MonthlyIncExp";
import EditStaff from "../staff/EditStaff";
import CreateStaff from "../staff/CreateStaff";
import PaymentEntry from "../payment/PaymentEntry";
import PresCriptionNew from "../prescription/PresCriptionNew";
import PresCriptionSadcn from "../prescription/PatientFormStaff";
import PaymentDetails from "../payment/PaymentDetails";
import PatientPaymentsDetails from "../payments_details/PatientPaymentsDetails";
import PatientDetails from "../patient/PatientDetails";
import StaffSignup from "../staff/StaffSignup";
import UpdateStaff from "../staff/updatestaff";
import DoctorPrescription from "../prescription/DoctorPrescription";
import { useEffect, useState } from "react";

const Home = () => {
  const [loggedInUserType, setloggedInUserType] = useState({});

  useEffect(() => {
    const currentUserString = localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUserData = JSON.parse(currentUserString);
      setloggedInUserType(currentUserData.user.userType); // Access userType from nested user object
      console.log(currentUserData.user.userType);
    }
  }, []);
  return (
    <div className="">
      <Leftbar>
       
     <Routes>
      {loggedInUserType=== "admin" &&(
        <>
        <Route path='/' element={<LandingPage />} />
        {/* <Route path="/doctor_prescription" element={<DoctorPrescription />} /> */}
        <Route path="/createstaff" element={<StaffSignup/>} />
        <Route path="/editstaffs" element={<UpdateStaff/>} />
        <Route path="/MonthlyIncExp" element={<MonthlyIncExp/>} />
        <Route path="/doctor_reference" element={<DoctorReference />} />
        </>)}

        {loggedInUserType==="staff" &&(
        <Route path="/prescription" element={<PresCriptionSadcn />} />
      )}
           <Route path="/all_patients" element={<AllPatients />} />
        <Route path="/patient_details/:id" element={<PatientDetails />} />
        <Route path="/payment_entry" element={<PaymentEntry/>} />
        <Route path="/payment_detail" element={<PatientPaymentsDetails/>} />

        </Routes>
       
      </Leftbar>
    </div>
  )
}

export default Home