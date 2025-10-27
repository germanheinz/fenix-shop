'use client'
import { Title } from '@/components';
import React from 'react'
import { Bar } from 'react-chartjs-2';
import { useSession } from 'next-auth/react';
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
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';

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
            label: 'Visits by month',
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
      
      {isAdmin ? (
        <div>
          <h2 className="text-2xl mb-4">Vists</h2>
          <Bar data={dataChart} />
        </div>
      ) : (
        <div className="text-center p-4">
          <p>Welcome to Profile</p>
          <p className="text-gray-600">This section is only visible for admin users</p>
        </div>
      )}
    </div>
  );
}
