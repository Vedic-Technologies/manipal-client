import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const MonthlyIncExp = () => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Income and Expenses</h1>
      <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <CategoryCard title="Daily Income" items={dailyIncomeItems} />
        <CategoryCard title="Monthly Income" items={monthlyIncomeItems} />
        <CategoryCard title="Yearly Income" items={yearlyIncomeItems} />
        <CategoryCard title="Daily Expenses" items={dailyExpenseItems} />
        <CategoryCard title="Monthly Expenses" items={monthlyExpenseItems} />
        <CategoryCard title="Yearly Expenses" items={yearlyExpenseItems} />
        <CategoryCard title="Income from Date to Date" items={dateRangeIncomeItems} />
        <CategoryCard title="Expenses from Date to Date" items={dateRangeExpenseItems} />
      </div>
    </div>
  );
};

const DateRangePicker = ({ dateRange, setDateRange }) => (
  <div className="mb-6">
    <label className="block mb-2 font-semibold">Select Date Range</label>
    <div className="flex space-x-4">
      <input
        type="date"
        value={dateRange.start}
        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="date"
        value={dateRange.end}
        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
  </div>
);

const CategoryCard = ({ title, items }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <ul>
      {items.map((item, index) => (
        <li key={index} className="mb-2">
          <span className="font-medium">{item.name}:</span> ${item.amount}
        </li>
      ))}
    </ul>
  </div>
);

// Sample data
const dailyIncomeItems = [
  { name: 'Patient Fees', amount: 300 },
  { name: 'Nerve Test', amount: 150 },
  // Add more items
];

const monthlyIncomeItems = [
  { name: 'Patient Fees', amount: 9000 },
  { name: 'Brain Test', amount: 4500 },
  // Add more items
];

const yearlyIncomeItems = [
  { name: 'Patient Fees', amount: 108000 },
  { name: 'Machine Tests', amount: 54000 },
  // Add more items
];

const dailyExpenseItems = [
  { name: 'Staff Salaries', amount: 500 },
  { name: 'Supplies', amount: 200 },
  // Add more items
];

const monthlyExpenseItems = [
  { name: 'Staff Salaries', amount: 15000 },
  { name: 'Utilities', amount: 3000 },
  // Add more items
];

const yearlyExpenseItems = [
  { name: 'Staff Salaries', amount: 180000 },
  { name: 'Equipment Purchase', amount: 20000 },
  // Add more items
];

const dateRangeIncomeItems = [
  { name: 'Patient Fees', amount: 1200 },
  { name: 'Special Tests', amount: 600 },
  // Add more items
];

const dateRangeExpenseItems = [
  { name: 'Maintenance', amount: 400 },
  { name: 'Miscellaneous', amount: 300 },
  // Add more items
];

export default MonthlyIncExp; 
