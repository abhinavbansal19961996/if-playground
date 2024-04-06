import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  return (
    <div>
      <h2>Line Graph of CPU Energy Consumption over Time</h2>
      <Line data={data} />
    </div>
  );
};

export default LineChart;