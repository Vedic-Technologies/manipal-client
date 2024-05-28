import { useGetAllPaymentsQuery } from '../../API/API';
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import formatDate from '../../util/TimeFormate';

const MonthlyIncExp = () => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const { data: payments = [], error, isLoading, refetch } = useGetAllPaymentsQuery("");

  // Group payments by date and calculate the total amount for each day
  const groupedPayments = payments.reduce((acc, pay) => {
    const date = formatDate(pay.paymentDate);
    console.log("date: ",date)
    if (!acc[date]) {
      acc[date] = { totalAmount: 0, payments: [] };
    }
    acc[date].totalAmount += pay.amount;
    acc[date].payments.push(pay);
    return acc;
  }, {});
console.log(groupedPayments)
  // Convert groupedPayments to an array of objects for easier rendering
  const paymentSummary = Object.keys(groupedPayments).map(date => ({
    date,
    totalAmount: groupedPayments[date].totalAmount,
  }));

  // Sort the paymentSummary array by date in ascending order
  paymentSummary.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-4/5 m-auto">
    <div className="flex gap-5 m-2">
      <div className="text-lg font-semibold"> Daily Payments of month </div>
      <div className="">
        <input type="date" className='ml-5 px-5' onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} />
        <input type="date" className='ml-5 px-5' onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} />
      </div>
    </div>
     
      <div className="bg-white rounded-lg p-6 mt-5 dark:bg-gray-800 dark:text-gray-200">
        
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {paymentSummary.map(({ date, totalAmount }) => (
                <tr key={date} className="border-b dark:border-gray-600">
                  <td className="px-4 py-3">{date}</td>
                  <td className="px-4 py-3">{totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MonthlyIncExp;
