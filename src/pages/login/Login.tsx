import LoginBlock from "./LoginBlock";
import manipal_logo from "../../assets/images/LOGO-1.png";

const Login = () => {
  return (
    <div className="bg-gradient-to-r from-gray-300 to-gray-300 h-screen flex  items-center justify-center">
      <div className="w-[60%] h-5/6 justify-start items-center rounded-2xl flex flex-col bg-login-image bg-cover relative shadow-basic">
        <img className="  w-60 ml-6 mt-4" src={manipal_logo} alt="" />{" "}
        <LoginBlock />
        <div className=" w-full p-20">
          <div className="text-[#C34167] text-5xl font-semibold tracking-[30px]">MANIPAL</div>
          <div className="text-[#1F7480] text-2xl tracking-wider mt-2">Physiotherapy Center Application</div>
        </div>
        </div>
       
      </div>
 
  );
};

export default Login;
