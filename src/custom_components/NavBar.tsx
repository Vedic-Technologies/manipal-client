import React, { useState } from "react";
import user_logo from '../assets/images/user.png'
import user_logo_1 from '../assets/logoes/user.png'
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { BiTerminal } from "react-icons/bi";


const NavBar = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showAlert,setShowAlert] = useState(false)

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Faied to enter fullscreen", err)
      });
      setIsFullScreen(true)
    } else {
      document.exitFullscreen();
      setIsFullScreen(false)
    }
  }



  return (
    <>
    <div>
      <nav className=" flex pr-10 justify-end gap-3 h-14 shadow-sm text-xl items-center relative">
        <div className="flex gap-3 items-center">
          <div onClick={handleFullScreen}>
            {isFullScreen ? <i className="fa-solid fa-compress cursor-pointer"></i> : <i className="fa-solid fa-expand cursor-pointer"></i>}
          </div>
          <div className=" bg-white w-10 h-10 rounded-full center relative">
            <i className="fa-regular fa-bell "></i>
            <div className="absolute bg-red-500 w-2 h-2 rounded-full top-1 right-2"></div>
          </div>
          <div className="center gap-2">
          <div className="">Kislay  Kumar</div>
          <div className=" bg-gray-300 w-8 h-8 rounded-full center ">
           <img src={user_logo_1} alt="user" className="cursor-pointer"
           onClick={()=>{setShowAlert(!showAlert)}}
           />
          </div>
        
        
        
          </div>
        </div>
      </nav>
    </div>
    {showAlert && ( <div className=" absolute top-4 right-40 z-50" onBlur={()=>setShowAlert(!showAlert)}>
         <Alert>
  <BiTerminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    This Functionality is not implemented yet 
  </AlertDescription>
</Alert>
         </div>)}
    </>
  );
};

export default NavBar;
