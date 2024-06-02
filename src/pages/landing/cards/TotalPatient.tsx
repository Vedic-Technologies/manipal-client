import React, { useEffect, useState } from 'react';
import { useGetAllPatientsQuery } from '../../../API/API'; // Update this with the actual path to your API slice

const TotalPatient = () => {
    const { data: patients = [], error, isLoading, refetch } = useGetAllPatientsQuery("");
    const [totalPatients, setTotalPatients] = useState(0);
    const [yearlyPatients, setYearlyPatients] = useState(0);
    const [monthlyPatients, setMonthlyPatients] = useState(0);
    const [monthlyPercentageChange, setMonthlyPercentageChange] = useState(0);
    const [yearlyPercentageChange, setYearlyPercentageChange] = useState(0);

    useEffect(() => {
        console.log('Fetched patients:', patients); // Debugging log
        if (patients.length > 0) {
            // Calculate total patients
            const total = patients.length;
            setTotalPatients(total);

            // Filter patients by year and month
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1;

            const yearlyPatientsCount = patients.filter(patient => 
                new Date(patient.createdAt).getFullYear() === currentYear
            ).length;
            setYearlyPatients(yearlyPatientsCount);

            const monthlyPatientsCount = patients.filter(patient => {
                const patientDate = new Date(patient.createdAt);
                return patientDate.getFullYear() === currentYear && (patientDate.getMonth() + 1) === currentMonth;
            }).length;
            setMonthlyPatients(monthlyPatientsCount);

            // Calculate percentage change from last month to current month
            const lastMonthPatientsCount = patients.filter(patient => {
                const patientDate = new Date(patient.createdAt);
                return patientDate.getFullYear() === currentYear && (patientDate.getMonth() + 1) === currentMonth - 1;
            }).length;

            if (lastMonthPatientsCount > 0) {
                const monthlyChange = ((monthlyPatientsCount - lastMonthPatientsCount) / lastMonthPatientsCount) * 100;
                setMonthlyPercentageChange(monthlyChange.toFixed(2));
            } else {
                setMonthlyPercentageChange(0);
            }

            // Calculate percentage change from last year to current year
            const lastYearPatientsCount = patients.filter(patient => 
                new Date(patient.createdAt).getFullYear() === currentYear - 1
            ).length;

            if (lastYearPatientsCount > 0) {
                const yearlyChange = ((yearlyPatientsCount - lastYearPatientsCount) / lastYearPatientsCount) * 100;
                setYearlyPercentageChange(yearlyChange.toFixed(2));
            } else {
                setYearlyPercentageChange(0);
            }
        }
    }, [patients]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    return (
        <div className='bg-white h-[200px] w-auto p-2 min-h-[50%] flex justify-around gap-2 rounded-lg shadow-[0px_0px_10px_0px_#9f7aea]'>
            <div>
                <div className='text-sm text-gray-400 tracking-wider p-1'>Total Patients Till Today</div>
                <div className='text-3xl font-bold p-2'>{totalPatients}</div>
            </div>
            <div>
                <div className='text-sm text-gray-400 tracking-wider p-1'>Total Patients This Year</div>
                <div className='text-3xl font-bold p-2'>{yearlyPatients}</div>
                <div className='text-sm pt-3'>
                    {+yearlyPercentageChange >= 0 ? 
                        <i className="fa-solid fa-arrow-trend-up text-blue-600 text-2xl px-1"></i> : 
                        <i className="fa-solid fa-arrow-trend-down text-red-600 text-2xl px-1"></i>}
                    <span className='text-lg p-1' style={{ color: +yearlyPercentageChange >= 0 ? 'blue' : 'red' }}>
                        {yearlyPercentageChange} %
                    </span> from last year
                </div>
            </div>
            <div>
                <div className='text-sm text-gray-400 tracking-wider p-1'>Total Patients This Month</div>
                <div className='text-3xl font-bold p-2'>{monthlyPatients}</div>
                <div className='text-sm pt-3'>
                    {+monthlyPercentageChange >= 0 ? 
                        <i className="fa-solid fa-arrow-trend-up text-blue-600 text-2xl px-1"></i> : 
                        <i className="fa-solid fa-arrow-trend-down text-red-600 text-2xl px-1"></i>}
                    <span className='text-lg p-1' style={{ color: +monthlyPercentageChange >= 0 ? 'blue' : 'red' }}>
                        {monthlyPercentageChange} %
                    </span> from last month
                </div>
            </div>
        </div>
    );
};

export default TotalPatient;
