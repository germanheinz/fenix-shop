import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth.config';

// Simple GET handler so the widget can probe the endpoint without failing.
export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200, headers: { 'cache-control': 'no-store' } });
}

async function forwardPost(req: NextRequest) {
  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, message: 'Missing N8N_WEBHOOK_URL' }, { status: 500 });
  }

  try {
    const headers: Record<string, string> = {};
    const authHeader = req.headers.get('authorization');
    if (authHeader) headers['authorization'] = authHeader;

    const json = await req.json().catch(() => undefined);
    let body: string | undefined = undefined;
    if (json !== undefined) {
      headers['content-type'] = 'application/json';
      body = JSON.stringify(json);
    }

    const res = await fetch(webhook, {
      method: 'POST',
      headers,
      body,
      redirect: 'follow',
      cache: 'no-store',
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json().catch(() => ({}));
      const resp = NextResponse.json(data, { status: res.status });
      const allowOrigin = res.headers.get('access-control-allow-origin');
      const allowMethods = res.headers.get('access-control-allow-methods');
      const allowHeaders = res.headers.get('access-control-allow-headers');
      if (allowOrigin) resp.headers.set('Access-Control-Allow-Origin', allowOrigin);
      if (allowMethods) resp.headers.set('Access-Control-Allow-Methods', allowMethods);
      if (allowHeaders) resp.headers.set('Access-Control-Allow-Headers', allowHeaders);
      return resp;
    }
    const text = await res.text();
    const resp = new NextResponse(text, { status: res.status, headers: { 'content-type': contentType || 'text/plain' } });
    const allowOrigin = res.headers.get('access-control-allow-origin');
    const allowMethods = res.headers.get('access-control-allow-methods');
    const allowHeaders = res.headers.get('access-control-allow-headers');
    if (allowOrigin) resp.headers.set('Access-Control-Allow-Origin', allowOrigin);
    if (allowMethods) resp.headers.set('Access-Control-Allow-Methods', allowMethods);
    if (allowHeaders) resp.headers.set('Access-Control-Allow-Headers', allowHeaders);
    return resp;
  } catch (err) {
    console.error('Proxy to n8n failed', err);
    return NextResponse.json({ ok: false, message: 'Proxy error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = (session as any)?.user?.id;
  if (!userId) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }
  return forwardPost(req);
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
