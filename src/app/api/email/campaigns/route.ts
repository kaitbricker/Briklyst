import { NextRequest, NextResponse } from 'next/server';

let campaigns: any[] = [];

export async function GET() {
  return NextResponse.json(campaigns);
}

export async function POST(req: NextRequest) {
  const { templateId, subject, html, segment, scheduledAt } = await req.json();
  if (!subject || !html || !segment || !scheduledAt) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  // Get subscribers for recipient count
  let recipients = 0;
  try {
    const subsRes = await fetch('http://localhost:3000/api/email/subscribers');
    const subs = await subsRes.json();
    if (segment === 'all') {
      recipients = subs.length;
    } else {
      recipients = subs.filter((s: any) => s.tags.includes(segment)).length;
    }
  } catch {
    recipients = 0;
  }
  const now = new Date();
  const scheduledDate = new Date(scheduledAt);
  const status = scheduledDate <= now ? 'sent' : 'scheduled';
  const newCampaign = {
    id: (Date.now() + Math.random()).toString(),
    templateId: templateId || null,
    subject,
    html,
    segment,
    scheduledAt,
    status,
    createdAt: now.toISOString(),
    opens: 0,
    clicks: 0,
    recipients,
    linkClicks: {},
  };
  campaigns.unshift(newCampaign);
  return NextResponse.json(newCampaign);
}

export async function PUT(req: NextRequest) {
  const { id, scheduledAt } = await req.json();
  if (!id || !scheduledAt) {
    return NextResponse.json({ error: 'Missing id or scheduledAt' }, { status: 400 });
  }
  const idx = campaigns.findIndex(c => c.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const now = new Date();
  const scheduledDate = new Date(scheduledAt);
  const status = scheduledDate <= now ? 'sent' : 'scheduled';
  campaigns[idx] = { ...campaigns[idx], scheduledAt, status };
  return NextResponse.json(campaigns[idx]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const idx = campaigns.findIndex(c => c.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const deleted = campaigns[idx];
  campaigns = campaigns.filter(c => c.id !== id);
  return NextResponse.json({ success: true, deleted });
}

// Tracking endpoints
export async function GET_open(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get('cid');
  const idx = campaigns.findIndex(c => c.id === cid);
  if (idx !== -1) campaigns[idx].opens++;
  // Return a 1x1 transparent gif
  const buf = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
    'base64'
  );
  return new NextResponse(buf, {
    status: 200,
    headers: { 'Content-Type': 'image/gif', 'Content-Length': buf.length.toString() },
  });
}

export async function GET_click(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get('cid');
  const url = searchParams.get('url');
  const idx = campaigns.findIndex(c => c.id === cid);
  if (idx !== -1) {
    campaigns[idx].clicks++;
    if (url) {
      if (!campaigns[idx].linkClicks) campaigns[idx].linkClicks = {};
      campaigns[idx].linkClicks[url] = (campaigns[idx].linkClicks[url] || 0) + 1;
    }
  }
  if (url) {
    return NextResponse.redirect(url, 302);
  }
  return NextResponse.json({ success: true });
} 