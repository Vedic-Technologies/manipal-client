import React from 'react'
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const patientsData = {
    "labels": ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    "datasets": [
        {
            "label": "Total Patients",
            "data": [50, 60, 70, 190, 50, 130, 120, 190, 80, 150, 190, 210],
            "backgroundColor": "rgba(255, 99, 132, 0.2)",
            "borderColor": "rgba(255, 99, 132, 1)",
            "borderWidth": 1
        }
    ]
};
let totalPatients = 0;
for (let i = 0; i < patientsData.datasets[0].data.length; i++) {
    totalPatients += patientsData.datasets[0].data[i];
}

const calculatePatientPercentageChange = () => {
    const data = patientsData.datasets[0].data;
    const previousMonthPatients = data[data.length - 2];
    const currentMonthPatients = data[data.length - 1];
    const percentageChange = ((currentMonthPatients - previousMonthPatients) / previousMonthPatients) * 100;
    return percentageChange.toFixed(2);
};
const TotalPatient = () => {
    const data = patientsData.labels.map((label, index) => ({
        name: label,
        value: patientsData.datasets[0].data[index]
    }));
    const percentageChange = calculatePatientPercentageChange();

    return (
        <div className=' bg-white h-44  w-auto p-2 min-h-[50%] flex gap-5 rounded-lg shadow-[0px_0px_10px_0px_#9f7aea]'>
            <div className=' '>
                <div className='text-sm text-gray-400 tracking-wider p-1'>Total Patient</div>
                <div className='text-3xl font-bold p-2'>{totalPatients}</div>
                <div className='text-sm pt-3 '>
                    {+percentageChange > 0 ? <i className="fa-solid fa-arrow-trend-up fa-beat-fade text-green-600 text-2xl px-1"></i> : <i className="fa-solid fa-arrow-trend-down fa-beat-fade text-red-600 text-2xl px-1"></i>}
                    <span className='text-2xl p-1' style={{ color: +percentageChange > 0 ? 'green' : 'red' }} >{percentageChange} %</span> from last year</div>
            </div>
            <div>
                <AreaChart width={300} height={150} data={data} >
                    <CartesianGrid stroke="none" strokeWidth={0} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#FF5BAE" fillOpacity={0.4} />
                </AreaChart>
            </div>
        </div>

    );
};

export default TotalPatient
