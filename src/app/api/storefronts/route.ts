import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const username = searchParams.get('username')

    if (!userId && !username) {
      return NextResponse.json(
        { error: 'User ID or username is required' },
        { status: 400 }
      )
    }

    const storefront = await prisma.storefront.findFirst({
      where: userId ? { userId } : { user: { name: username } },
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
    const { userId, title, description, logoUrl } = await request.json()

    if (!userId || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const storefront = await prisma.storefront.update({
      where: { userId },
      data: {
        title,
        description,
        logoUrl,
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