"use client"

import { Title } from '@/components';
import React from 'react'
import { Bar } from 'react-chartjs-2';

export default function ProfilePage() {
  const [dataChart, setDataChart] = React.useState({
    labels: [],
    datasets: [
      {
        label: 'Visit by month',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  });

  React.useEffect(() => {
    fetch('/api/visit-counts')
      .then(res => res.json())
      .then(counts => {
        const labels = Object.keys(counts).map(key => {
          const [year, month] = key.split('-');
          const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
          ];
          return `${meses[parseInt(month, 10) - 1]} ${year}`;
        });
        setDataChart({
          labels,
          datasets: [
            {
              label: 'Visitas por mes',
              data: Object.values(counts),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
          ],
        });
      });
  }, []);

  return (
    <div>
      <Title title="Profile" />
      <Bar data={dataChart} />
    </div>
  );
}
