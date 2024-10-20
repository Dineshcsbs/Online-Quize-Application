import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({x,y,color1,color2}) => {
  const options = {
    chart: {
      height: 60,
      type: "pie",
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    series: [x,y], 
    colors: [color1, color2], 
    
  };

  return (
    <div id="apexcharts-pie">
      <Chart options={options} series={options.series} type="pie" height={60} />
    </div>
  );
};

export default PieChart;