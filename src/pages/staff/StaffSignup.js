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
import axios from "axios";

export default function StaffSignup() {



  const [user, setUser] = useState()


  const handelsubmit = async (e) => {

    e.preventDefault();
    console.log(user)
    try {
      const response = await axios.post("https://manipal-server.onrender.com/api/users/signup", user);

      console.log(response.data);
      alert("New Staff Create Successfully");

    } catch (error) {
      console.error("Error:", error)
      alert("Failed to Create New Staff");
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
          <div className="space-y-2">
            <Label htmlFor="usertype">Usertype</Label>
            <Input id="usertype" name="userType" required type="usertype"

              onChange={handleChange} />
          </div>
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
    </div>
  );
}
