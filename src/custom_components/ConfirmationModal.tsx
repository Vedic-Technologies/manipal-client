import React, { useRef, useEffect } from "react";

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, question }) => {
  const confirmButtonRef = useRef(null);


  useEffect(() => {
    if (isOpen && confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    }
  }, [isOpen]);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        onConfirm();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onConfirm]);

  if (!isOpen) return null;


  return (
    <div
      className={`fixed h-screen w-screen backdrop-blur-sm inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-20 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-md">
        <p className="mb-4">{question}</p>
        <div className="flex justify-center gap-2">
          <button
            onClick={onCancel}
            className="mr-4 bg-green-400 hover:bg-green-500 px-4 py-2 text-white rounded-md"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            ref={confirmButtonRef}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-md"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
