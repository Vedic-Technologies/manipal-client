import React from "react";
type ErrorPromptProps = {
    message: string | null;
    setServerError: (error:string | null) => void;
  };
const ErrorPrompt: React.FC<ErrorPromptProps> = ({ message ,setServerError}) => {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto ">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-red-500 px-4 py-5 sm:px-6 flex justify-between items-center">
            <div className="flex items-center">
            <i className="fa-solid fa-wifi mx-5 text-white "></i>
              <p className="text-white">{message}</p>
            </div>
            <div className="ml-4">
              <button
                className="bg-white rounded-md text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => {
                    setServerError(null);
                }}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPrompt;
