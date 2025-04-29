import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const storefrontId = searchParams.get('storefrontId')

    if (!storefrontId) {
      return NextResponse.json(
        { error: 'Storefront ID is required' },
        { status: 400 }
      )
    }

    const products = await prisma.product.findMany({
      where: { storefrontId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { storefrontId, userId, title, description, price, imageUrl, affiliateUrl } = await request.json()

    if (!storefrontId || !userId || !title || !price || !affiliateUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        storefrontId,
        userId,
        title,
        description,
        price,
        imageUrl,
        affiliateUrl,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, description, price, imageUrl, affiliateUrl } = await request.json()

    if (!id || !title || !price || !affiliateUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price,
        imageUrl,
        affiliateUrl,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
} 