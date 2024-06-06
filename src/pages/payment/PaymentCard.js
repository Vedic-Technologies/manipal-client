import React, { useEffect, useState } from 'react';
import { Button } from "../../components/ui/button";
import { useGetAllPaymentsQuery,useGetPatientByIdQuery } from '../../API/API';
import formatDate from '../../util/TimeFormate';
const PaymentCard = ({ patientId,paymentType }) => {
  const [id, setId]= useState("")
 const [lastAmount, setLastAmount] = useState(null);
const [lastPaymentType, setLastPaymentType]=useState(null)
  const { data:allPayment, isLoading,refetch } = useGetAllPaymentsQuery();

  const { data: patientById = {}, refetch: refetchPatientById } = useGetPatientByIdQuery(id, {
    skip: !id,
  });  // Filter the data to get details of the specific patient
  const patientData = allPayment?.find(patient => patient?.patientId === patientId);
 useEffect(()=>{
  setId(patientId)
 }) 

 useEffect(() => {
  if (id) {
    refetchPatientById();
  }
}, [id, refetchPatientById]);

useEffect(() => {
  if (paymentType && id) {
    refetchPatientById();
  }
}, [paymentType, id, refetchPatientById]);

// console.log("typeFromPAymentCard",patientById?.payments[0]?.paymentType)
 useEffect(() => {
  const amounts = patientById?.payments;
  const patientTypes= patientById?.payments;
  if (amounts && amounts.length > 0) {
    // setTimeout(() => {
    //   setLastAmount(amounts[amounts.length - 1].amount); // Assuming 'amount' is the property you want to access
    //   console.log("lastindex",amounts[amounts.length - 1].amount)
    // }, 2000);
    setLastAmount(amounts[amounts.length - 1].amount); // Assuming 'amount' is the property you want to access
    // console.log("lastindex",amounts[amounts.length - 1].amount)
  }
  if(patientTypes && patientTypes.length>0){
    setLastPaymentType(patientTypes[patientTypes.length - 1]?.paymentType)

  }

}, [patientById]);

 //  console.log("Onlyamounts",patientById?.payments[1])

    const date = new Date()
const today = date.toString()
useEffect(()=>{
refetch()
},[allPayment],refetch)
  return (
    <div className="shadow-lg rounded-xl border border-gray-300 w-full py-5 px-10 printable flex-1">
      <h1 className="text-lg font-semibold text-center">Payment Card</h1>
      <div className="w-full">
        <div>
          {isLoading && (
            <div>Loading Reciept</div>
          )}
        </div>
        {patientData && (
          <>
            <div className="mt-3 flex"><div className="w-32">Name</div>: {patientData?.patient?.name?.charAt(0)?.toUpperCase() + patientData?.patient?.name?.slice(1) }</div>
            <div className="mt-3 flex"><div className="w-32">Payment Type</div>: {lastPaymentType!== null ?lastPaymentType: "-" }</div>
            <div className="mt-3 flex"><div className="w-32">Amount</div>:₹ {lastAmount !== null ? lastAmount : "-"}/-</div>
            <div className="mt-3 flex"><div className="w-32">Payment Date</div>: {formatDate(today)}</div>
            <div className="mt-3 flex"><div className="w-32">No of Days</div>: NA</div>
          </>
        )}
      </div>

      <div className="flex justify-end gap-5">
        <Button variant="ashish" onClick={() => window.print()}>Print</Button>
        <Button onClick={() => window.location.reload()}>Add New Payment</Button>
      </div>
    </div>
  );
}

export default PaymentCard;
