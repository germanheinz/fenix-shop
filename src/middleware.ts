
import { NextResponse } from 'next/server';
import { registerVisit } from '@/actions/visit/register-visit';

export async function middleware(request: Request) {
  const url = new URL(request.url);
  const ref = url.searchParams.get('ref') || '';

  // Leer cookies
  const cookie = request.headers.get('cookie') || '';
  const hasVisited = cookie.includes('visited=1');

  const response = NextResponse.next();

  if (!hasVisited) {
    await registerVisit({ ref });

    response.headers.set('Set-Cookie', 'visited=1; Path=/; Max-Age=31536000');
  }

  return response;
}

export const config = {
  matcher: ['/'],
};
