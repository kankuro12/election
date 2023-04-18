import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Bar } from 'react-chartjs-2'
import { generateColorScale } from '../../constants/helper';
import styled from 'styled-components';

const BarContainer = styled.div`
  height: 200px;
  position: relative;
`;

function BarChart({ data, type }) {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Votes',
        data: data.map((item) => item.count),
        backgroundColor: generateColorScale(data),
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      image: {
        src: data[0].logo,
        width: 50,
        height: 50,
        position: 'top',
        align: 'center',
        padding: 10,
      },
    },
    barThickness: 30,

    scales: {
      y: {
        precision: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    height: "200px",
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BarChart;
