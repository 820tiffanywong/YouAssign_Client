import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.defaults.color = "white"

const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: '',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(25, 99, 132)',
        'rgb(24, 162, 235)',
        'rgb(25, 85, 86)'
      ],
      hoverOffset: 4,
      borderColor:'transparent'
    }]
};

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

const PopularityChart = () => {
    return (
        <div className='max-w-[300px]'>
            <div className='md:flex md:flex-nowrap md:flex-row'>
                <div className='mx-auto'>
                    <Pie data={data} options={options} />
                </div>
                <div className='p-4 min-w-[300px]'>
                    <p className='text-white font-light text-4xl mb-4'>Description of Popularity Chart</p>
                    <p className='text-white'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem provident, assumenda harum iure, deleniti ducimus consequuntur, voluptate repellat animi sint ipsa eaque? Libero rerum eaque totam? Eos possimus tempora itaque, ab dolorum repellendus 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PopularityChart
