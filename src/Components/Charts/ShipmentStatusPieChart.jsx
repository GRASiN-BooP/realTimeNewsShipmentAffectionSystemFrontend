import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ShipmentStatusPieChart = ({ inTransit = 15, delivered = 25 }) => {
  const data = {
    labels: ["In Transit", "Delivered"],
    datasets: [
      {
        data: [inTransit, delivered],
        backgroundColor: [
          "rgba(59, 130, 246, 0.9)", // bright blue
          "rgba(34, 197, 94, 0.9)", // bright green
        ],
        borderColor: [
          "rgba(0, 0, 0, 0.4)", // make it black
          "rgba(0, 0, 0, 0.4)", // make it black
        ],
        borderWidth: 2,
        offset: 8,
        hoverOffset: 15,
        hoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Shipment Status Distribution",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return ` ${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="w-full h-full bg-white shadow-sm rounded-lg p-4 flex flex-col justify-center items-center">
      <p className="text-lg font-semibold text-gray-800 mb-2">
        Shipment Status
      </p>
      <div className="h-64">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ShipmentStatusPieChart;
