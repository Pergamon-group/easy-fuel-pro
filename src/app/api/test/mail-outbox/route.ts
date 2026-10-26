import { NextResponse } from 'next/server';
import { getTestMailOutbox, clearTestMailOutbox } from '@/lib/mail';

export async function GET() {
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_TEST_OUTBOX !== 'true') {
    return new NextResponse('Not found', { status: 404 });
  }

  const messages = getTestMailOutbox();
  return NextResponse.json({ messages });
}

export async function DELETE() {
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_TEST_OUTBOX !== 'true') {
    return new NextResponse('Not found', { status: 404 });
  }

  clearTestMailOutbox();
  return NextResponse.json({ success: true, message: 'Test outbox cleared' });
}
