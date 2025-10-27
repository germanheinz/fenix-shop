import prisma from '@/lib/prisma';

export async function getMonthlyVisitCounts() {
  const visits = await prisma.visit.groupBy({
    by: ['createdAt'],
    _count: { createdAt: true },
  });

  // Agrupa por año y mes
  const counts: { [key: string]: number } = {};
  visits.forEach(({ createdAt, _count }) => {
    const key = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}`;
    counts[key] = (counts[key] || 0) + _count.createdAt;
  });

  return counts;
}