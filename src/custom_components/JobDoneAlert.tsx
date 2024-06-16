import React, { useEffect, useRef } from "react";
import { Button } from "../components/ui/button";

const JobDoneAlert = ({
  height,
  width,
  bgColor,
  icon,
  textColor,
  message,
  isOpen,
  OnCancel,
  isCancelButton,
  boxShadow,
}) => {
  return (
    <div
      onClick={OnCancel}
      className={`center w-screen h-screen inset-0 z-10 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className={`center flex-col gap-3 ${height} ${width} ${bgColor} ${textColor} ${boxShadow} rounded p-1 px-2 relative`}
      >
        <div className="text-green-500 text-3xl">{icon}</div>
        <div className="text-center font-semibold">{message}</div>
        <div
          className={`bottom-2 m-auto ${isCancelButton ? "block" : "hidden"}`}
        >
          <Button
            variant="outline"
            className="center text-lg mb-2 text-black rounded-full"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDoneAlert;
