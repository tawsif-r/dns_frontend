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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({
  data,
  title = '',
  xAxisLabel = '',
  yAxisLabel = '',
  backgroundColor = 'rgba(75, 192, 192, 0.2)',
  borderColor = 'rgba(75, 192, 192, 1)',
  borderWidth = 2,
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
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || backgroundColor,
      borderColor: dataset.borderColor || borderColor,
      borderWidth: dataset.borderWidth || borderWidth,
    })),
  };

  return (
    <div style={{ width, height }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default BarChart;