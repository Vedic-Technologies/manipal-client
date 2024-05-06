import Leftbar from "../../custom_components/ui/Leftbar";
import { Routes, Route } from "react-router-dom";
import Patient from "../patient/Patient";
import LandingPage from "../landing/LandingPage";
import DoctorReference from "../doctor_reference/DoctorReference";
import PresCription from "../prescription/PresCription";
import MonthlyIncExp from "../monthly_income/MonthlyIncExp";
import EditStaff from "../staff/EditStaff";
import CreateStaff from "../staff/CreateStaff";
import PaymentEntry from "../payment/PaymentEntry";
import PresCriptionNew from "../prescription/PresCriptionNew";
import PresCriptionSadcn from "../prescription/PresCriptionSadcn";

const Home = () => {
  return (
    <div className="">
      <Leftbar>
       
     <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/patients" element={<Patient />} />
        <Route path="/doctor_reference" element={<DoctorReference />} />
        <Route path="/prescription" element={<PresCriptionSadcn />} />
        <Route path="/MonthlyIncExp" element={<MonthlyIncExp/>} />
        <Route path="/createstaff" element={<CreateStaff/>} />
        <Route path="/editstaffs" element={<EditStaff/>} />
        <Route path="/payment_entry" element={<PaymentEntry/>} />

        </Routes>
       
      </Leftbar>
    </div>
  )
}

export default Home