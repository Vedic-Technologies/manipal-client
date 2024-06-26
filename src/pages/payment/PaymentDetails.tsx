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
import Opd from "./Opd";
import { useGetPatientByIdQuery } from "../../API/API"
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
const PaymentDetails = ({patientId}) => {
  const [id, setId]= useState("")
  const [paymentType, setPaymentType] = useState("");
const navigate = useNavigate()
  const { data: patientById = {}, refetch: refetchPatientById } = useGetPatientByIdQuery(id, {
    skip: !id,
  }); 
  useEffect(()=>{
    setId(patientId)
   }) 


  useEffect(()=>
  {
    console.log(paymentType);
  },[paymentType])

  const handleNavigateToPaymentDetails=()=>{
    navigate(`/home/patient_details/${patientId}`)

  }
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
                      <SelectItem value="opd">OPD</SelectItem>                  
                    </SelectContent>
                  </Select> </div>
        
        </div>
     {paymentType==="daily" && <DailyPayment patientId={patientId} />}
     {paymentType==="discount" && <DiscountPayment patientId={patientId}/>}
     {paymentType==="opd" && <Opd patientId={patientId}/>}
      </div>

    </>
  );
};

export default PaymentDetails;
