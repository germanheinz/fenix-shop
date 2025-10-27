'use client'
import { Title } from '@/components';
import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export default function ProfilePage() {
  const [dataChart, setDataChart] = React.useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Visitas por mes',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    ],
  });

  React.useEffect(() => {
    const visitDataDiv = document.getElementById('visit-data');
    if (visitDataDiv) {
      const rawLabels = JSON.parse(visitDataDiv.getAttribute('data-labels') || '[]');
      const values = JSON.parse(visitDataDiv.getAttribute('data-values') || '[]');
      
      // Convert dates to Spanish month names
      const labels = (rawLabels as string[]).map((key: string) => {
        const [year, month] = key.split('-');
        return `${meses[parseInt(month, 10) - 1]} ${year}`;
      });

      setDataChart({
        labels,
        datasets: [
          {
            label: 'Visitas por mes',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          }
        ],
      });
    }
  }, []);

  return (
    <div>
      <Title title="Profile" />
      <Bar data={dataChart} />
    </div>
  );
}
