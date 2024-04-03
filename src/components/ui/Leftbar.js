// Inside Leftbar.js
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./leftbar.css";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { FaBed } from "react-icons/fa";
import { FaBookMedical } from "react-icons/fa";
import { VscPersonAdd } from "react-icons/vsc";
import { ImExit } from "react-icons/im";
import { VscThreeBars } from "react-icons/vsc";
import { RxDashboard } from "react-icons/rx";
import { BsPrescription2 } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { GoCrossReference } from "react-icons/go";
import { BiBarChart } from "react-icons/bi";
import { LiaUserEditSolid } from "react-icons/lia";



const Leftbar = ({ children }) => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("default");
  const [hidden, setHidden] = useState('link_text');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  // const [, , removeCookie] = useCookies();
  // const { setLoginStatus, loginStatus } = useLoginContext();
  const [w_margin, setw_margin] = useState('190px')

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleDrawerClick = () => {
    setHidden(hidden === "link_text" ? 'hide' : 'link_text')
    setSidebarCollapsed((prevState) => !prevState);
    setw_margin(w_margin === "190px" ? "100px" : "190px")
  }

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prevState) => !prevState);
  };

  const logout = () => {
    // removeCookie('userType');
    // setLoginStatus(null);
    navigate('/')
  }

  return (
    <div className="cpanel-container">
      {/* ------------- just for taking div space -------- */}
      <div className="leftbar mr-20 opacity-0">
        <ul>
          <div className={hidden}></div>
        </ul>
      </div>
      {/* --------------------------------------------- */}


      <div className="leftbar fixed">
        <nav>
          <div className="center drawer" onClick={() => handleDrawerClick()}>

            {isSidebarCollapsed ?
              (
                // <RxDoubleArrowRight />
                <VscThreeBars />
              ) : (
                <RxDoubleArrowLeft />
              )}

          </div>

          <ul>
         

            <NavLink
              to="."
              className={`link ${activeLink === "." ? "active-link" : ""}  ${ (activeLink === "default" ) && "active-link"  }` }
              onClick={() => handleLinkClick(".")}
             
            >  <li className="">
           <RxDashboard className="" />
                <div className={hidden} > <span className=" font-roboto font-semibold text-lg  ml-3" >Dashboard</span></div>
              </li>
            </NavLink>
            <NavLink
              to="prescription"
              className={`link ${activeLink === "prescription" ? "active-link" : ""}`}
              onClick={() => handleLinkClick("prescription")}
            >  <li>
           <BsPrescription2  className="" />
                <div className={hidden} ><span className=" font-roboto font-medium text-lg ml-3" >Prescription</span> </div>
              </li>
            </NavLink>

            <NavLink
              to="editquestions"
              className={`link ${activeLink === "editquestions" ? "active-link" : ""}`}
              onClick={() => handleLinkClick("editquestions")}
            >  <li>
            <MdOutlinePayment  className="" />
                <div className={hidden} ><span className=" font-roboto font-medium text-lg ml-3 " >Payment Entry</span></div>
              </li>
            </NavLink>
            <NavLink
              to="editquestions"
              className={`link ${activeLink === "editquestions" ? "active-link" : ""}`}
              onClick={() => handleLinkClick("editquestions")}
            >  <li>
                  <FaBed    className=""  />
                <div className={hidden} ><span className=" font-roboto font-medium text-lg ml-3 " >Patients</span></div>
              </li>
            </NavLink>


            
            <NavLink
              to="doctor_reference"
              className={`link ${activeLink === "doctor_reference" ? "active-link" : ""}`}
              onClick={() => handleLinkClick("createquestions")}
            >  <li>
           <GoCrossReference />
                <div className={hidden} ><span className=" font-roboto font-medium text-lg ml-3 " >Dr Reference</span></div>
              </li>
            </NavLink>

            <NavLink
              to="MonthlyIncExp"
              className={`link ${activeLink === "MonthlyIncExp" ? "active-link" : ""}`}
              onClick={() => handleLinkClick("MonthlyIncExp")}
            >  <li>
                   <BiBarChart /> 
                <div className={hidden} ><span className=" font-roboto font-medium text-lg ml-3 " >Monthly Income</span></div>
              </li>
            </NavLink>

            <NavLink
              to="createtest"
              className={`link ${activeLink === "createtest" ? "active-link" : ""}`}
              onClick={() => handleLinkClick("createtest")}
            >  <li>
              <FaBookMedical   className="" />
                <div className={hidden} ><span className=" font-roboto font-medium text-lg ml-3 " >Patient Reacord</span></div>        
              </li>
            </NavLink>

            {"admin" === "admin" && (
              <>
                <NavLink
                  to="createstaff"
                  className={`link ${activeLink === "createstaff" ? "active-link" : ""}`}
                  onClick={() => handleLinkClick("createstaff")}>
                  <li>
                  <VscPersonAdd className=""  />
                    <div className={hidden} ><span className=" font-roboto font-medium text-lg  ml-3" >Create Staff</span></div>
                  </li>
                </NavLink>


                <NavLink
                  to="editstaffs"
                  className={`link ${activeLink === "editstaffs" ? "active-link" : ""}`}
                  onClick={() => handleLinkClick("editstaffs")}>
                  <li>
                  <LiaUserEditSolid />
                    <div className={hidden} ><span className=" font-roboto font-medium text-lg  ml-3" >Edit Staff</span></div>
                  </li>
                </NavLink>
              </>
            )}


           
            <div
              className={`link ${activeLink === "logout" ? "active-link" : ""}`}
              onClick={() => logout()}
            > <li>
              <ImExit  className="text-red-700" />
                <div className={hidden} ><span className=" font-roboto font-medium text-lg  ml-3" >Logout</span></div>
              </li>
            </div>

          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="main-content">
        {/* Outlet for rendering nested routes */}
        {children || (
          <Outlet>
           hello
          </Outlet>
        )}
      </div>
    </div>
  );
};

export default Leftbar;
