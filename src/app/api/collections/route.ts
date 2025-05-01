import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Session } from 'next-auth'

// GET /api/collections - Get all collections for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const collections = await prisma.collection.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(collections)
  } catch (error) {
    console.error('Failed to fetch collections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    )
  }
}

// POST /api/collections - Create a new collection
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { name, description } = await request.json()

    // Check if collection with same name exists
    const existing = await prisma.collection.findFirst({
      where: {
        userId: session.user.id,
        name: name
      }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'A collection with this name already exists' },
        { status: 400 }
      )
    }

    const collection = await prisma.collection.create({
      data: {
        name,
        description,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        userId: session.user.id
      }
    })

    return NextResponse.json(collection)
  } catch (error) {
    console.error('Failed to create collection:', error)
    return NextResponse.json(
      { error: 'Failed to create collection' },
      { status: 500 }
    )
  }
}

// PUT /api/collections - Update a collection
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id, name, description } = await request.json()

    if (!id) {
      return new NextResponse('Collection ID is required', { status: 400 })
    }

    const existingCollection = await prisma.collection.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!existingCollection) {
      return new NextResponse('Collection not found', { status: 404 })
    }

    // Update the collection
    const collection = await prisma.collection.update({
      where: { id },
      data: {
        name,
        description,
        slug: name.toLowerCase().replace(/\s+/g, '-')
      }
    })

    return NextResponse.json(collection)
  } catch (error) {
    console.error('Failed to update collection:', error)
    return NextResponse.json(
      { error: 'Failed to update collection' },
      { status: 500 }
    )
  }
}

// DELETE /api/collections - Delete a collection
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await request.json()

    if (!id) {
      return new NextResponse('Collection ID is required', { status: 400 })
    }

    const existingCollection = await prisma.collection.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!existingCollection) {
      return new NextResponse('Collection not found', { status: 404 })
    }

    // Delete the collection
    await prisma.collection.delete({
      where: { id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Failed to delete collection:', error)
    return NextResponse.json(
      { error: 'Failed to delete collection' },
      { status: 500 }
    )
  }
} 