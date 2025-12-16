import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, message: 'Missing N8N_WEBHOOK_URL' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('Proxy to n8n failed', err);
    return NextResponse.json({ ok: false, message: 'Proxy error' }, { status: 500 });
  }
}