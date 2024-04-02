
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


const monthlyData = {
  "labels": [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  "datasets": [
    {
      "label": "Total Patients",
      "data": [1500, 6100, 7010, 19010, 1500, 13010, 18010, 19001, 8010, 15010, 23001, 21000],
      "backgroundColor": "rgba(255, 99, 132, 0.2)",
      "borderColor": "rgba(255, 99, 132, 1)",
      "borderWidth": 1
    }
  ]
};

let totalExpense = 0;
for (let i = 0; i < monthlyData.datasets[0].data.length; i++) {
  totalExpense += monthlyData.datasets[0].data[i];
}

const lastMonth = monthlyData.datasets[0].data.length - 1;
const lastMonthExpense =monthlyData.datasets[0].data[lastMonth];

const calculatePatientPercentageChange = () => {
  const data = monthlyData.datasets[0].data;
  const previousMonthPatients = data[data.length - 2];
  const currentMonthPatients = data[data.length - 1];
  const percentageChange = ((currentMonthPatients - previousMonthPatients) / previousMonthPatients) * 100;
  return percentageChange.toFixed(2);
};{/** data will change according to expense; for now it is same as months */}

const calculateMonthlyPercentageChange = () => {
    const percent = monthlyData.datasets[0].data;
    const previousMonthExpense = percent[percent.length - 2];
    const currentMonthIExpense = percent[percent.length - 1];
    const monthlyPercentChange = ((currentMonthIExpense - previousMonthExpense) / previousMonthExpense) * 100;
    return monthlyPercentChange.toFixed(2);
}

const Expense = () => {

  const data = monthlyData.labels.map((label, index) => ({
    name: label,
    value: monthlyData.datasets[0].data[index]
  }));
  const percentageChange = calculatePatientPercentageChange();
  const monthlyPercentChange = calculateMonthlyPercentageChange();
  return (
    <div className=' rounded-xl bg-white shadow-lg mt-10 p-5 h-auto w-2/5 min-w-[450px] shadow-[0px_0px_10px_0px_#9f7aea] flex flex-col justify-between'>
    <div className='flex justify-between'>
    <div>
                    <div className="text-gray-500 text-sm">This Year :   <span className="lg:text-3xl text-black font-bold p-2">₹ {totalExpense}</span> </div>
                    <div className="lg:pl-12 text-sm"> {+percentageChange > 0 ? <i className="fa-solid fa-arrow-trend-up fa-beat-fade text-red-600 lg:text-xl px-1"></i> : <i className="fa-solid fa-arrow-trend-down fa-beat-fade text-green-600 lg:text-xl px-1"></i>}  <span className='lg:text-xl p-1' style={{ color: +percentageChange > 0 ? 'red' : 'green' }}>{percentageChange} %</span>  {+percentageChange > 0 ? 'Increment' : 'Decrement'}</div>
                </div>
                <div>
                    <div className="text-gray-500 text-sm">This Month : <span className="lg:text-3xl text-black font-bold p-2">₹ {lastMonthExpense}</span> </div>
                    <div className="lg:pl-12 text-sm"> {+monthlyPercentChange > 0 ? <i className="fa-solid fa-arrow-trend-up fa-beat-fade text-red-600 lg:text-xl px-1"></i> : <i className="fa-solid fa-arrow-trend-down fa-beat-fade text-green-600 lg:text-xl px-1"></i>}  <span className='lg:text-xl p-1' style={{ color: +monthlyPercentChange > 0 ? 'red' : 'green' }}>{monthlyPercentChange} %</span> {+monthlyPercentChange > 0 ? 'Increment' : 'Decrement'}</div>
                </div>
    </div>
   
      <div className='w-full   text-center center'>
      <AreaChart width={450}  height={250} data={data} >{/* How do i give it widht full i.e. 100% ->parent */}
        <CartesianGrid stroke="none" strokeWidth={0} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Area type="bumpX" dataKey="value" stroke="#114232" fill="#C5EBAA" fillOpacity={0.4} />
      </AreaChart>
      </div>
    </div>
  );
};

export default Expense;
