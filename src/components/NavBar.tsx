import React, { useState } from "react";
import user_logo from '../assets/images/user.png'


const NavBar = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

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
    <div>
      <nav className=" flex pr-10 justify-end gap-3 h-14 text-xl items-center ">
        <div className="flex gap-3 items-center">
          <div onClick={handleFullScreen}>
            {isFullScreen ? <i className="fa-solid fa-compress"></i> : <i className="fa-solid fa-expand"></i>}
          </div>
          <div className=" bg-white w-10 h-10 rounded-full center relative">
            <i className="fa-regular fa-bell "></i>
            <div className="absolute bg-red-500 w-2 h-2 rounded-full top-1 right-2"></div>
          </div>
          <div className="center gap-2">
          <div className="">Ashish  Kumar</div>
          <div className=" bg-gray-300 w-8 h-8 rounded-full center ">
           <img src={user_logo} alt="user" />
          </div>
         
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
