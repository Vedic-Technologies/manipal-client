import React, { useEffect, useState } from "react";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "../../components/ui/select";
import DailyPayment from "./DailyPayment";
import DiscountPayment from "./DiscountPayment";

const PaymentDetails = ({patientId}) => {
  const [paymentType, setPaymentType] = useState("");
 

  useEffect(()=>
  {
    console.log(paymentType);
  },[paymentType])
  return (
    <>
      <div className="w-4/5 m-auto mt-5">
        <div className="flex w-1/2 ">
        <div className="text-xl font-semibold mb-6">Enter Payment Method</div>
        <div className="ml-3 ">
            <Select id="gender"
             required
            value={paymentType}
            onValueChange={setPaymentType} >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Payment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="discount">Discount</SelectItem>
                     
                    </SelectContent>
                  </Select> </div>
        
        </div>
     {paymentType==="daily" && <DailyPayment patientId={patientId} />}
     {paymentType==="discount" && <DiscountPayment/>}
      </div>
    </>
  );
};

export default PaymentDetails;
