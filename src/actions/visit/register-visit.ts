'use server';

import prisma from '@/lib/prisma';

export async function registerVisit({ ip, ref }: { ip?: string; ref?: string }) {
  try {
    const currentDate = new Date();
    const yearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    
    // Registrar la nueva visita
    await prisma.visit.create({
      data: {
        ip,
        ref,
        createdAt: currentDate
      },
    });

    // Obtener todas las visitas agrupadas por mes
    const visitsData = await prisma.visit.groupBy({
      by: ['createdAt'],
      _count: {
        id: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return {
      success: true,
      yearMonth,
      visits: visitsData
    };
  } catch (error) {
    console.error('Error registering visit:', error);
    return {
      success: false,
      error: 'Failed to register visit'
    };
  }
}
