import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function getUserId(session: any): string | null {
  if (session && session.user && typeof session.user.id === 'string') {
    return session.user.id
  }
  return null
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const userId = getUserId(session)
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const templates = await prisma.storefrontTemplate.findMany({
      where: {
        OR: [
          { userId },
          { isPublic: true },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(templates)
  } catch (error) {
    console.error('Error fetching templates:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const userId = getUserId(session)
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name, description, settings } = body

    if (!name || !settings) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const template = await prisma.storefrontTemplate.create({
      data: {
        name,
        description,
        settings,
        userId,
        isPublic: false,
      },
    })

    return NextResponse.json(template)
  } catch (error) {
    console.error('Error creating template:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const userId = getUserId(session)
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const templateId = searchParams.get('id')

    if (!templateId) {
      return new NextResponse('Missing template ID', { status: 400 })
    }

    const template = await prisma.storefrontTemplate.findUnique({
      where: { id: templateId },
    })

    if (!template) {
      return new NextResponse('Template not found', { status: 404 })
    }

    if (template.userId !== userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    await prisma.storefrontTemplate.delete({
      where: { id: templateId },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting template:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const userId = getUserId(session)
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { id, isPublic } = body

    if (!id) {
      return new NextResponse('Missing template ID', { status: 400 })
    }

    const template = await prisma.storefrontTemplate.findUnique({
      where: { id },
    })

    if (!template) {
      return new NextResponse('Template not found', { status: 404 })
    }

    if (template.userId !== userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const updatedTemplate = await prisma.storefrontTemplate.update({
      where: { id },
      data: { isPublic },
    })

    return NextResponse.json(updatedTemplate)
  } catch (error) {
    console.error('Error updating template:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 