import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Session } from 'next-auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session & {
      user: { id: string }
    }

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const settings = await prisma.storefrontSettings.findUnique({
      where: {
        userId: session.user.id,
      },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching storefront settings:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session & {
      user: { id: string }
    }

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()

    const settings = await prisma.storefrontSettings.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        ...body,
      },
      create: {
        userId: session.user.id,
        ...body,
      },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error updating storefront settings:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 