import React from 'react';
import { useGetAllPaymentsQuery } from '../../../API/API'; // Adjust the import path accordingly

const TotalRevenue = () => {
  const { data, error, isLoading } = useGetAllPaymentsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const payments = data || [];
  const revenueData = payments.filter(payment => payment.paymentType === 'daily' || payment.paymentType === 'discount');

  // Group payments by month
  const getMonthYear = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}`;
  };

  const monthlyRevenue = revenueData.reduce((acc, payment) => {
    const monthYear = getMonthYear(payment.paymentDate);
    acc[monthYear] = (acc[monthYear] || 0) + payment.amount;
    return acc;
  }, {});

  // Get total revenue till today
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.amount, 0);

  // Calculate the revenue for the current month, previous month, current year, and previous year
  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;
  const previousMonth = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
  const currentYear = `${currentDate.getFullYear()}`;
  const previousYear = `${currentDate.getFullYear() - 1}`;

  const currentMonthRevenue = monthlyRevenue[currentMonth] || 0;
  const previousMonthRevenue = monthlyRevenue[previousMonth] || 0;

  const currentYearRevenue = revenueData
    .filter(payment => new Date(payment.paymentDate).getFullYear() === currentDate.getFullYear())
    .reduce((acc, payment) => acc + payment.amount, 0);

  const previousYearRevenue = revenueData
    .filter(payment => new Date(payment.paymentDate).getFullYear() === (currentDate.getFullYear() - 1))
    .reduce((acc, payment) => acc + payment.amount, 0);

  // Calculate percentage changes
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return 0;
    const percentageChange = ((current - previous) / previous) * 100;
    return percentageChange.toFixed(2);
  };

  const monthlyPercentageChange = calculatePercentageChange(currentMonthRevenue, previousMonthRevenue);
  const yearlyPercentageChange = calculatePercentageChange(currentYearRevenue, previousYearRevenue);

  return (
    <div className='h-[200px] p-2 flex justify-around bg-white gap-2 rounded-lg shadow-[0px_0px_10px_0px_#9f7aea]'>
      <div>
        <div className='text-sm text-gray-400 tracking-wider p-1'>Total Income Till Today</div>
        <div className='text-xl font-bold p-2'>₹ {totalRevenue.toLocaleString()}</div>
      </div>
      <div>
        <div className='text-sm text-gray-400 tracking-wider p-1'>Total Income This Year</div>
        <div className='text-xl font-bold p-2'>₹ {currentYearRevenue.toLocaleString()}</div>
        <div className='text-sm pt-3'>
          {+yearlyPercentageChange >= 0 ? <i className="fa-solid fa-arrow-trend-up text-blue-600 text-2xl px-1"></i> : <i className="fa-solid fa-arrow-trend-down text-red-600 text-2xl px-1"></i>}
          <span className='text-lg p-1' style={{ color: +yearlyPercentageChange >= 0 ? 'blue' : 'red' }}>{yearlyPercentageChange} %</span> from last year
        </div>
      </div>
      <div>
        <div className='text-sm text-gray-400 tracking-wider p-1'>Total Income This Month</div>
        <div className='text-xl font-bold p-2'>₹ {currentMonthRevenue.toLocaleString()}</div>
        <div className='text-sm pt-3'>
          {+monthlyPercentageChange >= 0 ? <i className="fa-solid fa-arrow-trend-up text-blue-600 text-2xl px-1"></i> : <i className="fa-solid fa-arrow-trend-down text-red-600 text-2xl px-1"></i>}
          <span className='text-lg p-1' style={{ color: +monthlyPercentageChange >= 0 ? 'blue' : 'red' }}>{monthlyPercentageChange} %</span> from last month
        </div>
      </div>
    </div>
  );
};

export default TotalRevenue;
