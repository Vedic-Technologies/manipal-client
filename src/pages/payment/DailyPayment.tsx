import React, { ChangeEvent, useState } from "react";
import { Label } from "../../components/ui/label";
import pay from "../../assets/images/payment.jpg";
import axios from "axios";
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, you can send the data to the server or handle it as needed
    // console.log({ paymentType, amount, paymentDate });
  };

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
      const response = await axios.post(
        "https://manipal-server.onrender.com/api/payment/add_payment",
        paymentData
      );
      console.log(response.data);
      alert("Payment added successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add paymentt.");
    }
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
      <div className="bg-green-400 w-1/2">right</div>
    </div>
  );
};

export default DailyPayment;
