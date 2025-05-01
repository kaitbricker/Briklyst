import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get the user's storefront
    const storefront = await prisma.storefront.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        products: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            images: true,
            category: true,
            createdAt: true,
          },
        },
      },
    })

    if (!storefront) {
      return new NextResponse('Storefront not found', { status: 404 })
    }

    return NextResponse.json(storefront)
  } catch (error) {
    console.error('Error in preview route:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 