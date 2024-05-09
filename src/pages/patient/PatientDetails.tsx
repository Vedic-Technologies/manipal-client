
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
    <div className="flex flex-col w-3/5 m-auto  m-5 ">
    <div className="flex items-center  justify-between gap-4 p-4 border-b">
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
      <Button variant="outline">View Alll</Button>
    </div>
    <div className="flex justify-center m-auto w-full">
      <Card className="w-full flex gap-6 p-6">
        <div className="flex flex-col items-center gap-4 w-1/3">
          <img src={patient.image} alt="" className="rounded h-60"/>
          <div className="text-center">
            <div className="font-medium text-xl" >{patient.patientName}</div>            
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
  {/* Payment component  */}

  <div className="container mx-auto px-0 py-8 ">
      <div className="grid grid-cols-1  gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:text-gray-200">
          <h2 className="text-2xl font-bold mb-4">Payments</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-end pr-24">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-600 ">
                  <td className="px-4 py-3">2023-05-09</td>
                  <td className="px-4 py-3">$100.00</td>
                  <td className="px-4 py-3 flex items-center justify-end space-x-2 ">
                    <Button size="sm" variant="outline">
                      Delete
                    </Button>
                    <Button size="sm" variant="outline">
                      Update
                    </Button>
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-600">
                  <td className="px-4 py-3">2023-05-01</td>
                  <td className="px-4 py-3">$50.00</td>
                  <td className="px-4 py-3 flex items-center space-x-2 justify-end">
                    <Button size="sm" variant="outline">
                      Delete
                    </Button>
                    <Button size="sm" variant="outline">
                      Update
                    </Button>
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-600">
                  <td className="px-4 py-3">2023-04-25</td>
                  <td className="px-4 py-3">$75.00</td>
                  <td className="px-4 py-3 flex items-center space-x-2 justify-end">
                    <Button size="sm" variant="outline">
                      Delete
                    </Button>
                    <Button size="sm" variant="outline">
                      Update
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:text-gray-200">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Transactions:</span>
              <span>3</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span>$225.00</span>
            </div>
          </div>
        </div> */}
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