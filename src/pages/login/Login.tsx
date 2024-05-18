import LoginBlock from "./LoginBlock";
import manipal_logo from "../../assets/images/LOGO-1.png";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import LoginBlockNew from "./LoginBlockNew";

const Login = () => {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-gray-50 h-screen flex  items-center justify-center">
  {/* <Link to='/home'><Button className="fixed top-16">Home</Button></Link>  */}
      {/* <div className="w-[80%]  rounded-2xl flex flex-col justify-start items-center  bg-login-image bg-cover relative shadow-basic"> */}
        {/* <img className="  w-60" src={manipal_logo} alt="" /> */}
       {/* <div className="w-[1100px] mt-8 flex gap-12 items-center  "> */}
        {/* <div className="">
          <div className="bg-gradient-to-r from-slate-50 to-gray-100 bg-clip-text text-transparent font-Quicksand text-5xl font-semibold tracking-[20px]">MANIPAL</div>
          <div className="text-white  font-Quicksand text-xl font-medium tracking-wider mt-2">Physiotherapy Center Application</div>
        </div> */}
       
          {/* <LoginBlock /> */}
          <LoginBlockNew/>
          {/* </div> */}
       {/* </div> */}
       
       
       
      </div>
 
  );
};

export default Login;
