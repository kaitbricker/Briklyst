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
          storefront: {
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

      if (!user || !user.storefront) {
        return new NextResponse('Storefront not found', { status: 404 })
      }

      // Transform the data for the frontend
      const transformedData = {
        id: user.storefront.id,
        name: user.storefront.title,
        description: user.storefront.description,
        logo: user.storefront.logoUrl,
        banner: user.storefront.bannerUrl,
        theme: {
          primaryColor: user.storefront.primaryColor,
          accentColor: user.storefront.accentColor,
          backgroundColor: user.storefront.backgroundColor,
          textColor: user.storefront.textColor,
          fontFamily: user.storefront.fontFamily
        },
        products: user.storefront.products.map(product => ({
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
    }

    // If no username provided, get current user's storefront
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user) {
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
        collection: 'Uncategorized',
        clicks: product.clicks
      }))
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error fetching/creating storefront:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user) {
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

    const storefront = await prisma.storefront.update({
      where: { id },
      data: {
        title,
        description,
        logoUrl,
        bannerUrl,
        primaryColor,
        accentColor,
        backgroundColor,
        textColor,
        fontFamily,
      },
    })

    return NextResponse.json(storefront)
  } catch (error) {
    console.error('Error updating storefront:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 