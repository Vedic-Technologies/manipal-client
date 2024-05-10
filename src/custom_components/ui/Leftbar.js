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
        className={`leftbar fixed  bg-gradient-to-l from-neutral-50 to-blue-100`}>
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
              className={`link flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer border border-transparent  ${activeLink === "." ? "active-link  text-white  " : "hover: hover:border-blue-600"}  ${
                activeLink === "default" && "active-link  text-white "
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
              className={`link  flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer border border-transparent  ${
                activeLink === "prescription" ? "active-link  text-white  " : "hover:border-blue-600"
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
                  className={`link flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer  border border-transparent ${
                    activeLink === "payment" ||
                    activeLink === "payment_entry" ||
                    activeLink === "payment_detail"
                      ? "active-link  text-white  "
                      : "hover:border-blue-600"
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
                          <i className={`fa-solid fa-chevron-up`}></i>
                        ) : (
                          <i className={`fa-solid fa-angle-right`}></i>
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
                      }}
                      className="overflow-hidden  p-1  rounded h-28 w-[96%] flex flex-col items-end ">
                      <NavLink
                        to="payment_entry "
                        className={`drop-down flex w-4/5 rounded border border-transparent ${
                          activeLink === "payment_entry"
                            ? "active-link-drop-down  text-white"
                            : "hover:border-blue-500"
                        }`}
                        onClick={() => handleLinkClick("payment_entry")}>
                        <div className="w-full flex items-center px-[20px] py-[10px]">
                          <MdOutlinePayment className="text-base" />
                          <div className={` ${hidden} h-full flex items-center `}>
                            <span className=" font-roboto  text-base ml-1  ">
                              Payment Entry
                            </span>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink
                        to="payment_detail"
                        className={`drop-down mt-1  flex w-4/5 rounded border border-transparent ${
                          activeLink === "payment_detail"
                            ? "active-link-drop-down    text-white"
                            : "hover:border-blue-500"
                        }`}
                        onClick={() => handleLinkClick("payment_detail")}>
                        <div className="w-full flex items-center  px-[20px] py-[10px]">
                          <i className="fa-solid fa-indian-rupee-sign text-sm  "></i>
                          <div className={`${hidden} h-full flex items-center  `}>
                            <span className=" font-roboto  text-base ml-1 ">
                              Payment Detail
                            </span>
                          </div>
                        </div>
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
                  className={`link flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer border border-transparent   ${
                    activeLink === "patient" || activeLink === "patient_details" || activeLink === "all_patients"
                      ? "active-link  text-white  "
                      : "hover:border-blue-600"
                  }`}
                  onClick={handleIsPatient}>
                  <div className="center  px-[20px] py-[10px] ">
                    <FaBed className="text-2xl" />
                    <div className={`${hidden} relative`}>
                      <span className=" font-roboto  text-lg ml-3 ">
                        Patient
                      </span>
                      <div className="absolute top-0.5 right-1">
                        {isPatient ? (
                          <i className={`fa-solid fa-chevron-up`}></i>
                        ) : (
                          <i className={`fa-solid fa-angle-right `}></i>
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
                      }}
                      className="overflow-hidden p-1 rounded h-28 w-[96%] flex flex-col  items-end">
                        <NavLink
                        to="patient_details"
                        className={`drop-down flex w-4/5  rounded border border-transparent  ${
                          activeLink === "patient_details"
                            ? "active-link-drop-down  text-white"
                            : "hover:border-blue-500"
                        }`}
                        onClick={() => handleLinkClick("patient_details")}>
                        <div className="w-full flex items-center  px-[20px] py-[10px]">
                          <FaBed className="text-base" />
                          <div className={` ${hidden} h-full flex items-center`}>
                            <span className=" font-roboto  text-base ml-1">
                              Patient Details
                            </span>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink
                        to="all_patients"
                        className={`drop-down  mt-1  flex w-4/5  rounded  border border-transparent ${
                          activeLink === "all_patients"
                            ? "active-link-drop-down  text-white"
                            : "hover:border-blue-500"
                        }`}
                        onClick={() => handleLinkClick("all_patients")}>
                        <div className="w-full flex items-center  px-[20px] py-[10px]">
                          <FaBed className="text-base " />
                          <div className={` ${hidden} h-full flex items-center`}>
                            <span className=" font-roboto  text-base ml-1 ">
                              All Patients
                            </span>
                          </div>
                        </div>
                      </NavLink>

                      
                    </motion.div>
                  </div>
                )}
              </div>
            </li>

            <NavLink
              to="doctor_reference"
              className={`link flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer border border-transparent  ${
                activeLink === "doctor_reference" ? "active-link  text-white  " : "hover:border-blue-600"
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
              className={`link flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer border border-transparent  ${
                activeLink === "MonthlyIncExp" ? "active-link text-white" : "hover:border-blue-600"
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
                  className={`link flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer border border-transparent  ${
                    activeLink === "createstaff" ? "active-link text-white after: " : "hover:border-blue-600"
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
                  className={`link  flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer border border-transparent ${
                    activeLink === "editstaffs" ? "active-link  text-white  " : "hover:border-blue-600"
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
              className={`link  flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer border border-transparent  ${activeLink === "logout" ? "active-link  text-white  " : "hover:border-red-600"}`}
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
