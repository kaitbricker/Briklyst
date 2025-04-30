import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { productId } = await req.json()
    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 })
    }

    // Find product and its owner
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { storefront: true },
    })
    if (!product || !product.storefront) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Create click event
    await prisma.clickEvent.create({
      data: {
        productId,
        userId: product.storefront.userId,
      },
    })

    return NextResponse.json({ message: 'Click recorded' })
  } catch {
    return NextResponse.json({ error: 'Failed to record click' }, { status: 500 })
  }
} 