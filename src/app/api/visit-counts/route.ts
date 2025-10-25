import { NextResponse } from 'next/server';
import { getMonthlyVisitCounts } from '@/actions/visit/get-monthly-visit-counts';

export async function GET() {
  const counts = await getMonthlyVisitCounts();
  return NextResponse.json(counts);
}
