// Inside Leftbar.js
import React, { useEffect, useState } from "react";
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
import useWindowSize from "@rooks/use-window-size";
import { motion } from "framer-motion";

const Leftbar = ({ children }) => {
  const navigate = useNavigate();
  const [Open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("default");
  const [hidden, setHidden] = useState("link_text");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  // const [, , removeCookie] = useCookies();
  // const { setLoginStatus, loginStatus } = useLoginContext();
  //payment drop down
  const [isPayment, setIsPayment] = useState(false);

  //patient dropdown
  const [isPatient, setIsPatient] = useState(false);

  const handleIsPayment = () => {
    setIsPayment(!isPayment);
    handleLinkClick("payment");
  };

  const handleIsPatient = () => {
    setIsPatient(!isPatient);
    handleLinkClick("patient");
  };
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleDrawerClick = () => {
    setOpen(!Open);
    console.log(!Open);
    setHidden(Open ? "link_text" : "hide ");
    setSidebarCollapsed((prevState) => !prevState);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prevState) => !prevState);
  };

  const { innerWidth } = useWindowSize();

  console.log(innerWidth);

  useEffect(() => {
    const handleResize = () => {
      if (innerWidth < 1300) {
        setOpen(true);
        setHidden("hide");
      } else {
        setOpen(false); // Close on larger screens (optional)
        setHidden("link_text");
      }
    };
    handleResize();
  }, [innerWidth]);
  const logout = () => {
    // removeCookie('userType');
    // setLoginStatus(null);
    navigate("/");
  };

  return (
    <div className="cpanel-container">
      <div
        className={` px-10 ${Open ? "hideSidebar" : "showSidebar "} ${
          innerWidth < 800 ? "hideSidebar" : "showSidebar"
        } `}></div>
      <div
        className={`leftbar fixed  bg-gradient-to-r from-neutral-50 to-blue-100`}>
        <div className=" m-2 relative overflow-hidden h-20 bg-lue-700">
          <div className="  w-full overflow-hidden absolute pl-1 text-5xl text-nowrap font-bold bg-gradient-to-r  from-blue-600 to-indigo-900 bg-clip-text text-transparent">
            <span className="">M</span>anipal
          </div>
        </div>

        <nav>
          <div
            className="center drawer bg-red-400 z-50"
            onClick={() => handleDrawerClick()}>
            {isSidebarCollapsed ? (
              // <RxDoubleArrowRight />
              <VscThreeBars />
            ) : (
              <RxDoubleArrowLeft />
            )}
          </div>

          <ul className="mt-2">
            <NavLink
              to="."
              className={`link ${activeLink === "." ? "active-link" : ""}  ${
                activeLink === "default" && "active-link"
              }`}
              onClick={() => handleLinkClick(".")}>
              <li className="">
                <RxDashboard className="text-2xl" />
                <div className={` ${hidden}  `}>
                  <span className="font-roboto text-lg  ml-3">Dashboard</span>
                </div>
              </li>
            </NavLink>
            <NavLink
              to="prescription"
              className={`link ${
                activeLink === "prescription" ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick("prescription")}>
              <li className="">
                <BsPrescription2 className="text-2xl" />
                <div className={hidden}>
                  <span className=" font-roboto  text-lg ml-3">
                    Prescription
                  </span>
                </div>
              </li>
            </NavLink>

            {/* ----------------payment drop down---------- */}

            <li style={{ padding: 0 }}>
              <div className="">
                <div
                  className={`link ${
                    activeLink === "payment" ||
                    activeLink === "payment_entry" ||
                    activeLink === "payment_detail"
                      ? "active-link"
                      : ""
                  }`}
                  onClick={handleIsPayment}>
                  <div className="center  px-[20px] py-[10px] ">
                    <MdOutlinePayment className="text-2xl" />
                    <div className={`${hidden} relative`}>
                      <span className=" font-roboto  text-lg ml-3 ">
                        Payment
                      </span>
                      <div className="absolute top-0.5 right-1">
                        {isPayment ? (
                          <i
                            className={`fa-solid fa-chevron-up  ${
                              activeLink === "payment" ? "fa-shake" : ""
                            }`}></i>
                        ) : (
                          <i
                            className={`fa-solid fa-angle-down  ${
                              activeLink === "payment" ? "fa-shake" : ""
                            }`}></i>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {isPayment && (
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ y: -200 }}
                      animate={{ y: 0 }}
                      transition={{
                        type: "keyframes",
                        ease: "easeInOut",
                        delay: 0.2,
                        duration: 0.4,
                      }}
                      className="bg-blue-100 overflow-hidden p-1 rounded h-28">
                      <NavLink
                        to="payment_entry "
                        className={`drop-down  flex w-4/5 rounded transition animate ${
                          activeLink === "payment_entry"
                            ? "active-link-drop-down   text-white"
                            : "hover:text-white"
                        }`}
                        onClick={() => handleLinkClick("payment_entry")}>
                        <li className=" w-fit  ">
                          <MdOutlinePayment className="text-base" />
                          <div className={hidden}>
                            <span className=" font-roboto  text-base ml-1 ">
                              Payment Entry
                            </span>
                          </div>
                        </li>
                      </NavLink>
                      <NavLink
                        to="payment_detail"
                        className={`drop-down mt-1  flex w-4/5 rounded ${
                          activeLink === "payment_detail"
                            ? "active-link-drop-down    text-white"
                            : "hover:text-white"
                        }`}
                        onClick={() => handleLinkClick("payment_detail")}>
                        <li className=" w-fit ">
                          <i className="fa-solid fa-indian-rupee-sign text-sm "></i>
                          <div className={hidden}>
                            <span className=" font-roboto  text-base ml-1 ">
                              Payment Detail
                            </span>
                          </div>
                        </li>
                      </NavLink>
                    </motion.div>
                  </div>
                )}
              </div>
            </li>

            {/* ----------------patient drop down---------- */}

            <li style={{ padding: 0 }}>
              <div className="">
                <div
                  className={`link ${
                    activeLink === "patient" || activeLink === "all_patients"
                      ? "active-link"
                      : ""
                  }`}
                  onClick={handleIsPatient}>
                  <div className="center  px-[20px] py-[10px] ">
                    <MdOutlinePayment className="text-2xl" />
                    <div className={`${hidden} relative`}>
                      <span className=" font-roboto  text-lg ml-3 ">
                        Patient
                      </span>
                      <div className="absolute top-0.5 right-1">
                        {isPatient ? (
                          <i
                            className={`fa-solid fa-chevron-up  ${
                              activeLink === "patient" ? "fa-shake" : ""
                            }`}></i>
                        ) : (
                          <i
                            className={`fa-solid fa-angle-down  ${
                              activeLink === "patient" ? "fa-shake" : ""
                            }`}></i>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {isPatient && (
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ y: -200 }}
                      animate={{ y: 0 }}
                      transition={{
                        type: "keyframes",
                        ease: "easeInOut",
                        delay: 0.2,
                        duration: 0.4,
                      }}
                      className="bg-blue-100 overflow-hidden p-1 rounded h-16">
                      <NavLink
                        to="all_patients"
                        className={`drop-down  flex w-4/5  rounded ${
                          activeLink === "patients"
                            ? "active-link-drop-down  text-white"
                            : "hover:text-white"
                        }`}
                        onClick={() => handleLinkClick("all_patients")}>
                        <li className="w-fit">
                          <FaBed className="text-base" />
                          <div className={hidden}>
                            <span className=" font-roboto  text-base ml-1 ">
                              Patients
                            </span>
                          </div>
                        </li>
                      </NavLink>

                      
                    </motion.div>
                  </div>
                )}
              </div>
            </li>

            <NavLink
              to="patient"
              className={`link ${
                activeLink === "patient" ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick("patient")}>
              <li className="">
                <FaBed className="text-2xl" />
                <div className={hidden}>
                  <span className=" font-roboto  text-lg ml-3 ">Patients</span>
                </div>
              </li>
            </NavLink>

            <NavLink
              to="doctor_reference"
              className={`link ${
                activeLink === "doctor_reference" ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick("doctor_reference")}>
              <li className="">
                <GoCrossReference className="text-2xl" />
                <div className={hidden}>
                  <span className=" font-roboto  text-lg ml-3 ">
                    Dr Reference
                  </span>
                </div>
              </li>
            </NavLink>

            <NavLink
              to="MonthlyIncExp"
              className={`link ${
                activeLink === "MonthlyIncExp" ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick("MonthlyIncExp")}>
              <li className="">
                <BiBarChart className="text-2xl" />
                <div className={hidden}>
                  <span className=" font-roboto  text-lg ml-3 ">
                    Monthly Income
                  </span>
                </div>
              </li>
            </NavLink>

            {"admin" === "admin" && (
              <>
                <NavLink
                  to="createstaff"
                  className={`link ${
                    activeLink === "createstaff" ? "active-link" : ""
                  }`}
                  onClick={() => handleLinkClick("createstaff")}>
                  <li className="">
                    <VscPersonAdd className="text-2xl" />
                    <div className={hidden}>
                      <span className=" font-roboto  text-lg  ml-3">
                        Create Staff
                      </span>
                    </div>
                  </li>
                </NavLink>

                <NavLink
                  to="editstaffs"
                  className={`link ${
                    activeLink === "editstaffs" ? "active-link" : ""
                  }`}
                  onClick={() => handleLinkClick("editstaffs")}>
                  <li className="">
                    <LiaUserEditSolid className="text-2xl" />
                    <div className={hidden}>
                      <span className=" font-roboto  text-lg  ml-3">
                        Edit Staff
                      </span>
                    </div>
                  </li>
                </NavLink>
              </>
            )}

            <div
              className={`link ${activeLink === "logout" ? "active-link" : ""}`}
              onClick={() => logout()}>
              <li className="">
                <ImExit className="text-2xl " />
                <div className={hidden}>
                  <span className=" font-roboto  text-lg ml-3">Logout</span>
                </div>
              </li>
            </div>
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="main-content">
        {/* Outlet for rendering nested routes */}
        {children || <Outlet>hello</Outlet>}
      </div>
    </div>
  );
};

export default Leftbar;
