import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { revenueData } from "../landing/cards/TotalRevenue"
import faker from "faker";
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
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Income",
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Remove grid lines for the x-axis
      },
    },
    y: {
      grid: {
        display: false, // Remove grid lines for the y-axis
      },
    },
  },
};
const getMonthsInYear = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months;
};

const labels = getMonthsInYear();

export const data = {
  labels,
  datasets: [
    {
      label: `Total Expense`,
      data: labels.map(() => faker.datatype.number({ min: 5000, max: 100000 })),
      backgroundColor: "rgb(231, 41, 41,.8)",

    },
  ],
};






let totalExpense = 0;
for (let i = 0; i < data.datasets[0].data.length; i++) {
  totalExpense += data.datasets[0].data[i];
}

const lastMonth = data.datasets[0].data.length - 1;
const lastMonthExpense = data.datasets[0].data[lastMonth];

const calculateExpensePercentageChange = () => {
  const monthlyData = data.datasets[0].data;
  const previousMonthPatients = monthlyData[monthlyData.length - 2];
  const currentMonthPatients = monthlyData[monthlyData.length - 1];
  const percentageChange = ((currentMonthPatients - previousMonthPatients) / previousMonthPatients) * 100;
  return percentageChange.toFixed(2);
}; {/** data will change according to expense; for now it is same as months */ }

const calculateMonthlyPercentageChange = () => {
  const percent = data.datasets[0].data;
  const previousMonthExpense = percent[percent.length - 2];
  const currentMonthIExpense = percent[percent.length - 1];
  const monthlyPercentChange = ((currentMonthIExpense - previousMonthExpense) / previousMonthExpense) * 100;
  return monthlyPercentChange.toFixed(2);
}

const Expense = () => {

  const percentageChange = calculateExpensePercentageChange();
  const monthlyPercentChange = calculateMonthlyPercentageChange();
  return (
    <div className=' rounded-xl bg-white shadow-lg mt-10 p-5 h-auto w-5/12 min-w-[450px] shadow-[0px_0px_10px_0px_#9f7aea] flex flex-col justify-between'>
      <div className='flex justify-between'>
        <div>
          <div className="text-gray-500 text-sm">This Year :   <span className="lg:text-3xl text-black font-bold p-2">₹ {totalExpense.toLocaleString('en-IN')}</span> </div>
          <div className="lg:pl-12 text-sm"> {+percentageChange > 0 ? <i className="fa-solid fa-arrow-trend-up fa-beat-fade text-red-600 lg:text-xl px-1"></i> : <i className="fa-solid fa-arrow-trend-down fa-beat-fade text-green-600 lg:text-xl px-1"></i>}  <span className='lg:text-xl p-1' style={{ color: +percentageChange > 0 ? 'red' : 'green' }}>{percentageChange} %</span>  {+percentageChange > 0 ? 'Increment' : 'Decrement'}</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">This Month : <span className="lg:text-3xl text-black font-bold p-2">₹ {lastMonthExpense.toLocaleString('en-IN')}</span> </div>
          <div className="lg:pl-12 text-sm"> {+monthlyPercentChange > 0 ? <i className="fa-solid fa-arrow-trend-up fa-beat-fade text-red-600 lg:text-xl px-1"></i> : <i className="fa-solid fa-arrow-trend-down fa-beat-fade text-green-600 lg:text-xl px-1"></i>}  <span className='lg:text-xl p-1' style={{ color: +monthlyPercentChange > 0 ? 'red' : 'green' }}>{monthlyPercentChange} %</span> {+monthlyPercentChange > 0 ? 'Increment' : 'Decrement'}</div>
        </div>
      </div>

      <div className='w-full text-center center'>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default Expense;
