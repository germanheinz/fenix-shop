import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const response = NextResponse.next();

    // Solo proceder si estamos en la página principal
    if (request.nextUrl.pathname === '/') {
      const cookie = request.cookies.get('visited');
      
      if (!cookie) {
        // Set cookie but don't try to write to DB from middleware
        response.cookies.set('visited', '1', {
          path: '/',
          maxAge: 31536000,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        });
      }
    }

    return response;
  } catch (error) {
    // En caso de error, permitir que la solicitud continúe
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/'],
};
