import React, { ChangeEvent, useEffect, useState } from "react";
import { Label } from "../../components/ui/label";
import { useAddPaymentMutation, useGetPatientByIdQuery } from "../../API/API";
import PaymentCard from "./PaymentCard";
import formatDate from "../../util/TimeFormate";
import { FaCheckCircle } from "react-icons/fa";
const Opd = ({ patientId }) => {
  const [showPrintCard, setShowPrintCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addPayment] = useAddPaymentMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const currentDate = `${yyyy}-${mm}-${dd}`;
  const [id, setId] = useState("");
  const [todayDate, setTodayDate]= useState(currentDate)
  const [loadingPatient, setLoadingPatient] = useState(true); // Added

  const { data: patientById = {}, refetch: refetchPatientById, isFetching  } = useGetPatientByIdQuery(id, {
    skip: !id,
  });

  
  useEffect(() => {
    setId(patientId);
    setLoadingPatient(true); // Reset loading state
    setPaymentData({ ...initialData, patientId: patientId }); // Reset payment data
    setShowPrintCard(false); // Reset print card state
    setIsSuccess(false); // Reset success state
  }, [patientId]);

  useEffect(() => {
    setId(patientId);
  }, [patientId]);

  useEffect(() => {
    if (!isFetching) {
      setLoadingPatient(false);
    }
  }, [isFetching]);

  type paymentType = {
    amount: number;
    paymentDate: string;
    paymentType: string;
    patientId: string;
  };
  const initialData = {
    amount: "",
    paymentDate: currentDate,
    paymentType: "opd",
    patientId: patientId,
  };

  const [paymentData, setPaymentData] = useState<paymentType>(initialData);

  const isAlreadyPaidToday = patientById?.payments?.some(payment => {
    const paymentDate = new Date(payment.paymentDate);
    const today = new Date(todayDate);
    console.log("type",payment.paymentType)
    return (
      paymentDate.getDate() === today.getDate() &&
      paymentDate.getMonth() === today.getMonth() &&
      paymentDate.getFullYear() === today.getFullYear()&&
    payment.paymentType === "opd"
    );
  });
  if (isAlreadyPaidToday) {
    // Patient has already paid today
    
    console.log("Patient has already paid today.from opd",isAlreadyPaidToday);
    
  } else {
    // Patient hasn't paid today
    console.log("Patient hasn't paid today.from opd");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });

    if(name === "paymentDate"){
      setTodayDate(value)
      setPaymentData({
        ...paymentData,
        paymentDate:value
      });
      setShowPrintCard(false) 
      setIsSuccess(false)
    }
  };



  const addOpdPayment = async () => {
    console.log(currentDate);
    console.log(paymentData);
    setIsLoading(true);
    try {
      const result = await addPayment(paymentData).unwrap();
      console.log(result);
      setShowPrintCard(true);
      setIsSuccess(true);
      await refetchPatientById();
      // Update paymentData but keep the amount for PaymentCard
      setPaymentData({ ...initialData, amount: paymentData.amount });
      console.log("paymentData.amount: ",paymentData.amount)
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl px-8 pt-6 pb-4 mb-4 border-2 border-gray-300  flex">
      <div className=" w-1/2 center flex-col relative pb-8">
        <div className=" w-1/2">
          <form onSubmit={handleSubmit} className="">
            <div className=" flex ">
              <div className=" w-full">
                <div className="mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-center text-lg">
                      OPD Payment{" "}
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
                    disabled={ isAlreadyPaidToday}
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
                    value={todayDate}
                    // onChange={(e) => setCurrentDate(e.target.value)}
                    onChange={handleChange}
                    max={currentDate}
                    required
                  />
                </div>

                <div className="flex items-center justify-end">
                  <button
                    onClick={addOpdPayment}
                    disabled={isLoading || isAlreadyPaidToday || loadingPatient}                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {isLoading ? (
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : isSuccess || isAlreadyPaidToday? (
                      <FaCheckCircle className="text-white" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {isAlreadyPaidToday &&(
        <div className="absolute bottom-0 text-green-700 font-medium">Payment done on {formatDate(todayDate)}</div>
      )}
      </div>
      {showPrintCard && <PaymentCard patientId={patientId}  paymentType="opd" 
       amount={paymentData.amount}
        paymentDate={todayDate}/>}
      <div></div>
    </div>
  );
};

export default Opd;
