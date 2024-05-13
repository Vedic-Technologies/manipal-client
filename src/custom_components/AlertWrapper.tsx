import React from 'react';
import JobDoneAlert from './JobDoneAlert';

const AlertWrapper = ({ isOpen, children }) => {
  return (
    <div
      className={`fixed inset-0 z-10 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};

export default AlertWrapper;
