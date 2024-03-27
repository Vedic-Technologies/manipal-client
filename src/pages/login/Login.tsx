import LoginBlock from "./LoginBlock"
import manipal_logo from '../../assets/images/LOGO-1.png'

const Login = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-100 to-teal-50 h-screen flex items-center justify-center">
    <div className="w-[60%] h-5/6 bg-white justify-center items-center rounded-2xl flex bg-login-image bg-cover relative ">
      <div className="w-1/2  h-full  rounded-tl-2xl rounded-bl-2xl ">    
      </div>
      <div className="w-full justify-center flex mr-80 h-full"><LoginBlock/></div>
    </div>
    </div>
  )
}

export default Login