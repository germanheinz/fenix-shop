'use server';

import prisma from '@/lib/prisma';

interface VisitCount {
  month: string;
  count: bigint;
}

interface VisitResponse {
  success: boolean;
  visits?: Array<{
    month: string;
    _count: {
      id: number;
    };
  }>;
  error?: string;
}

export async function getVisits(): Promise<VisitResponse> {
  try {
    const monthlyVisits = await prisma.$queryRaw<VisitCount[]>`
      SELECT 
        to_char("createdAt", 'YYYY-MM') as month,
        COUNT(*) as count
      FROM "Visit"
      GROUP BY to_char("createdAt", 'YYYY-MM')
      ORDER BY month DESC
    `;

    const formattedVisits = monthlyVisits.map(visit => ({
      month: visit.month,
      _count: { 
        id: Number(visit.count) 
      }
    }));

    return {
      success: true,
      visits: formattedVisits
    };

  } catch (error) {
    console.error('Error getting visits:', error);
    return {
      success: false,
      error: 'Error al obtener las visitas'
    };
  }
}