import { NextResponse } from 'next/server';
import { getPaginatedProductWithImages } from '@/actions';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') || 1);
  const data = await getPaginatedProductWithImages({ page });
  return NextResponse.json(data);
}