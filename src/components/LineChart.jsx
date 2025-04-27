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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ 
  data, 
  title = '', 
  xAxisLabel = '', 
  yAxisLabel = '',
  backgroundColor = 'rgba(75, 192, 192, 0.2)',
  borderColor = 'rgba(75, 192, 192, 1)',
  pointBackgroundColor = 'rgba(75, 192, 192, 1)',
  pointBorderColor = '#fff',
  borderWidth = 2,
  pointRadius = 4,
  pointHoverRadius = 6,
  maintainAspectRatio = true,
  width = '100%',
  height = '400px',
}) => {
  // Default options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: !!title,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: !!xAxisLabel,
          text: xAxisLabel,
        },
      },
      y: {
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel,
        },
      },
    },
    maintainAspectRatio: maintainAspectRatio,
  };

  // Prepare chart data
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || backgroundColor,
      borderColor: dataset.borderColor || borderColor,
      pointBackgroundColor: dataset.pointBackgroundColor || pointBackgroundColor,
      pointBorderColor: dataset.pointBorderColor || pointBorderColor,
      borderWidth: dataset.borderWidth || borderWidth,
      pointRadius: dataset.pointRadius || pointRadius,
      pointHoverRadius: dataset.pointHoverRadius || pointHoverRadius,
    })),
  };

  return (
    <div style={{ width, height }}>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default LineChart;