import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const username = searchParams.get('username')
    const isCurrentUser = searchParams.get('userId') === 'current'

    if (!userId && !username && !isCurrentUser) {
      return NextResponse.json(
        { error: 'User ID or username is required' },
        { status: 400 }
      )
    }

    let finalUserId = userId
    if (isCurrentUser) {
      const session = await auth()
      if (!session?.user?.id) {
        return NextResponse.json(
          { error: 'Not authenticated' },
          { status: 401 }
        )
      }
      finalUserId = session.user.id
    }

    const storefront = await prisma.storefront.findFirst({
      where: finalUserId ? { userId: finalUserId } : { user: { name: username } },
      include: {
        products: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!storefront) {
      return NextResponse.json(
        { error: 'Storefront not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(storefront)
  } catch (error) {
    console.error('Get storefront error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const {
      id,
      title,
      description,
      domain,
      logoUrl,
      bannerUrl,
      primaryColor,
      accentColor,
      backgroundColor,
      textColor,
      fontFamily,
      themeId,
    } = await request.json()

    if (!id || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const storefront = await prisma.storefront.update({
      where: { id },
      data: {
        title,
        description,
        domain,
        logoUrl,
        bannerUrl,
        primaryColor,
        accentColor,
        backgroundColor,
        textColor,
        fontFamily,
        themeId,
      },
    })

    return NextResponse.json(storefront)
  } catch (error) {
    console.error('Update storefront error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
} 