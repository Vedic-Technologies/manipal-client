import React from 'react'
import { Button } from "../../components/ui/button";
const PaymentCard = () => {
  return (
   
         <div className="shadow-lg rounded-xl border border-gay-300 w-full py-5 px-10 printable flex-1">
      <h1 className="text-lg font-semibold text-center">Payment Card</h1>
      <div className=" w-full ">
        <div className="mt-3   flex"><div className="w-32 ">Name </div>: Abhinav Kumar </div>
        <div className="mt-3   flex"><div className="w-32 ">Payment Type </div>: Discount </div> 
        <div className="mt-3   flex"><div className="w-32 ">Amount </div>: 2,000 rs </div> 
        <div className="mt-3   flex"><div className="w-32 0">Payment Date </div>: 10-04-2024 </div> 
        <div className="mt-3   flex"><div className="w-32 ">No of Days </div>: from 10-04-24 to 05-05-24 </div>  
        </div>

       <div className="flex justify-end gap-5">
        <Button variant="ashish" onClick={()=>window.print()}>Print</Button>
        <Button onClick={()=>window.location.reload()}>Add New Payment</Button>
       </div>
       
      </div>
   
  )
}

export default PaymentCard