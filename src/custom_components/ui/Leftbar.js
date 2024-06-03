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
import { GiMoneyStack } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { PiWheelchair } from "react-icons/pi";
import { MdOutlineElderlyWoman } from "react-icons/md";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";

const Leftbar = ({ children }) => {
  const [loggedInUserType, setloggedInUserType] = useState({});
  const [activeLink, setActiveLink] = useState(localStorage.getItem("activeLink") || "default");

  useEffect(() => {
    const currentUserString = localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUserData = JSON.parse(currentUserString);
      setloggedInUserType(currentUserData.user.userType); // Access userType from nested user object
      console.log(currentUserData.user.userType);
    }
  }, []);
  const navigate = useNavigate();
  const [Open, setOpen] = useState(false);

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
    localStorage.setItem("activeLink", path);
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
    localStorage.removeItem("activeLink");
    // localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="cpanel-container">
      <div
        className={` px-10 ${Open ? "hideSidebar" : "showSidebar "} ${
          innerWidth < 800 ? "hideSidebar" : "showSidebar"
        } `}
      ></div>
      <div
        className={`leftbar fixed  bg-gradient-to-l from-neutral-100 to-blue-100`} // issue-overflow-y-auto hides the navButtons
      >
        <div className=" m-2 relative overflow-hidden h-20 bg-lue-700">
          <div className="  w-full overflow-hidden absolute pl-1 text-5xl text-nowrap font-bold bg-gradient-to-r  from-blue-600 to-indigo-900 bg-clip-text text-transparent">
            <span className="">M</span>anipal
          </div>
        </div>

        <nav>
        <div className="center drawer z-50" onClick={handleDrawerClick}>
      {isSidebarCollapsed ? (
        <i className="fa-solid fa-circle-chevron-right select-none icon-transition rotate-right"></i>
      ) : (
        <i className="fa-solid fa-circle-chevron-right select-none icon-transition rotate-left"></i>
      )}
    </div>

          <ul className="mt-2">
            {loggedInUserType === "admin" && (
              <NavLink
                to="."
                className={`link flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer border border-transparent  ${
                  activeLink === "."
                    ? "active-link  text-black  "
                    : "hover: hover:bg-gray-200"
                }  ${activeLink === "default" && "active-link  text-white "}`}
                onClick={() => handleLinkClick(".")}
              >
                <li className="">
                  <RxDashboard className="text-2xl" />
                  <div className={` ${hidden}  `}>
                    <span className="font-roboto text-lg  ml-3">Dashboard</span>
                  </div>
                </li>
              </NavLink>
            )}

            {/* ......... staff Prescription......... */}

            {loggedInUserType === "staff" && (
              <NavLink
                to="prescription"
                className={`link  flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer border border-transparent  ${
                  activeLink === "prescription"
                    ? "active-link  text-black  "
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleLinkClick("prescription")}
              >
                <li className="">
                  <BsPrescription2 className="text-2xl" />
                  <div className={hidden}>
                    <span className=" font-roboto  text-lg ml-3">
                      Prescription
                    </span>
                  </div>
                </li>
              </NavLink>
            )}

            {/* ..........Doctor presCription......... */}
            {loggedInUserType === "admin" && (
              <NavLink
                to="doctor_prescription"
                className={`link  flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer border border-transparent  ${
                  activeLink === "doctor_prescription"
                    ? "active-link  text-black  "
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleLinkClick("doctor_prescription")}
              >
                <li className="">
                  <BsPrescription2 className="text-2xl" />
                  <div className={hidden}>
                    <span className=" font-roboto  text-lg ml-3">
                      Prescription
                    </span>
                  </div>
                </li>
              </NavLink>
            )}
            {/* ----------------payment drop down---------- */}

            <li style={{ padding: 0 }}>
              <div className="">
                <div
                  className={`link flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer  border border-transparent ${
                    activeLink === "payment" ||
                    activeLink === "payment_entry" ||
                    activeLink === "payment_detail"
                      ? "active-link  text-black  "
                      : "hover:bg-gray-200"
                  }`}
                  onClick={handleIsPayment}
                >
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
                      className="overflow-hidden  p-1  rounded h-28 w-[96%] flex flex-col items-end "
                    >
                      <NavLink
                        to="payment_entry "
                        className={`drop-down flex w-[90%] rounded border border-transparent ${
                          activeLink === "payment_entry"
                            ? "active-link-drop-down  text-black"
                            : "hover:bg-gray-200"
                        }`}
                        onClick={() => handleLinkClick("payment_entry")}
                      >
                        <div className="w-full flex  items-center pl-[16px] py-[10px]">
                          <GiMoneyStack className="text-3xl" />
                          <div
                            className={` ${hidden} h-full flex items-center `}
                          >
                            <span className=" font-roboto  text-base ml-1  ">
                              Payment Entry
                            </span>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink
                        to="payment_detail"
                        className={`drop-down mt-1  flex w-[90%] rounded border border-transparent ${
                          activeLink === "payment_detail"
                            ? "active-link-drop-down    text-black"
                            : "hover:bg-gray-200"
                        }`}
                        onClick={() => handleLinkClick("payment_detail")}
                      >
                        <div className="w-full flex items-center  pl-[16px] py-[10px]">
                          <GrMoney/>
                          {/* <i className="fa-solid fa-indian-rupee-sign text-xl  "></i> */}
                          <div
                            className={`${hidden} h-full flex items-center  `}
                          >
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
                    activeLink === "patient" ||
                    activeLink === "patient_details" ||
                    activeLink === "all_patients"
                      ? "active-link  text-black  "
                      : "hover:bg-gray-200"
                  }`}
                  onClick={handleIsPatient}
                >
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
                      className="overflow-hidden p-1 rounded h-28 w-[96%] flex flex-col  items-end"
                    >
                      <NavLink
                        to="patient_details/0"
                        className={`drop-down flex w-[90%]  rounded border border-transparent  ${
                          activeLink === "patient_details"
                            ? "active-link-drop-down  text-black"
                            : "hover:bg-gray-200"
                        }`}
                        onClick={() => handleLinkClick("patient_details")}
                      >
                        <div className="w-full flex items-center  pl-[16px] py-[10px]">
                          <PiWheelchair className="text-3xl" />
                          <div
                            className={` ${hidden} h-full flex items-center`}
                          >
                            <span className=" font-roboto  text-base ml-1">
                              Patient Details
                            </span>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink
                        to="all_patients"
                        className={`drop-down  mt-1  flex w-[90%]  rounded  border border-transparent ${
                          activeLink === "all_patients"
                            ? "active-link-drop-down  text-black"
                            : "hover:bg-gray-200"
                        }`}
                        onClick={() => handleLinkClick("all_patients")}
                      >
                        <div className="w-full flex items-center  pl-[16px] py-[10px]">
                          <MdOutlineElderlyWoman className="text-3xl " />
                          <div
                            className={` ${hidden} h-full flex items-center`}
                          >
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
                activeLink === "doctor_reference"
                  ? "active-link  text-black  "
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleLinkClick("doctor_reference")}
            >
              <li className="">
                <FaUserDoctor className="text-2xl" />
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
                activeLink === "MonthlyIncExp"
                  ? "active-link text-black"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleLinkClick("MonthlyIncExp")}
            >
              <li className="">
                <MdOutlineAccountBalanceWallet className="text-2xl" />
                <div className={hidden}>
                  <span className=" font-roboto  text-lg ml-3 ">
                    PassBook
                  </span>
                </div>
              </li>
            </NavLink>

            {loggedInUserType === "admin" && (
              <>
                <NavLink
                  to="createstaff"
                  className={`link flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer border border-transparent  ${
                    activeLink === "createstaff"
                      ? "active-link text-black after: "
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleLinkClick("createstaff")}
                >
                  <li className="">
                    <FaUserPlus className="text-2xl" />
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
                    activeLink === "editstaffs"
                      ? "active-link  text-black  "
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleLinkClick("editstaffs")}
                >
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
              className={`link  flex text-nowrap text-ellipsis overflow-hidden rounded mb-1.5 cursor-pointer border border-transparent  ${
                activeLink === "logout"
                  ? "active-link  text-black  "
                  : "hover:bg-gray-200"
              }`}
              onClick={() => logout()}
            >
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
