import React, { ChangeEvent, useState } from "react";
import { Label } from "../../components/ui/label";
import pay from "../../assets/images/payment.jpg";
import { useAddPaymentMutation } from "../../API/API";
import PaymentCard from "./PaymentCard";
import AlertWrapper from '../../custom_components/AlertWrapper';
import JobDoneAlert from "../../custom_components/JobDoneAlert"
import { motion } from "framer-motion" 
import {ThreeDots} from 'react-loader-spinner';

const DailyPayment = ({patientId}) => {
  type paymentType={
    amount:number,
    paymentDate:string,
    paymentType:string,
    patientId:string
  }
  const initialData={
    amount:null,
    paymentDate:"",
    paymentType:"daily",
    patientId:patientId
  }

  const [paymentData, setPaymentData] = useState<paymentType>(initialData)
  const [showPrintCard,setShowPrintCard]=useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [addPayment] = useAddPaymentMutation();
    // jodDone alert message 
    const [jobDoneMessage, setJobDoneMessage] = useState("")
    const [openJobDoneAlert, setOpenJobDoneAlert] = useState(false)
    const [alertColor, setAlertColor] = useState("")
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle form submission here, you can send the data to the server or handle it as needed
    // console.log({ paymentType, amount, paymentDate });
  };
  if (isLoading) {
    return <div className="center flex-col  gap-24 h-3/4 w-[90%]">
     <div>Submitting details..</div>
     <div>
      <ThreeDots
    height="50"
    width="50"
    color="black"
    ariaLabel="Loading..."
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
/>
        </div>
    </div>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const addDailyPayment = async() => {
    console.log(paymentData);
    try {
      const result = await addPayment(paymentData).unwrap();
      console.log(result);
      setShowPrintCard(true);
      setJobDoneMessage("Payment added successfully.")
      setOpenJobDoneAlert(true)
      setAlertColor("green")
      setTimeout(() => {
        setOpenJobDoneAlert(false)
        setAlertColor("")
        setJobDoneMessage("")
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setJobDoneMessage("Failed to add payment!")
      setAlertColor("red")
      setOpenJobDoneAlert(true)
      setTimeout(() => {
        setOpenJobDoneAlert(false)
        setAlertColor("")
        setJobDoneMessage("")
      }, 3000);
    }
    setIsLoading(false)
  };

  return (
    <div className="rounded-xl px-8 pt-6 pb-4 mb-4 border-2 border-dashed border-gray-300  flex">
      <div className=" w-1/2 center">
        <div className=" w-1/2">
          <form onSubmit={handleSubmit} className="">
            <div className=" flex ">
              <div className=" w-full">
                <div className="mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-center text-lg">
                      Daily Payment{" "}
                    </Label>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="amount"
                  >
                    Amount
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="amount"
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    value={paymentData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="paymentDate"
                  >
                    Payment Date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="paymentDate"
                    type="date"
                    name="paymentDate"
                    value={paymentData.paymentDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-center justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={addDailyPayment}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showPrintCard && <PaymentCard/>}     
      {/* <div className="bg-green-400 w-1/2">right</div> */}
      <div>
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
                OnCancel={()=>setOpenJobDoneAlert(false)}
                isCancelButton="block"
              />
            </motion.div>
          </AlertWrapper>
        </div>
    </div>
  );
};

export default DailyPayment;
