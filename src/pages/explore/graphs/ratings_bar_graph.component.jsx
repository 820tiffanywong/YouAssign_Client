
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
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map((label,index) => index),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((label,index) => index),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const RatingsBarGraph = () => {
  return (
    <div>
        <p className='text-white font-light text-4xl w-full mx-auto text-center'>Ratings Graph</p>
        <Bar options={options} data={data} />
    </div>
    );
}

export default RatingsBarGraph
