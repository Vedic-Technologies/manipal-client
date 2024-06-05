import React, { useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { useGetAllPaymentsQuery,useGetAllPatientsQuery } from '../../API/API';
import formatDate from '../../util/TimeFormate';
const PaymentCard = ({ patientId }) => {
  const { data, isLoading,refetch } = useGetAllPaymentsQuery();
const {data:allPatient}=useGetAllPatientsQuery()
  // Filter the data to get details of the specific patient
  const patientData = data?.find(patient => patient?.patientId === patientId);
const amountData= allPatient?.find(patient => patient?._id === patientId)
console.log('patientDatafrompayment',patientData)
console.log("amountDataALpatient",amountData)
    // const sortedPayments = amountData?.payments?.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));

    // // Get the latest payment amount
    // const latestPaymentAmount = sortedPayments?.[0]?.amount;
  
useEffect(()=>{
refetch()
},[data])
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
            <div className="mt-3 flex"><div className="w-32">Payment Type</div>: {patientData?.paymentType}</div>
            <div className="mt-3 flex"><div className="w-32">Amount</div>:₹ {patientData?.amount[1]}/-</div>
            <div className="mt-3 flex"><div className="w-32">Payment Date</div>: {formatDate(patientData?.paymentDate)}</div>
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
