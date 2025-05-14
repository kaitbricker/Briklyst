import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { Session } from 'next-auth'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions) as Session & { user: { id: string } }
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { profileImage, bio, twitter, instagram, linkedin } = await req.json()

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        profileImage,
        bio,
        twitter,
        instagram,
        linkedin,
      },
    })
    return NextResponse.json({ message: 'Profile updated' })
  } catch {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions) as Session & { user: { id: string } }
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { hasSeenWelcome } = await req.json()
  if (typeof hasSeenWelcome !== 'boolean') {
    return NextResponse.json({ error: 'Missing hasSeenWelcome' }, { status: 400 })
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { hasSeenWelcome: hasSeenWelcome },
    })
    return NextResponse.json({ message: 'hasSeenWelcome updated' })
  } catch {
    return NextResponse.json({ error: 'Failed to update hasSeenWelcome' }, { status: 500 })
  }
} 