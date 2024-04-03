import React from 'react'
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
export const revenueData = {
    labels: ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    datasets: [
        {
            label: "Total Revenue (₹)",
            data: [5000, 6000, 17000, 9100.20, 9300, 10000, 9000, 18000, 12000, 11000, 15000, 16000],
            backgroundColor: ['rgba(255, 99, 132, 0.2)',   // January
                'rgba(54, 162, 235, 0.2)',   // February
                'rgba(255, 206, 86, 0.2)',   // March
                'rgba(75, 192, 192, 0.2)',   // April
                'rgba(153, 102, 255, 0.2)',  // May
                'rgba(255, 159, 64, 0.2)',   // June
                'rgba(255, 99, 132, 0.2)',   // July
                'rgba(54, 162, 235, 0.2)',   // August
                'rgba(255, 206, 86, 0.2)',   // September
                'rgba(75, 192, 192, 0.2)',   // October
                'rgba(153, 102, 255, 0.2)',  // November
                'rgba(255, 159, 64, 0.2)',],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }
    ]
};

let totalRevenue = 0;
for (let i = 0; i < revenueData.datasets[0].data.length; i++) {
    totalRevenue += revenueData.datasets[0].data[i];
}

const calculatePercentageChange = () => {
    const data = revenueData.datasets[0].data;
    const previousMonthRevenue = data[data.length - 2];
    const currentMonthRevenue = data[data.length - 1];
    const percentageChange = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
    return percentageChange.toFixed(2);
};


const TotalRevenue = () => {

    const percentageChange = calculatePercentageChange();
    return (
        <div className='bg-white min-h-[43%]  flex-grow p-2  flex justify-around rounded-lg shadow-[0px_0px_10px_0px_#9f7aea]'>
            <div className=' '>
                <div className='text-sm text-gray-400 tracking-wider p-1'>Total Revenue</div>
                <div className='text-3xl font-bold p-2'>₹ {totalRevenue.toLocaleString('en-IN')}</div>
                <div className='text-sm pt-3'>
                    {+percentageChange > 0 ? <i className="fa-solid fa-arrow-trend-up fa-beat-fade text-green-600 text-2xl px-1"></i> : <i className="fa-solid fa-arrow-trend-down fa-beat-fade text-red-600 text-2xl px-1"></i>}
                    <span className='text-2xl p-1' style={{ color: +percentageChange > 0 ? 'green' : 'red' }}>{percentageChange} %</span> from last year</div>
            </div>
            <div className='m-2 ' >
                <Bar
                    data={revenueData}
                    options={{
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                grid: {
                                    display: false
                                }
                            }
                        },


                    }}
                />
            </div>
        </div>
    )
}

export default TotalRevenue
