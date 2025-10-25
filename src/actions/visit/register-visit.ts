'use server';

import prisma from '@/lib/prisma';

export async function registerVisit({ ip, ref }: { ip?: string; ref?: string }) {
  return prisma.visit.create({
    data: {
      ip,
      ref,
    },
  });
}
