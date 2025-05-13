import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Session } from 'next-auth'

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session & {
      user: { id: string }
    }

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { storefrontId, bio, logoUrl } = body

    if (!storefrontId) {
      return new NextResponse('Storefront ID is required', { status: 400 })
    }

    // Verify the user owns the storefront
    const storefront = await prisma.storefront.findFirst({
      where: {
        id: storefrontId,
        userId: session.user.id,
      },
    })

    if (!storefront) {
      return new NextResponse('Storefront not found', { status: 404 })
    }

    // Update the storefront profile
    const updatedStorefront = await prisma.storefront.update({
      where: {
        id: storefrontId,
      },
      data: {
        description: bio,
        logoUrl: logoUrl,
      },
    })

    return NextResponse.json(updatedStorefront)
  } catch (error) {
    console.error('Error updating storefront profile:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 