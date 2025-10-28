'use server';

import prisma from '@/lib/prisma';

export async function getVisits() {
  try {
    // Obtener visitas agrupadas por mes directamente desde Prisma
    const visits = await prisma.visit.groupBy({
      by: ['createdAt'],
      _count: {
        id: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Formatear los resultados para mantener la misma estructura de respuesta
    const visitsData = visits.map((visit) => ({
      month: visit.createdAt.toISOString().substring(0, 7),
      _count: {
        id: visit._count.id
      }
    }));

    return {
      success: true,
      visits: visitsData
    };
  } catch (error) {
    console.error('Error getting visits:', error);
    return {
      success: false,
      error: 'Failed to get visits'
    };
  }
}