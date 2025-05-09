import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Session } from 'next-auth'

export const dynamic = 'force-dynamic' // This ensures the route is not statically optimized

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get or create the user's storefront with all related data
    let storefront = await prisma.storefront.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        products: {
          include: {
            clickEvents: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!storefront) {
      // Create a new storefront for the user
      storefront = await prisma.storefront.create({
        data: {
          userId: session.user.id,
          title: `${session.user.name}'s Storefront`,
          description: 'Welcome to my storefront!',
          primaryColor: '#ffffff',
          accentColor: '#000000',
          backgroundColor: '#f9fafb',
          textColor: '#111827',
          fontFamily: 'sans-serif',
        },
        include: {
          products: {
            include: {
              clickEvents: true
            },
            orderBy: {
              createdAt: 'desc'
            }
          }
        }
      })
    }

    // Transform the data for the frontend
    const transformedData = {
      id: storefront.id,
      name: storefront.title,
      description: storefront.description,
      logo: storefront.logoUrl || '/briklyst-logo.png',
      banner: storefront.bannerUrl || '/placeholder-banner.jpg',
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
        collection: 'Uncategorized',
        clicks: product.clicks
      }))
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error in preview route:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 