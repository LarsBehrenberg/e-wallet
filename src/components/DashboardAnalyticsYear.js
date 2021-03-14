import React from 'react';
import Chart from 'react-apexcharts';
import { Card, Grid } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <div className="mb-spacing-6 mx-md-5 mx-3 mt-md-2 ">
      <Grid container spacing={6}>
        <Grid item sm={6}>
          <ExpenseCategoriesCurrentMonth />
        </Grid>
        <Grid item sm={6}>
          <IncomeExpenseCurrentYear />
        </Grid>
      </Grid>
    </div>
  );
}

const ExpenseCategoriesCurrentMonth = ({ transactions }) => {
  const options = {
    labels: ['Food', 'Necessities', 'Groceries', 'Car', 'Something'],
    legend: {
      // show: true,
      labels: {
        colors: '#fff'
        // useSeriesColors: true
      }
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: '#ffffff50',
      width: 1,
      dashArray: 0
    },
    theme: {
      palette: 'palette10' // upto palette10
    }
  };
  const series = [44, 55, 41, 17, 15];
  return (
    <Card className="card-box mb-5 px-4 py-3 bg-royal text-center">
      {/* <h4 className="font-size-md mb-0 py-2 text-white-50 text-uppercase">
        Expense Categories
      </h4> */}
      <Chart
        options={options}
        series={series}
        type="donut"
        height="290"
        style={{ color: '#fff !important' }}
      />
    </Card>
  );
};

const IncomeExpenseCurrentYear = ({ transactions }) => {
  const options = {
    chart: {
      foreColor: '#fff',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#28a745', '#dc354580'],
    markers: {
      size: 4,
      opacity: 0.3,
      colors: ['#84bfff'],
      strokeColor: '#fff',
      strokeWidth: 2,

      hover: {
        size: 8
      }
    },
    grid: {
      //   strokeDashArray: '5',
      borderColor: 'rgba(125, 138, 156, 0.3)'
    },
    stroke: {
      show: true,
      width: 7,
      curve: 'smooth'
    },
    legend: {
      show: false
    },
    xaxis: {
      axisTicks: {
        color: 'rgba(255,255,255,.2)'
      },
      axisBorder: {
        color: 'rgba(255,255,255,.2)'
      }
    },
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  };
  const data = [
    {
      name: 'Income',
      data: [3.3, 3.1, 4.0, 5.8, 2.1, 3.6, 3.2, 4.0, 5.8, 2.1, 3.6, 3.2]
    },
    {
      name: 'Expense',
      data: [2.1, 2.1, 2.8, 2.8, 4.3, 2.7, 1.4, 3.0, 1.8, 3, 5, 2]
    }
  ];

  return (
    <Card className="card-box mb-5 px-4 py-3 bg-royal text-center">
      <Chart options={options} series={data} type="line" height={280} />
    </Card>
  );
};
