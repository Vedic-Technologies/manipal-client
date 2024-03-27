import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Prospin from "../../assets/images/image.png";
import manipal from "../../assets/images/manipal.png";
import center from "../../assets/images/center.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginBlock = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailerror, setEmailerror] = useState<String | null>(null);
  const navigate = useNavigate();

  const [apiData, setApiData] = useState([]);
  const [passVisibility, setPassVisibility] = useState(false);
  const [loading, setLoading] = useState(true);

  const [serverError, setServerError] = useState("");
  const [loder, setLoder] = useState(false);

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
    const data = await axios.get("http://localhost:8000/api/users");
    console.log(data.data);

    if (password.length < 8) {
      setError("password too short must be greater than 7 characters");
    } else if (password.length > 30) {
      setError("password too long must be less than 31 characters");
    } else if (!email.endsWith("@gmail.com")) {
      setEmailerror("invalid email");
    } else {
      try {
        // setLoder(true);

        const response = await axios.post(
          "http://localhost:8000/api/users/login",
          user_body
        );
        if (response.data) {
          navigate("/home");
        }
        // console.log(response.data.userType)
        // if(response.data.userType!=="admin" && response.data.userType!=="staff")
        // {
        //   console.log("first layer")
        //     if(response.data.isvalid===false)
        // {
        //   console.log("second layer")
        //   setError("Invalid username or passwordd");
        //   return;
        // }
        // }

        console.log(response.data);
        setApiData(response.data);
        // setLoginUserInfo(response.data)
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        setError(null);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 15); // 15 days from now
        if (response.data.userType === "student") {
          // setCookie('userType', "student", { expires: expiryDate });
          // setLoginStatus("student")
          // navigate("/testlandingpage");
        } else if (response.data.userType === "staff") {
          // setCookie('userType', "staff", { expires: expiryDate })
          // setLoginStatus("staff")
          // navigate("/cpanellanding")
        } else if (response.data.userType === "admin") {
          // setCookie('userType', "admin", { expires: expiryDate })
          // setLoginStatus("admin")
          // navigate("/cpanellanding")
        }
      } catch (error) {
        setLoder(false);
        setError("Invalid username or password please check");
        console.log(error);
        setServerError("Server is not online. Please try latter");
      }
    }
  };

  return (
    <div className=" relative  login_container">
      {/* <div className="mt-10 text-6xl text-red-500">Manipal</div>
      <div className="">Physiotherapy Center</div>
      <div className="login_title mb-2 mt-3 center ">Let's access your account</div>
      <div className="detail_line text-lg center">
        Please enter you email & password correctly
      </div> */}
      <div className=" flex  ">
        <div className="  ">
          <img className=" h-20 w-60 ml-6 mt-4" src={Prospin} alt="" />{" "}
        </div>
        <div className=" shadow-transparent  from-transparent border-[0.1px] border-black shadow-2xl backdrop-sepia-2 bg-white/20 ... h-[350px] w-[290px] rounded-lg absolute mt-[180px] ml-4 ">
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
                className=" border-2 border-black text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[225px] ml-5 p-2.5 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 px-3 py-[6px] bg-white"
                placeholder="Enter email address"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailerror(null);
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
                  type="password"
                  id="password"
                  ref={passRef}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  className="border-2 border-black text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[225px] ml-5 p-2.5 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 px-3 py-[6px] bg-white"
                  placeholder="Enter your password"
                  required
                />
                {passVisibility ? (
                  <div
                    className="absolute top-[50%] translate-y-[-50%] right-3 cursor-pointer scale-[1.5]"
                    onClick={nonVisiblePassword}
                  >
                    {/* <IoEye /> */}
                  </div>
                ) : (
                  <div
                    className="absolute top-[50%] translate-y-[-50%] right-3 cursor-pointer scale-[1.5]"
                    onClick={visiblePassword}
                  >
                    {/* <IoEyeOff /> */}
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

          <div className="flex flex-col items-center w-full">
            {!loder ? (
              <button
                onClick={() => verifyLogin()}
                className="bg-gray-700 pt-1 pb-2 px-20 text-white font-sans tracking-tight mb-3 rounded text-lg"
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

            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div className="mt-36 absolute">
            {" "}
            <img src={manipal} alt="" />{" "}
          </div>
          <div className=" w-[22rem]  mt-[13rem]">
            {" "}
            <img src={center} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBlock;
