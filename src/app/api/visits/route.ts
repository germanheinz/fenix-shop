import { registerVisit } from '@/actions/visit/register-visit';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { ref } = await request.json();
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    await registerVisit({ ip, ref });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error registering visit:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to register visit' },
      { status: 500 }
    );
  }
}