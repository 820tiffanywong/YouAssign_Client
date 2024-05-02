import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.defaults.color = "white"

const data = {
    labels: [
      'Salary',
      'Federal Tax',
      'State Tax'
    ],
    datasets: [{
      label: '',
      data: [1110, 110, 55.5],
      backgroundColor: [
        'rgb(178, 34, 34)',
        'rgb(24, 162, 235)',
        'rgb(255,255,102)'
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
                    <p className='text-slate-200 underline font-light text-4xl mb-4'>Take Home</p>
                    <p className='text-slate-200'>
                        Breakdown: <br /> Salary: 1708.5 <br /> Federal: 201 <br /> State: 100.5
                       
                  
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PopularityChart
