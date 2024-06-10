import React, { useEffect, useState } from 'react';
import { Button } from "../../components/ui/button";
import { useGetAllPaymentsQuery } from '../../API/API';
import formatDate from '../../util/TimeFormate';

const PaymentCard = ({ patientId, paymentType, amount, paymentDate }) => {
  const { data: allPayment, isLoading, refetch } = useGetAllPaymentsQuery();

  console.log(
    "patientId:", patientId,
    "paymentType:", paymentType,
    "amount:", amount,
    "paymentDate:", paymentDate
  );

  // Filter the data to get details of the specific patient
  const patientData = allPayment?.find(patient => patient?.patientId === patientId);

  return (
    <div className="shadow-lg rounded-xl border border-gray-300 w-full py-5 px-10 printable flex-1">
      <h1 className="text-lg font-semibold text-center">Payment Card</h1>
      <div className="w-full">
        <div>
          {isLoading && <div>Loading Receipt</div>}
        </div>
        {patientData && (
          <>
            <div className="mt-3 flex"><div className="w-32">Name</div>: {patientData?.patient?.name?.charAt(0)?.toUpperCase() + patientData?.patient?.name?.slice(1)}</div>
            <div className="mt-3 flex"><div className="w-32">Payment Type</div>: {paymentType}</div>
            <div className="mt-3 flex"><div className="w-32">Amount</div>: ₹ {amount}/-</div>
            <div className="mt-3 flex"><div className="w-32">Payment Date</div>: {formatDate(paymentDate)}</div>
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
