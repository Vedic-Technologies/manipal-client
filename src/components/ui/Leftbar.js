// Inside Leftbar.js
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./leftbar.css";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { RxDoubleArrowRight } from "react-icons/rx";
import { FcSelfServiceKiosk } from "react-icons/fc";
import { FaCcAmazonPay } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FcCollaboration } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { FaBookMedical } from "react-icons/fa";
import { VscPersonAdd } from "react-icons/vsc";
import { FcEditImage } from "react-icons/fc";
import { ImExit } from "react-icons/im";

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
                <RxDoubleArrowRight />
              ) : (
                <RxDoubleArrowLeft />
              )}

          </div>


          <ul>
         

            <NavLink
              to="."
              className={`link ${activeLink === "." ? "active-link" : ""}  ${ (activeLink === "default" ) && "active-link"  }` }
              onClick={() => handleLinkClick(".")}
            >  <li>
              <FcSelfServiceKiosk />
                <div className={hidden} >Dashboard</div>
              </li>
            </NavLink>
            <NavLink
              to="prescription"
              className={`link ${activeLink === "prescription" ? "active-link" : ""}`}
              onClick={() => handleLinkClick("prescription")}
            >  <li>
               <FaPrescriptionBottleMedical className="text-cyan-400" />
                <div className={hidden} >Prescription</div>
              </li>
            </NavLink>

            <NavLink
              to="editquestions"
              className={`link ${activeLink === "editquestions" ? "active-link" : ""}`}
              onClick={() => handleLinkClick("editquestions")}
            >  <li>
            <FaCcAmazonPay  className="text-blue-400" />
                <div className={hidden} >Payment Entry</div>
              </li>
            </NavLink>
            <NavLink
              to="editquestions"
              className={`link ${activeLink === "editquestions" ? "active-link" : ""}`}
              onClick={() => handleLinkClick("editquestions")}
            >  <li>
                  <FaBed    className="text-red-500"  />
                <div className={hidden} >Patients</div>
              </li>
            </NavLink>


            
            <NavLink
              to="doctor_reference"
              className={`link ${activeLink === "doctor_reference" ? "active-link" : ""}`}
              onClick={() => handleLinkClick("createquestions")}
            >  <li>
           <FcCollaboration />
                <div className={hidden} >Dr Reference</div>
              </li>
            </NavLink>

            <NavLink
              to="createtest"
              className={`link ${activeLink === "createtest" ? "active-link" : ""}`}
              onClick={() => handleLinkClick("createtest")}
            >  <li>
                    <FcBullish /> 
                <div className={hidden} >Monthly Income</div>
              </li>
            </NavLink>

            <NavLink
              to="createtest"
              className={`link ${activeLink === "createtest" ? "active-link" : ""}`}
              onClick={() => handleLinkClick("createtest")}
            >  <li>
              <FaBookMedical   className="text-cyan-600" />
                <div className={hidden} >Patient Reacord</div>        
              </li>
            </NavLink>

            {"admin" === "admin" && (
              <>
                <NavLink
                  to="createstaff"
                  className={`link ${activeLink === "createstaff" ? "active-link" : ""}`}
                  onClick={() => handleLinkClick("createstaff")}>
                  <li>
                  <VscPersonAdd className="text-blue-500"  />
                    <div className={hidden} >Create Staff</div>
                  </li>
                </NavLink>


                <NavLink
                  to="editstaffs"
                  className={`link ${activeLink === "editstaffs" ? "active-link" : ""}`}
                  onClick={() => handleLinkClick("editstaffs")}>
                  <li>
                  <FcEditImage  />
                    <div className={hidden} >Edit Staff</div>
                  </li>
                </NavLink>
              </>
            )}


           
            <div
              className={`link ${activeLink === "logout" ? "active-link" : ""}`}
              onClick={() => logout()}
            > <li>
              <ImExit  className="text-red-700" />
                <div className={hidden} >Logout</div>
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
            {/* Default content when no nested route is matched */}
          </Outlet>
        )}
      </div>
    </div>
  );
};

export default Leftbar;
