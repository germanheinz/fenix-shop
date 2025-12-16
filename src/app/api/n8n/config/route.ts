import { NextResponse } from 'next/server';

export async function GET() {
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL || '';
  return NextResponse.json({ webhookUrl }, { status: 200 });
}
