import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, newClickAlertTemplate } from '@/lib/email'
import { format } from 'date-fns'

export async function POST(req: Request) {
  try {
    const { productId } = await req.json()
    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 })
    }

    // Find product and its owner
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        storefront: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                emailAlerts: true,
                weeklyReport: true,
                monthlyReport: true,
              },
            },
          },
        },
      },
    })
    if (!product || !product.storefront) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Create click event
    await prisma.clickEvent.create({
      data: {
        productId,
        userId: product.storefront.userId,
      },
    })

    // Send email alert if enabled
    const owner = product.storefront.user
    if (owner?.email && owner.emailAlerts) {
      const clickTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
      await sendEmail({
        to: owner.email,
        subject: `New click on your product: ${product.title}`,
        html: newClickAlertTemplate({ productTitle: product.title, clickTime }),
      })
    }

    return NextResponse.json({ message: 'Click recorded' })
  } catch {
    return NextResponse.json({ error: 'Failed to record click' }, { status: 500 })
  }
} 