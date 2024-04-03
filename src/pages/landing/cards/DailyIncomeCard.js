import physio from '../../../assets/images/image.png'
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
import faker from 'faker';
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
      position: 'top' ,
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
  const month = currentDate.getMonth(); // Month is zero-based (0 = January, 1 = February, etc.)
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the current month
  const labels = Array.from({ length: daysInMonth }, (_, index) => (index + 1).toString()); // Generate an array of labels

  return labels;
};

const labels = getDaysInMonth();
console.log(labels);


export const data = {
  labels,
  datasets: [
    {
      label: 'Day wise Income',
      data: labels.map(() => faker.datatype.number({ min: 100, max: 10000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
   
  ],
};

const DailyIncomeCard = () => {
  return (
    <div className=" rounded-3xl bg-white shadow-lg min-h-full  w-1/2 ">
    <Bar options={options} data={data} />
  </div>
  )
}

export default DailyIncomeCard