import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET /api/analytics?range=YYYY-MM-DD_to_YYYY-MM-DD&interval=daily|weekly|monthly
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range')
    const interval = searchParams.get('interval') || 'daily'
    const productIdFilter = searchParams.get('productId')

    let startDate: Date | undefined
    let endDate: Date | undefined
    if (range) {
      const [start, end] = range.split('_to_')
      startDate = new Date(start)
      endDate = new Date(end)
    }

    // Get the user's storefront
    const storefront = await prisma.storefront.findFirst({
      where: { userId: session.user.id },
      select: { id: true },
    })
    if (!storefront) {
      return NextResponse.json({ error: 'Storefront not found' }, { status: 404 })
    }

    // Get all products for this storefront
    const products = await prisma.product.findMany({
      where: { storefrontId: storefront.id },
      select: { id: true, title: true },
    })
    let productIds = products.map(p => p.id)
    if (productIdFilter) {
      productIds = productIds.filter(id => id === productIdFilter)
    }

    // Get click events for these products, filtered by date if provided
    const clickEvents = await prisma.clickEvent.findMany({
      where: {
        productId: { in: productIds },
        ...(startDate && endDate
          ? { createdAt: { gte: startDate, lte: endDate } }
          : {}),
      },
      select: {
        id: true,
        productId: true,
        createdAt: true,
      },
    })

    // Aggregate clicks by interval
    const groupByFn = (date: Date) => {
      if (interval === 'monthly') {
        return `${date.getFullYear()}-${date.getMonth() + 1}`
      } else if (interval === 'weekly') {
        // Week number of year
        const firstDay = new Date(date.getFullYear(), 0, 1)
        const days = Math.floor((date.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000))
        return `${date.getFullYear()}-W${Math.ceil((days + firstDay.getDay() + 1) / 7)}`
      } else {
        // daily
        return date.toISOString().slice(0, 10)
      }
    }

    // Build analytics data
    const clicksByProduct: Record<string, number> = {}
    const clicksByInterval: Record<string, number> = {}
    const productTitles: Record<string, string> = {}
    products.forEach(p => {
      if (!productIdFilter || p.id === productIdFilter) {
        clicksByProduct[p.id] = 0;
        productTitles[p.id] = p.title;
      }
    })
    clickEvents.forEach((ev: { productId: string; createdAt: Date | string }) => {
      if (!productIdFilter || ev.productId === productIdFilter) {
        clicksByProduct[ev.productId]++
        const group = groupByFn(new Date(ev.createdAt))
        clicksByInterval[group] = (clicksByInterval[group] || 0) + 1
      }
    })

    // Most popular products
    const mostPopular = Object.entries(clicksByProduct)
      .sort((a, b) => b[1] - a[1])
      .map(([productId, count]) => ({ productId, title: productTitles[productId], count }))

    return NextResponse.json({
      clicksByProduct,
      clicksByInterval,
      mostPopular,
      totalClicks: clickEvents.length,
      productTitles,
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
} 