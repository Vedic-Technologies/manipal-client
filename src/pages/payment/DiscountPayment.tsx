import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import pay from "../../assets/images/payment.jpg";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import PaymentCard from "./PaymentCard";
import { useAddPaymentMutation } from "../../API/API";
import AlertWrapper from '../../custom_components/AlertWrapper';
import JobDoneAlert from "../../custom_components/JobDoneAlert"
import { motion } from "framer-motion"
import {ThreeDots} from 'react-loader-spinner';

const DiscountPayment = ({patientId}) => {
  const [amount, setAmount] = useState("");
  const [days, setDyas] = useState("");
  const [showPrintCard,setShowPrintCard]=useState(false)
  const [isLoading, setIsLoading] = useState(false);
    // jodDone alert message 
    const [jobDoneMessage, setJobDoneMessage] = useState("")
    const [openJobDoneAlert, setOpenJobDoneAlert] = useState(false)
    const [alertColor, setAlertColor] = useState("")
  
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [selected, setSelected] = useState("daily");
  type paymentType={
    amount:number,
    paymentDate:string,
    paymentType:string,
    patientId:string
  }
  const initialData={
    amount:"",
    paymentDate:"",
    paymentType:"daily",
    patientId:"3456"
  }

  const [paymentData, setPaymentData] = useState<paymentType>(initialData);
  const [addPayment] = useAddPaymentMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    addDailyPayment();
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
  const addDailyPayment = async () => {
    try {
      const result = await addPayment(paymentData).unwrap();
      console.log(result);
      setShowPrintCard(true);
      setJobDoneMessage("Payment added successfully.")
      setOpenJobDoneAlert(true)
      setPaymentData(initialData);  
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
      <div className=" w-1/2 center ">
        <div className=" w-1/2">
          <form onSubmit={handleSubmit} className="">
            <div className=" flex ">
              <div className=" w-full ">
                <div className="mb-4 ">
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-center text-lg">
                      Discount Payment
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
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                {/* <div className="mb-4">
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
              </div> */}

                <RadioGroup
                  defaultValue="comfortable"
                  className="flex mb-3"
                  value={selected}
                  onValueChange={setSelected}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Number of Days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="discount" id="discount" />
                    <Label htmlFor="r2">Select Range of Dates</Label>
                  </div>
                </RadioGroup>

                {selected === "discount" && (
                    <div className="mb-5">
                  <div className={cn("grid gap-2", className)}>
                    <label
                      className="block text-gray-700 text-sm font-bold mt-2"
                      htmlFor="amount"
                    >
                      Select from date to date 
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(date.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  </div>
                )}
                {selected === "daily" && (
                  <div className="mb-4 mt-5">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 "
                      htmlFor="amount"
                    >
                      Total Days
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="days"
                      type="number"
                      placeholder="Enter Days"
                      value={days}
                      onChange={(e) => setDyas(e.target.value)}
                      required
                    />
                  </div>
                )}

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
      {showPrintCard && <PaymentCard patientId={patientId}/>}     
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

export default DiscountPayment;
