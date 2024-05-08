import React, { useState } from 'react'
import { Label } from "../../components/ui/label";
import pay from "../../assets/images/payment.jpg";
const DailyPayment = () => {
    const [amount, setAmount] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, you can send the data to the server or handle it as needed
        // console.log({ paymentType, amount, paymentDate });
      };
    
  return (
    <div className="rounded-xl px-8 pt-6 pb-4 mb-4 border-2 border-dashed border-gray-300  flex">
        <div className=" w-1/2 center">
            <div className=" w-1/2">
        <form
          onSubmit={handleSubmit}
          className=""
        >
          <div className=" flex ">
            <div className=" w-full">
              <div className="mb-4">
                

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-center text-lg">Daily Payment </Label>                 
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
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
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
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
           
          </div>
        </form>
        </div>
        </div>
        <div className="bg-green-400 w-1/2">right</div>
       
      </div>
  )
}

export default DailyPayment