import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Session } from 'next-auth'

// PUT /api/collections/[id] - Update a collection
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { name, description, tags } = await request.json()

    const existingCollection = await prisma.collection.findUnique({
      where: {
        id: params.id
      }
    })

    if (!existingCollection || existingCollection.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Collection not found or unauthorized' },
        { status: 404 }
      )
    }

    const collection = await prisma.collection.update({
      where: { id: params.id },
      data: {
        name,
        description,
        tags: tags || [],
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

// DELETE /api/collections/[id] - Delete a collection
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const existingCollection = await prisma.collection.findUnique({
      where: {
        id: params.id
      }
    })

    if (!existingCollection || existingCollection.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Collection not found or unauthorized' },
        { status: 404 }
      )
    }

    await prisma.collection.delete({
      where: { id: params.id }
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