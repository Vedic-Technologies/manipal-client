import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import login_image from "../../assets/images/login/login_image.png";
import { useNavigate } from "react-router-dom";
import { BiSolidHide } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import ErrorPrompt from "../../custom_components/ErrorPrompt";

const LoginBlockNew = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);
  const [passVisibility, setPassVisibility] = useState(false);
  const navigate = useNavigate();
  const passRef = useRef<HTMLInputElement>(null);

  const visiblePassword = () => {
    passRef.current!.type = "text";
    setPassVisibility((prev) => !prev);
  };

  const nonVisiblePassword = () => {
    passRef.current!.type = "password";
    setPassVisibility((prev) => !prev);
  };

  const verifyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password too short, must be greater than 7 characters");
    } else if (password.length > 30) {
      setError("Password too long, must be less than 31 characters");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(
        "Invalid email format. Please enter a valid email address."
      );
    } else {
      try {
        setLoader(true);
        const response = await axios.post(
          "https://manipal-server.onrender.com/api/users/login",
          { email, password },
          { withCredentials: true }
        );

        console.log(response);

        if (response.data) {
          navigate("/home");
          localStorage.setItem("currentUser", JSON.stringify(response.data));
          setError(null);
          setEmailError(null);
        }
        setLoader(false);
      } catch (error: any) {
        setLoader(false);
        if (axios.isAxiosError(error) && !error.response) {
          setServerError(
            "Network Error: Please check your internet connection and try again."
          );
        } else {
          setServerError(
            "An unexpected error occurred. Please try again later."
          );
        }
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-1/2 bg-white rounded-3xl shadow-lg mx-4">
        <div className="md:flex">
          <div className="hidden md:block md:w-1/2 relative p-5">
            <img
              className="object-cover w-full h-full rounded-2xl"
              src={login_image}
              alt="hello"
            />
            42
          </div>
          <div className="w-1/2 p-5">
            <div className="text-center">
              <h2
                className="text-zinc-600 text-6xl font-bold mt-10"
                style={{ fontFamily: "Edu VIC WA NT Beginner" }}
              >
                Sign In
              </h2>
            </div>
            <div className="center">
              <form className="space-y-6 mt-14 w-[70%]" onSubmit={verifyLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-zinc-700 block mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(null);
                      setError(null);
                    }}
                  />
                  {emailError && (
                    <div className="text-sm text-red-700">{emailError}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-zinc-700 block mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      ref={passRef}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null);
                      }}
                    />
                    {passVisibility ? (
                      <div
                        className="absolute top-[50%] right-5 translate-y-[-50%] cursor-pointer text-gray-400 text-sm scale-[1.5]"
                        onClick={nonVisiblePassword}
                      >
                        <IoMdEye className="mr-2" />
                      </div>
                    ) : (
                      <div
                        className="absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer text-gray-400 text-sm scale-[1.5]"
                        onClick={visiblePassword}
                      >
                        <BiSolidHide className="mr-2" />
                      </div>
                    )}
                  </div>
                  {error && <div className="text-sm text-red-700">{error}</div>}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex mt-10 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    {loader ? (
                      <>
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 mr-3 text-white animate-spin"
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
                      </>
                    ) : (
                      "Sign Me In"
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-600">
                Can't access your account?{" "}
                <a href="#" className="text-green-600 hover:text-green-500">
                  Connect admin
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {serverError && (
        <ErrorPrompt message={serverError} setServerError={setServerError} />
      )}
    </div>
  );
};

export default LoginBlockNew;
