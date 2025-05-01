import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Session } from 'next-auth'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get the user's storefront with all related data
    const storefront = await prisma.storefront.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        products: {
          include: {
            collection: true,
            clickEvents: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!storefront) {
      return new NextResponse('Storefront not found', { status: 404 })
    }

    // Transform the data for the frontend
    const transformedData = {
      id: storefront.id,
      name: storefront.title,
      description: storefront.description,
      logo: storefront.logoUrl,
      banner: storefront.bannerUrl,
      theme: {
        primaryColor: storefront.primaryColor,
        accentColor: storefront.accentColor,
        backgroundColor: storefront.backgroundColor,
        textColor: storefront.textColor,
        fontFamily: storefront.fontFamily
      },
      products: storefront.products.map(product => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        affiliateUrl: product.affiliateUrl,
        collection: product.collection?.name || 'Uncategorized',
        clicks: product.clicks
      }))
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error in preview route:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 