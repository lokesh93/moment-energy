import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Voltage Measurements' },
  },
};

function LineChart({ labels, voltages }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Voltage (V)',
        data: voltages,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
