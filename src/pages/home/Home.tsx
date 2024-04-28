import Leftbar from "../../components/ui/Leftbar";
import { Routes, Route } from "react-router-dom";
import Patient from "../patient/Patient";
import LandingPage from "../landing/LandingPage";
import DoctorReference from "../doctor_reference/DoctorReference";
import PresCription from "../prescription/PresCription";
import MonthlyIncExp from "../monthly_income/MonthlyIncExp";
import Create_Staff from "../staff/Create_Staff";
import Edit_Staff from "../staff/Edit_Staff";

const Home = () => {
  return (
    <div className="cpanel-container">
      <Leftbar>
       
     <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/patients" element={<Patient />} />
        <Route path="/doctor_reference" element={<DoctorReference />} />
        <Route path="/prescription" element={<PresCription />} />
        <Route path="/MonthlyIncExp" element={<MonthlyIncExp/>} />
        <Route path="/createstaff" element={<Create_Staff/>} />
        <Route path="/editstaffs" element={<Edit_Staff/>} />

        </Routes>
       
      </Leftbar>
    </div>
  )
}

export default Home