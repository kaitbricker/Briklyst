import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Session } from 'next-auth'

export const dynamic = 'force-dynamic' // This ensures the route is not statically optimized

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')

    if (username) {
      // Fetch storefront by username
      const user = await prisma.user.findFirst({
        where: {
          name: {
            equals: username,
            mode: 'insensitive'
          }
        },
        include: {
          storefronts: {
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
          }
        }
      })

      if (!user?.storefronts?.[0]) {
        return new NextResponse('Storefront not found', { status: 404 })
      }

      const storefront = user.storefronts[0]
      const products = storefront.products || []

      // Transform the data for the frontend
      const transformedData = {
        id: storefront.id,
        name: storefront.title || '',
        description: storefront.description || '',
        logo: storefront.logoUrl || '/briklyst-logo.png',
        banner: storefront.bannerUrl || '/placeholder-banner.jpg',
        theme: {
          primaryColor: storefront.primaryColor || '#ffffff',
          accentColor: storefront.accentColor || '#000000',
          backgroundColor: storefront.backgroundColor || '#f9fafb',
          textColor: storefront.textColor || '#111827',
          fontFamily: storefront.fontFamily || 'sans-serif'
        },
        products: products.map(product => ({
          id: product.id,
          title: product.title || '',
          description: product.description || '',
          price: product.price || 0,
          imageUrl: product.imageUrl || '',
          affiliateUrl: product.affiliateUrl || '',
          collection: 'Uncategorized',
          clicks: product.clicks || 0
        }))
      }

      return NextResponse.json(transformedData)
    }

    // If no username provided, get current user's storefront
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    let storefront = await prisma.storefront.findUnique({
      where: { userId: session.user.id },
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
          title: `${session.user.name || 'User'}'s Storefront`,
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

    const products = storefront.products || []

    // Transform the data for the frontend
    const transformedData = {
      id: storefront.id,
      name: storefront.title || '',
      description: storefront.description || '',
      logo: storefront.logoUrl || '/briklyst-logo.png',
      banner: storefront.bannerUrl || '/placeholder-banner.jpg',
      theme: {
        primaryColor: storefront.primaryColor || '#ffffff',
        accentColor: storefront.accentColor || '#000000',
        backgroundColor: storefront.backgroundColor || '#f9fafb',
        textColor: storefront.textColor || '#111827',
        fontFamily: storefront.fontFamily || 'sans-serif'
      },
      products: products.map(product => ({
        id: product.id,
        title: product.title || '',
        description: product.description || '',
        price: product.price || 0,
        imageUrl: product.imageUrl || '',
        affiliateUrl: product.affiliateUrl || '',
        collection: 'Uncategorized',
        clicks: product.clicks || 0
      }))
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error in storefront route:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const {
      id,
      title,
      description,
      logoUrl,
      bannerUrl,
      primaryColor,
      accentColor,
      backgroundColor,
      textColor,
      fontFamily,
    } = body

    if (!id) {
      return new NextResponse('Storefront ID is required', { status: 400 })
    }

    // Verify the storefront belongs to the user
    const existingStorefront = await prisma.storefront.findUnique({
      where: { id }
    })

    if (!existingStorefront || existingStorefront.userId !== session.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const storefront = await prisma.storefront.update({
      where: { id },
      data: {
        title: title || existingStorefront.title,
        description: description || existingStorefront.description,
        logoUrl: logoUrl || existingStorefront.logoUrl,
        bannerUrl: bannerUrl || existingStorefront.bannerUrl,
        primaryColor: primaryColor || existingStorefront.primaryColor,
        accentColor: accentColor || existingStorefront.accentColor,
        backgroundColor: backgroundColor || existingStorefront.backgroundColor,
        textColor: textColor || existingStorefront.textColor,
        fontFamily: fontFamily || existingStorefront.fontFamily,
      },
    })

    return NextResponse.json(storefront)
  } catch (error) {
    console.error('Error updating storefront:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 