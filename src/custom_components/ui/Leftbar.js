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

const Leftbar = ({ children }) => {
  const navigate = useNavigate();
  const [Open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("default");
  const [hidden, setHidden] = useState("link_text");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  // const [, , removeCookie] = useCookies();
  // const { setLoginStatus, loginStatus } = useLoginContext();

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
        } `}
      ></div>
      <div className={`leftbar fixed `}>
        <div className=" m-2 relative overflow-hidden h-20 bg-lue-700">
          <div className="  w-full overflow-hidden absolute text-center text-5xl text-nowrap font-bold font-serif ">
            <span className="text-red-500">M</span>anipal
          </div>
        </div>

        <nav>
          <div
            className="center drawer bg-red-400"
            onClick={() => handleDrawerClick()}
          >
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
              onClick={() => handleLinkClick(".")}
            >
              <li className="new">
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
              onClick={() => handleLinkClick("prescription")}
            >
              <li className="new">
                <BsPrescription2 className="text-2xl" />
                <div className={hidden}>
                  <span className=" font-roboto  text-lg ml-3">
                    Prescription
                  </span>
                </div>
              </li>
            </NavLink>

            <NavLink
              to="payment_entry"
              className={`link ${
                activeLink === "payment_entry" ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick("payment_entry")}
            >
              <li className="new">
                <MdOutlinePayment className="text-2xl" />
                <div className={hidden}>
                  <span className=" font-roboto  text-lg ml-3 ">
                    Payment Entry
                  </span>
                </div>
              </li>
            </NavLink>
            <NavLink
              to="patients"
              className={`link ${
                activeLink === "patients" ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick("patients")}
            >
              <li className="new">
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
              onClick={() => handleLinkClick("doctor_reference")}
            >
              <li className="new">
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
              onClick={() => handleLinkClick("MonthlyIncExp")}
            >
              <li className="new">
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
                  onClick={() => handleLinkClick("createstaff")}
                >
                  <li className="new">
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
                  onClick={() => handleLinkClick("editstaffs")}
                >
                  <li className="new">
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
              onClick={() => logout()}
            >
              <li className="new">
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
