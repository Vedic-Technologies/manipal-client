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

const Home = () => {
  return (
    <div className="">
      <Leftbar>
       
     <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/all_patients" element={<AllPatients />} />
        <Route path="/patient_details/:id" element={<PatientDetails />} />
        <Route path="/doctor_reference" element={<DoctorReference />} />
        <Route path="/prescription" element={<PresCriptionSadcn />} />
        <Route path="/doctor_prescription" element={<DoctorPrescription />} />
        <Route path="/MonthlyIncExp" element={<MonthlyIncExp/>} />
        <Route path="/createstaff" element={<StaffSignup/>} />
        <Route path="/editstaffs" element={<UpdateStaff/>} />
        <Route path="/payment_entry" element={<PaymentEntry/>} />
        <Route path="/payment_detail" element={<PatientPaymentsDetails/>} />

        </Routes>
       
      </Leftbar>
    </div>
  )
}

export default Home