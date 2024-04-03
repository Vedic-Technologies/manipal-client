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
            label: "Monthly Income",
            data: labels.map(() => faker.datatype.number({ min: 50000, max: 1000000 })),
            backgroundColor: "#4CCD99",

        },
    ],
};








let totalIncome = 0;
for (let i = 0; i < revenueData.datasets[0].data.length; i++) {
    totalIncome += revenueData.datasets[0].data[i];
}

const calculatePercentageChange = () => {
    const data = revenueData.datasets[0].data;
    const previousMonthRevenue = data[data.length - 2];
    const currentMonthRevenue = data[data.length - 1];
    const percentageChange = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
    return percentageChange.toFixed(2);
};



const lastMonth = data.datasets[0].data.length - 1;
const lastMonthIncome = data.datasets[0].data[lastMonth];

const calculateMonthlyPercentageChange = () => {
    const monthlyData = data.datasets[0].data;
    const previousMonthIncome = monthlyData[monthlyData.length - 2];
    const currentMonthIncome = monthlyData[monthlyData.length - 1];
    const monthlyPercentChange = ((currentMonthIncome - previousMonthIncome) / previousMonthIncome) * 100;
    return monthlyPercentChange.toFixed(2);
}
const income = () => {
    const percentageChange = calculatePercentageChange();
    const monthlyPercentChange = calculateMonthlyPercentageChange();

    return (
        <div className=" rounded-xl bg-white shadow-lg mt-10 p-5 h-auto w-1/2 min-w-[450px] shadow-[0px_0px_10px_0px_#9f7aea]">
            <div className=" flex justify-between">
                <div>
                    <div className="text-gray-500 text-sm">This Year :     <span className="lg:text-3xl text-black font-bold p-2">₹ {totalIncome.toLocaleString('en-IN')}</span> </div>
                    <div className="lg:pl-12 text-sm"> {+percentageChange > 0 ? <i className="fa-solid fa-arrow-trend-up fa-beat-fade text-green-600 lg:text-xl px-1"></i> : <i className="fa-solid fa-arrow-trend-down fa-beat-fade text-red-600 lg:text-xl px-1"></i>}  <span className='lg:text-xl p-1' style={{ color: +percentageChange > 0 ? 'green' : 'red' }}>{percentageChange} %</span>  {+percentageChange > 0 ? 'Increment' : 'Decrement'}</div>
                </div>
                <div>
                    <div className="text-gray-500 text-sm">This Month : <span className="lg:text-3xl text-black font-bold p-2">₹ {lastMonthIncome.toLocaleString('en-IN')}</span> </div>
                    <div className="lg:pl-12 text-sm"> {+monthlyPercentChange > 0 ? <i className="fa-solid fa-arrow-trend-up fa-beat-fade text-green-600 lg:text-xl px-1"></i> : <i className="fa-solid fa-arrow-trend-down fa-beat-fade text-red-600 lg:text-xl px-1"></i>}  <span className='lg:text-xl p-1' style={{ color: +monthlyPercentChange > 0 ? 'green' : 'red' }}>{monthlyPercentChange} %</span> {+monthlyPercentChange > 0 ? 'Increment' : 'Decrement'}</div>
                </div>
            </div>
            <div className="w-full text-center center">
                <Bar options={options} data={data} />
            </div>
        </div>
    )
}

export default income
