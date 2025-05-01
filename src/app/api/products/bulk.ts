import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Session } from 'next-auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { products } = await request.json();
    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'No products provided' }, { status: 400 });
    }

    // Find the user's storefront
    const storefront = await prisma.storefront.findFirst({
      where: { userId: session.user.id },
    });
    if (!storefront) {
      return NextResponse.json({ error: 'Storefront not found' }, { status: 404 });
    }

    // Create products in bulk
    const created = await prisma.product.createMany({
      data: products.map((p: any) => ({
        title: p.title || '',
        description: '',
        price: parseFloat(p.price) || 0,
        imageUrl: p.imageUrl || '',
        affiliateUrl: p.affiliateUrl || '',
        storefrontId: storefront.id,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({ count: created.count });
  } catch (error) {
    console.error('Bulk product import error:', error);
    return NextResponse.json({ error: 'Failed to import products' }, { status: 500 });
  }
} 