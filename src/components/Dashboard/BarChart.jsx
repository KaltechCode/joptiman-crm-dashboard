import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale } from 'chart.js/auto';

import './style.scss';

const BarChart = ({ barChartData , selectedOption }) => {
  const options = {
    // width: "4000px", 
    // height: "273px", 
    // width: "100px", 
    // height: "100px", 
  };

  const months = Object.keys(barChartData);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const data = {
     labels : months.map(month => {
      const [year, monthName] = month.split('-');
      return `${monthName}`;
     }),
    
    datasets: [
      {
        label:selectedOption === "Policy Matrix" ? "Policies" :selectedOption === 'CashFlow Matrix' ? "Cash Flow" : 'Sales',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: selectedOption === "Policy Matrix" 
              ? months.map(month => barChartData[month].totalSoldPolicies) 
              :selectedOption === "CashFlow Matrix" ? months.map(month => barChartData[month].totalRevenue)
              : months.map(month => barChartData[month].totalSalesCost),
        backgroundColor: [
          '#4dc9f6',
          '#f67019',
          '#f53794',
          '#537bc4',
          '#acc236',
          '#166a8f',
          '#00a950',
          '#58595b',
          '#8549ba'
      ],
      },
    ],
  };

  

  return (
    <div>
      <Bar data={data} options={options} plugins={[CategoryScale]}
      //  style={{width:'100%',height:'50%'}}
      />
    </div>
  );
};

export default BarChart;
