import React, { useState } from 'react';
import { Label } from "../../components/ui/label";
import pay from "../../assets/images/payment.jpg";
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns'; 
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import { CalendarIcon } from '@radix-ui/react-icons';

const DiscountPayment = ({
    className,
  }: React.HTMLAttributes<HTMLDivElement>) => {
    const [amount, setAmount] = useState("");    
    const [days, setDyas] = useState("");
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
      })
const [selected,setSelected]=useState("daily")
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
            <div className=" w-full ">
              <div className="mb-4 ">
                

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-center text-lg">Discount Payment </Label>                 
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

<RadioGroup defaultValue="comfortable" className='flex mb-3'>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="daily" />
        <Label htmlFor="daily">Daily</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="discount" id="discount" />
        <Label htmlFor="r2">Discount</Label>
      </div>
      
    </RadioGroup>


<div className={cn("grid gap-2", className)}>
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="amount"
                >
                  Days
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

export default DiscountPayment