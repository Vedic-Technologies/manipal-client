/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YvQM8mJLZo6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "../../components/ui/select";
// import { Button } from "../../components/ui/button";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useStaffSignupMutation } from "../../API/API";
import AlertWrapper from '../../custom_components/AlertWrapper';
import JobDoneAlert from "../../custom_components/JobDoneAlert" 
import { motion } from "framer-motion"

export default function StaffSignup() {

  const [user, setUser] = useState()
    // jodDone alert message 
    const [jobDoneMessage, setJobDoneMessage] = useState("")
    const [openJobDoneAlert, setOpenJobDoneAlert] = useState(false)
    const [alertColor, setAlertColor] = useState("")
    
    const handleCancelAlert = () => {
      setOpenJobDoneAlert(false)
      setOpenJobDoneAlert("")
      setAlertColor("")
    }

  const [staffSignup] = useStaffSignupMutation(); 
  const handelsubmit = async (e) => {

    e.preventDefault();
    console.log(user)
    try {
     staffSignup(user)
      setJobDoneMessage("New Staff Create Successfully!")
      setAlertColor("green")
      setOpenJobDoneAlert(true)

      // removing success alert automatically
      setTimeout(() => {
        setOpenJobDoneAlert(false)
      }, 3000);
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to Create New Staff");
      setJobDoneMessage("Failed to Create New Staff!!")
      setAlertColor("red")
     setOpenJobDoneAlert(true)

   // removing failed alert automatically
   setTimeout(() => {
     setOpenJobDoneAlert(false)
   }, 3000);
    }
  };
  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    console.log(name, value);
    setUser({
      ...user,
      [name]: value,

    })

    console.log({
      ...user,
      [name]: value,

    })
  };
  const handleSelectChange = (value) => {
    setUser((preData) => ({

      ...user,
      gender: value,
    }))
    console.log({...user,gender:value,})
  }


  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Staff Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Create your account to get started.
        </p>
      </div>
      <div className="space-y-4">
        <form onSubmit={handelsubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="firstName" placeholder="Username" required 
            
            onChange={handleChange}
            />
          </div> */}

          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" placeholder="Name" required type="firstName"


                onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" placeholder=""


                onChange={handleChange} />
            </div>
          </div>  
           
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="enter email"
              required type="email"
              name="email"
              onChange={handleChange}

            />
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="usertype">Usertype</Label>
            <Input id="usertype" name="userType" required type="usertype"

              onChange={handleChange} />
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" required type="password"


              onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+1 (555) 555-5555"
              required
              type="number"
              name="contact"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select id="gender" required

              onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
        </form>
      </div>
      <AlertWrapper isOpen={openJobDoneAlert}>
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={openJobDoneAlert ? { opacity: 1, y: 0 } : {}}
  >
    <JobDoneAlert
      height="h-24"
      width="w-52"
      textColor="text-white"
      bgColor={`${alertColor === "red" ? "bg-red-400" :  "bg-green-400"}`}
      boxShadow={`${alertColor === "red" ? "shadow-[0px_0px_42px_2px_#c53030]" :  "shadow-[0px_0px_42px_2px_#48BB78]"}`}
      message={jobDoneMessage}
      isOpen={openJobDoneAlert}
      OnCancel={handleCancelAlert}
      isCancelButton="block"
    />
  </motion.div>
</AlertWrapper>
    </div>
  );
}
