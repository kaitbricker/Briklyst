import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Session } from 'next-auth'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    const productId = params.id

    // Get the product
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { storefront: true }
    })

    if (!product) {
      return new NextResponse('Product not found', { status: 404 })
    }

    // Create click event
    await prisma.clickEvent.create({
      data: {
        productId,
        userId: session?.user?.id || 'anonymous',
      }
    })

    // Update product click count
    await prisma.product.update({
      where: { id: productId },
      data: { clicks: { increment: 1 } }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error recording click:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 