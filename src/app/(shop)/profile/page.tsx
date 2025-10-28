'use client'
import { Title } from '@/components';
import React from 'react'
import { Bar } from 'react-chartjs-2';
import { useSession } from 'next-auth/react';
import { getVisits } from '@/actions/visit/get-visits';
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

interface Visit {
  month: string;
  _count: {
    id: number;
  };
}

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
    const loadVisits = async () => {
      const visitsData = await getVisits();
      if (visitsData.success && Array.isArray(visitsData.visits)) {
        const monthlyVisits = visitsData.visits.sort((a: Visit, b: Visit) => a.month.localeCompare(b.month));
        const labels = monthlyVisits.map((visit: Visit) => {
          const [year, month] = visit.month.split('-');
          return `${meses[parseInt(month) - 1]} ${year}`;
        });
        const values = monthlyVisits.map((visit: Visit) => visit._count.id);

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
    };
    
    loadVisits();
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
