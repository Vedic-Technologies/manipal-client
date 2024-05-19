import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Prospin from "../../assets/images/image.png";
import manipal from "../../assets/images/manipal.png";
import center from "../../assets/images/center.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AxiosError } from 'axios';
import ErrorPrompt from "../../custom_components/ErrorPrompt";
import { BiSolidHide } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
const LoginBlock = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailerror, setEmailerror] = useState<String | null>(null);
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [passVisibility, setPassVisibility] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);

  const passRef = useRef<HTMLInputElement>(null);
  const visiblePassword = () => {
    passRef.current!.type = "text";
    setPassVisibility((prev) => !prev);
  };

  const nonVisiblePassword = () => {
    passRef.current!.type = "password";
    setPassVisibility((prev) => !prev);
  };

  type User = {
    email: string;
    password: string;
  };

  const user_body: User = {
    email: email,
    password: password,
  };

  const verifyLogin = async () => {
    // to see users
    // const data = await axios.get("http://localhost:8000/api/users");
    // console.log(data.data);
    // validation of user input
    if (password.length < 8) {
      setError("password too short must be greater than 7 characters");
    } else if (password.length > 30) {
      setError("password too long must be less than 31 characters");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailerror("Invalid email format. Please enter a valid email address.");
    } else {
      try {
        const response = await axios.post(
          "https://manipal-server.onrender.com/api/users/login",
          user_body
        );

        if (response.data) {
          navigate("/home");
        }
        console.log(response.data);
        setApiData(response.data);
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        setError(null);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 15); // 15 days from now
        if (response.data.userType === "student") {
          // Handle student login
        } else if (response.data.userType === "staff") {
          // Handle staff login
        } else if (response.data.userType === "admin") {
          // Handle admin login
        }
      } catch (error: any) {
        setError("username password error . Please check again")
        setLoader(false);
        console.log(error);
        if (error.isAxiosError && error.response === undefined) {
          // Network error
          setServerError("Network Error: Please check your internet connection and try again. Start the local server");
          return;
        } else if (error.response) {
          // Server responded with a non-2xx status code
          // setServerError("Server Error: " + error.response.status + " " + error.response.statusText);
          return;
        } else {
          // Something else happened
          setServerError("An unexpected error occurred. Please try again later.");
          return;
        }

      }
    };
  }

  return (
    <>
      <div
        className="animated-background animated-border shadow-basic backdrop-blur-sm border-2 border-r-white border-b-white box h-[400px] w-[320px] rounded-lg relative shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]"
      >
        <div className="mt-8 ">
          <div className="mb-6 w-[90%] m-auto">
            <label
              htmlFor="email"
              className="block mb-1 ml-5 text-lg font-medium text-gray-900 dark:text-blue-900"
            >
              Email :-
            </label>
            <input
              type="email"
              id="email"
              className=" border-2 border-black  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[85%] ml-5 mt-3 p-2.5 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 px-3 py-[6px] bg-white"
              placeholder="Enter email address"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailerror(null);
                setError(null);

              }}
            />
            <div className="error flex justify-between">
              <div className="errpass text-sm text-red-700">{emailerror}</div>
            </div>
          </div>

          <div className="mb-6  w-[90%] m-auto">
            <label
              htmlFor="password"
              className="block mb-1 ml-5 text-lg font-medium text-gray-900 dark:text-blue-900"
            >
              Password:-
            </label>
            <div className="relative">
              <input
                type="text"
                id="password"
                ref={passRef}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                  setError(null)
                }}
                className="border-2 border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[85%] ml-5 mt-3 p-2.5 pr-7 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 px-3 py-[6px] bg-white"
                placeholder="Enter your password"
                required
              />
              {passVisibility ? (
                <div
                  className="absolute top-[50%] right-5 translate-y-[-50%] cursor-pointer text-gray-400 text-sm scale-[1.5]"
                  onClick={nonVisiblePassword}
                >
                  < IoMdEye className=" mr-2 " />
                </div>
              ) : (
                <div
                  className="absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer text-gray-400 text-sm scale-[1.5]"
                  onClick={visiblePassword}
                >
                  <BiSolidHide className=" mr-2 " />
                </div>
              )}
            </div>
            <div className="error flex justify-between">
              <div className="errpass text-sm text-red-700">{error}</div>
              <div className="text-right text-sm hover:text-blue-600">
                {/* <Link to="/">Forget Password?</Link> */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full absolute bottom-8">
          {!loader ? (
            <button
              onClick={() => verifyLogin()}
              className="bg-gray-700 pt-1 pb-2 px-16 text-white font-sans tracking-tight mb-3 rounded text-lg"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
              Log in
            </button>
          ) : (
            <button
              className="bg-[#50A150] pt-1 pb-2 px-10 text-white font-sans tracking-tight mb-3 rounded-[30px] text-lg"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Verifying...
            </button>
          )}
        </div>
      </div>
      {serverError && (<ErrorPrompt message={serverError} setServerError={setServerError} />)}

    </>
  );
};

export default LoginBlock;
