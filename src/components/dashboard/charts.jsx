import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { useTheme } from "../theme-provider";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function CrimeDistributionChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = {
    labels: ["Phishing", "Identity Theft", "Ransomware", "Data Breach", "Others"],
    datasets: [
      {
        data: [30, 25, 15, 20, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
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
          color: isDark ? "#fff" : "#000",
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
}

export function ReportTrendsChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const data = {
    labels,
    datasets: [
      {
        label: "Pending",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Investigating",
        data: [28, 48, 40, 19, 86, 27],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Resolved",
        data: [33, 25, 35, 51, 54, 76],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
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
          color: isDark ? "#fff" : "#000",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: isDark ? "#fff" : "#000",
        },
      },
      x: {
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: isDark ? "#fff" : "#000",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}