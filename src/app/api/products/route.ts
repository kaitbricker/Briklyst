import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Session } from 'next-auth'

// GET /api/products - Get all products for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const products = await prisma.product.findMany({
      where: {
        storefront: {
          userId: session.user.id
        }
      },
      include: {
        collection: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { storefrontId, title, description, price, imageUrl, affiliateUrl, collectionId } = await request.json()

    // Verify storefront ownership
    const storefront = await prisma.storefront.findFirst({
      where: {
        id: storefrontId,
        userId: session.user.id
      }
    })

    if (!storefront) {
      return NextResponse.json(
        { error: 'Storefront not found or unauthorized' },
        { status: 404 }
      )
    }

    // If collectionId is provided, verify collection ownership
    if (collectionId) {
      const collection = await prisma.collection.findFirst({
        where: {
          id: collectionId,
          userId: session.user.id
        }
      })

      if (!collection) {
        return NextResponse.json(
          { error: 'Collection not found or unauthorized' },
          { status: 404 }
        )
      }
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        imageUrl,
        affiliateUrl,
        collectionId,
        storefrontId
      },
      include: {
        collection: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Failed to create product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

// PUT /api/products - Update a product
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id, title, description, price, imageUrl, affiliateUrl, collectionId } = await request.json()

    // Verify product ownership
    const existingProduct = await prisma.product.findFirst({
      where: {
        id,
        storefront: {
          userId: session.user.id
        }
      }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found or unauthorized' },
        { status: 404 }
      )
    }

    // If collectionId is provided, verify collection ownership
    if (collectionId) {
      const collection = await prisma.collection.findFirst({
        where: {
          id: collectionId,
          userId: session.user.id
        }
      })

      if (!collection) {
        return NextResponse.json(
          { error: 'Collection not found or unauthorized' },
          { status: 404 }
        )
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price,
        imageUrl,
        affiliateUrl,
        collectionId
      },
      include: {
        collection: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Failed to update product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Verify product ownership through storefront
    const product = await prisma.product.findFirst({
      where: {
        id,
        storefront: {
          userId: session.user.id
        }
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found or unauthorized' },
        { status: 404 }
      )
    }

    await prisma.product.delete({
      where: { id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
} 