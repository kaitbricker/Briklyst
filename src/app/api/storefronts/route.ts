import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Session } from 'next-auth'
import { User, Storefront, Product } from '@prisma/client'

export const dynamic = 'force-dynamic' // This ensures the route is not statically optimized

export async function GET(
  request: Request,
  { params }: { params: { username?: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')
    const userId = searchParams.get('userId')

    let user

    if (username) {
      // Fetch storefront by username
      user = await prisma.user.findFirst({
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
    } else {
      // Fetch current user's storefront
      const session = await getServerSession(authOptions)
      if (!session?.user?.email) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }

      user = await prisma.user.findUnique({
        where: {
          email: session.user.email
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
    }

    if (!user || !user.storefront) {
      return NextResponse.json(
        { error: 'Storefront not found' },
        { status: 404 }
      )
    }

    const storefront = user.storefront

    // Transform the data for the frontend
    const transformedData = {
      id: storefront.id,
      name: storefront.title,
      description: storefront.description,
      logoUrl: storefront.logoUrl,
      bannerUrl: storefront.bannerUrl,
      headerImageUrl: storefront.headerImageUrl,
      tagline: storefront.tagline,
      theme: {
        id: storefront.themeId,
        primaryColor: storefront.primaryColor,
        accentColor: storefront.accentColor,
        backgroundColor: storefront.backgroundColor,
        textColor: storefront.textColor,
        fontFamily: storefront.fontFamily,
        layoutStyle: storefront.layoutStyle
      },
      socials: {
        instagram: user.instagram,
        twitter: user.twitter,
        tiktok: user.tiktok,
        youtube: user.youtube
      },
      user: {
        name: user.name,
        email: user.email,
        bio: user.bio,
        emailAlerts: user.emailAlerts,
        weeklyReport: user.weeklyReport,
        monthlyReport: user.monthlyReport
      },
      products: storefront.products.map(product => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        affiliateUrl: product.affiliateUrl,
        clicks: product.clicks,
        order: product.order,
        featured: product.featured,
        tags: product.tags,
        imageUrls: product.imageUrls
      })),
      footerContent: storefront.footerContent || '',
      footerLinks: storefront.footerLinks || []
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error fetching storefront:', error)
    return NextResponse.json(
      { error: 'Failed to fetch storefront' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const username = params.username
    const data = await request.json()

    // Fetch storefront by username
    const user = await prisma.user.findFirst({
      where: {
        name: {
          equals: username,
          mode: 'insensitive'
        }
      },
      include: {
        storefront: true
      }
    })

    if (!user || !user.storefront) {
      return NextResponse.json(
        { error: 'Storefront not found' },
        { status: 404 }
      )
    }

    const storefront = user.storefront

    // Update storefront
    const updatedStorefront = await prisma.storefront.update({
      where: {
        id: storefront.id
      },
      data: {
        title: data.name,
        description: data.description,
        logoUrl: data.logoUrl,
        bannerUrl: data.bannerUrl,
        headerImageUrl: data.headerImageUrl,
        tagline: data.tagline,
        themeId: data.theme.id,
        primaryColor: data.theme.primaryColor,
        accentColor: data.theme.accentColor,
        backgroundColor: data.theme.backgroundColor,
        textColor: data.theme.textColor,
        fontFamily: data.theme.fontFamily,
        layoutStyle: data.theme.layoutStyle,
        footerContent: data.footerContent,
        footerLinks: data.footerLinks
      }
    })

    // Update user social media fields
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        instagram: data.socials.instagram,
        twitter: data.socials.twitter,
        tiktok: data.socials.tiktok,
        youtube: data.socials.youtube
      }
    })

    return NextResponse.json({
      ...updatedStorefront,
      socials: {
        instagram: updatedUser.instagram,
        twitter: updatedUser.twitter,
        tiktok: updatedUser.tiktok,
        youtube: updatedUser.youtube
      }
    })
  } catch (error) {
    console.error('Error updating storefront:', error)
    return NextResponse.json(
      { error: 'Failed to update storefront' },
      { status: 500 }
    )
  }
} 