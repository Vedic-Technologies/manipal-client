
import login_image from '../../assets/images/login/freepik-export-202405172136036rtf.png'

const LoginBlockNew = () => {
  return (
    <div className="  w-full flex items-center justify-center ">
          <div className=" w-1/2 bg-white rounded-3xl shadow-lg  mx-4">
            <div className="md:flex">
              <div className="hidden md:block md:w-1/2  relative p-5 ">
                <img className="object-cover w-full h-full rounded-2xl" src={login_image} alt="hello"/>
              </div>
              <div className="w-1/2 p-5 ">
                <div className="text-center">
                  <h2 className=" text-zinc-900 text-5xl font-bold mt-10" style={{fontFamily:"Edu VIC WA NT Beginner"}}>Sign In</h2>
                </div>
                <div className=" center">
                <form className="space-y-6 mt-20  w-[70%]">
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-zinc-700 block mb-2">Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email" className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                  </div>
                  <div>
                    <label htmlFor="password" className="text-sm font-medium text-zinc-700 block mb-2">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                  </div>
                  <div>
                    <button type="submit" className="w-full flex mt-10 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Sign Me In</button>
                  </div>
                </form></div>
                <div className="mt-6 text-center">
                  <p className="text-sm text-zinc-600">Can't access your account? <a href="#" className="text-green-600 hover:text-green-500">Connect admin</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default LoginBlockNew
