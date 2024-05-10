
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { useEffect, useState } from "react"
import axios from "axios"
import DefaultUserDetails from "../payment/DefaultUserDetails"

import { RiUserSearchLine } from "react-icons/ri";


const Patient = () => {
  const [patient, setPatient] = useState({})
  const [selectedPatient, setSelectedPatient] = useState();
  const [data, setData] = useState([]);



  const getData = async () => {
    const response = await axios.get('https://manipal-server.onrender.com/api/patient/all_patients');
    console.log(response)
    console.log(response.data)
    setData(response.data)



  }



  const [patientId, setPatientId] = useState('');

  const handleSelectChange = async (e) => {
    setSelectedPatient(e.target.value);
    const id_ = e.target.value
    console.log(id_)

    getPatient(id_);

  };

  const [payment, setPayment] = useState()

  const getPatient = async (id_) => {
    const response = await axios.get(`https://manipal-server.onrender.com/api/patient/${id_}`);
    console.log(response.data.payments)
    setPayment(response.data.payments)



  }


  const handleInputChange = (e) => {
    setPatientId(e.target.value);
  };

  const users = () => {
    getData();
  }

  const getUserDetails = () => {
    if (selectedPatient) {
      return data.find(user => user._id === selectedPatient);
    } else if (patientId) {
      return data.find(user => user._id === parseInt(patientId));
    } else {
      return null;
    }
  };

  const selectedUser = getUserDetails();
















  useEffect(() => {

    getData();

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


          <label className="mr-2 font-medium">Search by name</label>
          <select
            value={selectedPatient}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded px-3 py-2 w-60 mt-1"
          >
            <option value="">Select a patient</option>
            {

              data.map((user) => (
                <option value={user._id}>{user.patientName}</option>

              ))}
          </select>







          <div className="relative">
            <RiUserSearchLine className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input className="pl-8 w-[200px]" placeholder="Search by patient ID" type="text" />
          </div>
        </div>
        <Button variant="outline">View Alll</Button>
      </div>
      <div className="flex justify-center m-auto w-full">
        <Card className="w-full shadow-lg h-[25rem]  ">


          <div className=" flex justify-center items-center  h-[24rem]  ">





            {

              selectedUser ? (
                <div className=" mt-[-5] w-[100%] m-10 h-[22rem]  flex item-center bg-white shadow-lg justify-center ">


                  <div className="text-center absolute">
                    <h2 className="text-lg  font-semibold ">User Details</h2>
                  </div>

                  <div className="flex   w-[100%]   ">


                    <div className=" w-[30%] right mt-10 pl-10 ">
                      <img src={selectedUser.image} alt="User" className="rounded-lg border-2 boder-gray-200 h-60 w-[18rem]  p-2" />
                    </div>

                    <div className=" left  w-[75%] flex flex-col mt-5  pl-20">
                      <div className="flex gap-5 mt-5 ">
                        <h2 className="text-lg font-semibold">Name : {selectedUser.patientName}</h2>
                        <p className="text-lg font-semibold">Sex : {selectedUser.gender}</p>
                        <p className="text-lg font-semibold"> Height : {selectedUser.height}</p>
                      </div>

                      <div className="flex gap-5 mt-5">
                        <p className="text-lg font-semibold">Email : {selectedUser.email !== 'NA' ? selectedUser.email : "abhinavbgp@gmail.com"}</p>
                        <p className="text-lg font-semibold"> State : {selectedUser.address.state}</p>

                      </div>

                      <div className="flex gap-5 mt-5">
                        <p className="text-lg font-semibold"> Village : {selectedUser.address.village}</p>
                        <p className="text-lg font-semibold"> Pin-code : {selectedUser.address.pin_code}</p>
                      </div>
                      <div className="flex gap-5 mt-5">
                        <p className="text-lg font-semibold"> Country : {selectedUser.address.country}</p>
                        <p className="text-lg font-semibold"> BloodGroup : {selectedUser.bloodGroup}</p>
                      </div>
                      <div className="flex gap-5 mt-5">

                        <p className="text-lg font-semibold"> Weight : {selectedUser.weight}</p>
                        <p className="text-lg font-semibold"> Age : {selectedUser.age}</p>

                      </div>
                      <div className="flex gap-5 mt-5">
                        <p className="text-lg font-semibold"> ReferredTo : {selectedUser.referredTo}</p>
                        <p className="text-lg font-semibold"> Dob : {selectedUser.dob}</p>
                       
                      </div>

                    </div>
                  </div>





                </div>
              ) :

                <div className="bg-white shadow-lg  rounded-lg p-6 w-full border boder-gray-200">
                  <h2 className="text-lg font-semibold mb-4">User Details</h2>
                  <DefaultUserDetails />
                </div>
            }


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

                  {
                    payment?.map((pay) => {

                      return (

                        <tr className="border-b dark:border-gray-600 ">
                          <td className="px-4 py-3">{pay.paymentDate}</td>
                          <td className="px-4 py-3">{pay.amount}</td>
                          <td className="px-4 py-3 flex items-center justify-end space-x-2 ">
                            <Button size="sm" variant="outline">
                              Delete
                            </Button>
                            <Button size="sm" variant="outline">
                              Update
                            </Button>
                          </td>
                        </tr>

                      )


                    })


                  }


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
