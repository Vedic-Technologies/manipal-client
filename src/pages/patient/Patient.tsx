
import { SelectValue, SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "../../components/ui/select"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "../../components/ui/avatar"
import { Card } from "../../components/ui/card"
import { useEffect, useState } from "react"
import axios from "axios"

const Patient=()=> {
const [patient, setPatient] = useState({})
const patientId = "663b32004bb1f7e416bea4e9";
  useEffect(() => {
    const fetchData = async () => {
            try {
        const response = await axios.get(`https://manipal-server.onrender.com/api/patient/${patientId}`);
        setPatient(response.data);
        console.log(response.data)
      } catch (error) {
       
      } finally {
      
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col w-full p-10 m-5 ">
    <div className="flex items-center justify-between gap-4 p-4 border-b">
      <div className="flex items-center gap-4">
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Search by name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="john-doe">John Doe</SelectItem>
              <SelectItem value="jane-smith">Jane Smith</SelectItem>
              <SelectItem value="bob-johnson">Bob Johnson</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input className="pl-8 w-[200px]" placeholder="Search by patient ID" type="text" />
        </div>
      </div>
      <Button variant="outline">View All</Button>
    </div>
    <div className="flex justify-center m-auto w-full">
      <Card className="w-full flex gap-6 p-6">
        <div className="flex flex-col items-center gap-4 w-1/3">
          <img src={patient.image} alt="" className="rounded h-60"/>
          <div className="text-center">
            <div className="font-medium">{patient.patientName}</div>            
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-gray-500 dark:text-gray-400">Address</div>
            <div>123 Main St, Anytown USA</div>
          </div>
          <div className="grid gap-1">
            <div className="text-gray-500 dark:text-gray-400">Contact</div>
            <div>+1 (555) 555-5555</div>
            <div>john.doe@example.com</div>
          </div>
          <div className="grid gap-1">
            <div className="text-gray-500 dark:text-gray-400">Blood Group</div>
            <div>O+</div>
          </div>
          <div className="grid gap-1">
            <div className="text-gray-500 dark:text-gray-400">Height</div>
            <div>180 cm</div>
          </div>
          <div className="grid gap-1">
            <div className="text-gray-500 dark:text-gray-400">Weight</div>
            <div>80 kg</div>
          </div>
          <div className="grid gap-1">
            <div className="text-gray-500 dark:text-gray-400">Complaints</div>
            <div>Headache, Fever</div>
          </div>
          <div className="grid gap-1">
            <div className="text-gray-500 dark:text-gray-400">Referrals</div>
            <div>Cardiologist, Neurologist</div>
          </div>
        </div>
      </Card>
    </div>
   <div className="">
    <div className="w-96 bg-red-200 flex justify-around">
      <div className="">Date</div>
    <div className="">Amount</div>
    </div>
    <div className="w-96 bg-blue-200 flex justify-around">
    <div className="">Date</div>
    <div className="">Amount</div>
    </div>
   </div>
  </div>
  )
} 

export default Patient

function SearchIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }