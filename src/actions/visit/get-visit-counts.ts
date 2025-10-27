'use server';

import prisma from '@/lib/prisma';

export async function getVisitCounts() {
  try {
    const visits = await prisma.visit.findMany();
    
    // Group visits by year-month
    const visitCounts = visits.reduce((acc, visit) => {
      const date = new Date(visit.createdAt);
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      acc[yearMonth] = (acc[yearMonth] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Sort by date
    return Object.fromEntries(
      Object.entries(visitCounts).sort((a, b) => a[0].localeCompare(b[0]))
    );
  } catch (error) {
    console.error('Error getting visit counts:', error);
    return {};
  }
}