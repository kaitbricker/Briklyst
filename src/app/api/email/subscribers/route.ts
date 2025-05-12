import { NextRequest, NextResponse } from 'next/server';

let subscribers: any[] = [
  {
    id: '1',
    email: 'alice@example.com',
    name: 'Alice',
    tags: ['VIP'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'bob@example.com',
    name: 'Bob',
    tags: ['Recent Purchaser'],
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(subscribers);
}

export async function POST(req: NextRequest) {
  const { email, name, tags } = await req.json();
  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }
  const newSubscriber = {
    id: (Date.now() + Math.random()).toString(),
    email,
    name: name || '',
    tags: tags || [],
    createdAt: new Date().toISOString(),
  };
  subscribers.unshift(newSubscriber);
  return NextResponse.json(newSubscriber);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  subscribers = subscribers.filter(s => s.id !== id);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const { id, email, name, tags } = await req.json();
  if (!id || !email) {
    return NextResponse.json({ error: 'Missing id or email' }, { status: 400 });
  }
  const idx = subscribers.findIndex(s => s.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  subscribers[idx] = { ...subscribers[idx], email, name: name || '', tags: tags || [] };
  return NextResponse.json(subscribers[idx]);
} 