import React, { useEffect, useState } from "react";
import user_logo_1 from '../assets/logoes/user.png'
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { BiTerminal } from "react-icons/bi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const [loggedInUserType, setLoggedInUserType] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const currentUserstring = localStorage.getItem("currentUser");
    if (currentUserstring) {
      const currentUserData = JSON.parse(currentUserstring);
      const fullName = `${currentUserData?.user?.firstName?.charAt(0)?.toUpperCase() + currentUserData?.user?.firstName?.slice(1) || ""} ${currentUserData?.user?.lastName?.charAt(0).toUpperCase() + currentUserData?.user?.lastName?.slice(1) || ""}`
      setLoggedInUserType(fullName);
    }
  }, []);

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Failed to enter fullscreen", err);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = () => {
    // removeCookie('userType');
    // setLoginStatus(null);
    localStorage.removeItem("activeLink");
    // localStorage.removeItem("currentUser");
    navigate("/");
  };
  return (
    <>
      <div>
        <nav className="flex pr-10 justify-end gap-3 h-14 shadow-sm text-xl items-center relative">
          <div className="flex gap-3 items-center">
            <div onClick={handleFullScreen}>
              {isFullScreen ? <i className="fa-solid fa-compress cursor-pointer"></i> : <i className="fa-solid fa-expand cursor-pointer"></i>}
            </div>
            <div className="bg-white w-10 h-10 rounded-full center relative">
              <i className="fa-regular fa-bell"></i>
              <div className="absolute bg-red-500 w-2 h-2 rounded-full top-1 right-2"></div>
            </div>
            <div className="center gap-2">
              <div>{loggedInUserType}</div>
              <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center relative">
                <img
                  src={user_logo_1}
                  alt="user"
                  className="cursor-pointer"
                  onClick={toggleDropdown}
                />
                {showDropdown && (
                  <div className="absolute mt-44 right-0 mt-2 w-38 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <button className="w-full flex  items-center gap-2 px-4 py-2 hover:bg-gray-100"><i class="fa-regular fa-user"></i>Profile</button>
                    <button className="w-full  flex items-center gap-2 px-4 py-2 hover:bg-gray-100"><i class="fa-solid fa-gear"></i>Settings </button>
                    <button onClick={() => logout()} className="w-full  flex   items-center gap-2 px-4 py-2 hover:bg-gray-100"><i class="fa-solid fa-right-from-bracket"></i>Logout</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
      {showAlert && (
        <div className="absolute top-4 right-40 z-50" onBlur={() => setShowAlert(!showAlert)}>
          <Alert>
            <BiTerminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              This functionality is not implemented yet.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};

export default NavBar;
