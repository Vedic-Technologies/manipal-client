import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useGetAllPaymentsQuery } from '../../../API/API'; // Adjust the import path accordingly

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly Income',
    },
  },
};

const getDaysInMonth = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1 to make it 1-based
  const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the current month
  const labels = Array.from({ length: daysInMonth }, (_, index) => (index + 1).toString()); // Generate an array of labels

  return labels;
};

const labels = getDaysInMonth();

const DailyIncomeCard = () => {
  const { data, error, isLoading } = useGetAllPaymentsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const payments = data || [];
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Filter payments for the current month and days that have already passed
  const filteredPayments = payments.filter(payment => {
    const paymentDate = new Date(payment.paymentDate);
    const paymentDay = paymentDate.getDate();
    const paymentMonth = paymentDate.getMonth() + 1;
    const paymentYear = paymentDate.getFullYear();

    return paymentYear === currentYear &&
           paymentMonth === currentMonth &&
           paymentDay <= currentDay;
  });

  console.log('Filtered Payments:', filteredPayments); // Debug statement

  const dailyIncome = labels.map(day => {
    const dayIncome = filteredPayments
      .filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate.getDate() === parseInt(day, 10);
      })
      .reduce((acc, payment) => acc + payment.amount, 0);

    const formattedDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    console.log(`Income for date ${formattedDate}: ${dayIncome}`); // Log the income for each date

    return dayIncome;
  });

  console.log('Daily Income:', dailyIncome); // Debug statement

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Day wise Income',
        data: dailyIncome,
        backgroundColor: 'lightblue',
      },
    ],
  };
  return (
    <div className="rounded-xl bg-white shadow-lg min-h-full p-10 w-1/2">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default DailyIncomeCard;
