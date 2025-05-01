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

    let storefront = await prisma.storefront.findUnique({
      where: { userId: session.user.id },
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
      })
    }

    return NextResponse.json(storefront)
  } catch (error) {
    console.error('Error fetching/creating storefront:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
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