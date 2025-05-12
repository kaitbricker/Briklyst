import { NextRequest, NextResponse } from 'next/server';

let templates: any[] = [
  {
    id: '1',
    name: 'Welcome Email',
    design: {},
    html: '<h1>Welcome!</h1>',
    thumbnail: '',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Product Drop',
    design: {},
    html: '<h1>New Product!</h1>',
    thumbnail: '',
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(templates);
}

export async function POST(req: NextRequest) {
  const { name, design, html, thumbnail } = await req.json();
  if (!name || !design || !html) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const newTemplate = {
    id: (Date.now() + Math.random()).toString(),
    name,
    design,
    html,
    thumbnail: thumbnail || '',
    createdAt: new Date().toISOString(),
  };
  templates.unshift(newTemplate);
  return NextResponse.json(newTemplate);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  templates = templates.filter(t => t.id !== id);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const { id, name, design, html, thumbnail } = await req.json();
  if (!id || !name || !design || !html) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const idx = templates.findIndex(t => t.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  templates[idx] = { ...templates[idx], name, design, html, thumbnail: thumbnail || templates[idx].thumbnail, updatedAt: new Date().toISOString() };
  return NextResponse.json(templates[idx]);
} 