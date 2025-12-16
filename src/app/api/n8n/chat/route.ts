import { NextRequest, NextResponse } from 'next/server';

async function forward(req: NextRequest) {
  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, message: 'Missing N8N_WEBHOOK_URL' }, { status: 500 });
  }

  try {
    const url = new URL(req.url);
    const query = url.search; // preserve query string if any

    const method = req.method;
    const headers: Record<string, string> = {};

    // Try to pass through authorization if present
    const authHeader = req.headers.get('authorization');
    if (authHeader) headers['authorization'] = authHeader;

    let body: string | undefined = undefined;
    if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
      const json = await req.json().catch(() => undefined);
      if (json !== undefined) {
        headers['content-type'] = 'application/json';
        body = JSON.stringify(json);
      }
    }

    const res = await fetch(`${webhook}${query}`, {
      method,
      headers,
      body,
    });

    const contentType = res.headers.get('content-type') || '';
    // Minimal diagnostics to help debug empty responses
    console.log('[n8n proxy] upstream status:', res.status, 'content-type:', contentType);
    if (contentType.includes('application/json')) {
      const data = await res.json().catch(() => ({}));
      return NextResponse.json(data, { status: res.status });
    }
    const text = await res.text();
    return new NextResponse(text, { status: res.status, headers: { 'content-type': contentType || 'text/plain' } });
  } catch (err) {
    console.error('Proxy to n8n failed', err);
    return NextResponse.json({ ok: false, message: 'Proxy error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return forward(req);
}

export async function POST(req: NextRequest) {
  return forward(req);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}