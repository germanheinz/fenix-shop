import { NextRequest, NextResponse } from 'next/server';
import { getOrderById } from '@/actions/order/get-order-by-id';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ ok: false, message: 'Missing id' }, { status: 400 });
    }

    const result = await getOrderById(id);

    if (!result.ok) {
      const message = (result as any).message ?? 'Order not found or unauthorized';
      const status = message === 'No User Session' ? 401 : 404;
      return NextResponse.json({ ok: false, message }, { status });
    }

    return NextResponse.json({ ok: true, order: result.order, address: result.address });
  } catch (err) {
    console.error('GET /api/orders/[id] error', err);
    return NextResponse.json({ ok: false, message: 'Internal Server Error' }, { status: 500 });
  }
}