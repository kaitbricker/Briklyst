import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Session } from 'next-auth'
import { z } from 'zod'

// Validation schema for storefront customization
const storefrontCustomizationSchema = z.object({
  templateId: z.string(),
  templateOverrides: z.object({
    colors: z.object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      accent: z.string().optional(),
      background: z.string().optional(),
      text: z.string().optional(),
    }).optional(),
    fonts: z.object({
      heading: z.string().optional(),
      body: z.string().optional(),
    }).optional(),
    layout: z.object({
      spacing: z.string().optional(),
      containerWidth: z.string().optional(),
      borderRadius: z.string().optional(),
    }).optional(),
  }).optional(),
  customSections: z.array(z.object({
    id: z.string(),
    type: z.string(),
    content: z.any(),
    order: z.number(),
  })).optional(),
  brandingAssets: z.object({
    logo: z.string().optional(),
    banner: z.string().optional(),
    favicon: z.string().optional(),
    buttonStyles: z.object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
    }).optional(),
    colorPalette: z.array(z.string()).optional(),
  }).optional(),
  customCSS: z.string().optional(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string(),
    order: z.number(),
  })).optional(),
  collabHighlights: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    link: z.string().optional(),
  })).optional(),
  subscriberBlock: z.object({
    enabled: z.boolean(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttonText: z.string().optional(),
    successMessage: z.string().optional(),
  }).optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const storefront = await prisma.storefront.findFirst({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        templateId: true,
        templateOverrides: true,
        customSections: true,
        brandingAssets: true,
        customCSS: true,
        socialLinks: true,
        collabHighlights: true,
        subscriberBlock: true,
      },
    })

    if (!storefront) {
      return NextResponse.json(
        { error: 'Storefront not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(storefront)
  } catch (error) {
    console.error('Error fetching storefront customization:', error)
    return NextResponse.json(
      { error: 'Failed to fetch storefront customization' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = storefrontCustomizationSchema.parse(body)

    const storefront = await prisma.storefront.findFirst({
      where: {
        userId: session.user.id,
      },
    })

    if (!storefront) {
      return NextResponse.json(
        { error: 'Storefront not found' },
        { status: 404 }
      )
    }

    const updatedStorefront = await prisma.storefront.update({
      where: {
        id: storefront.id,
      },
      data: {
        templateId: validatedData.templateId,
        templateOverrides: validatedData.templateOverrides,
        customSections: validatedData.customSections,
        brandingAssets: validatedData.brandingAssets,
        customCSS: validatedData.customCSS,
        socialLinks: validatedData.socialLinks,
        collabHighlights: validatedData.collabHighlights,
        subscriberBlock: validatedData.subscriberBlock,
      },
    })

    return NextResponse.json(updatedStorefront)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating storefront customization:', error)
    return NextResponse.json(
      { error: 'Failed to update storefront customization' },
      { status: 500 }
    )
  }
} 