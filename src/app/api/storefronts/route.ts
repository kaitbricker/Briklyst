import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const storefront = await prisma.storefront.findUnique({
      where: { userId: session.user.id },
    })

    if (!storefront) {
      return new NextResponse('Storefront not found', { status: 404 })
    }

    return NextResponse.json(storefront)
  } catch (error) {
    console.error('Error fetching storefront:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth()
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