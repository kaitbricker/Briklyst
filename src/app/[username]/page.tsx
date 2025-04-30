import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import StorefrontHeader from "@/components/storefront/StorefrontHeader"
import ProductGrid from "@/components/storefront/ProductGrid"
import StorefrontFooter from "@/components/storefront/StorefrontFooter"
import SubscribeForm from "@/components/storefront/SubscribeForm"
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import Link from 'next/link'
import StorefrontDescriptionCard from '@/components/storefront/StorefrontDescriptionCard'
import type { Product } from '@prisma/client'

type ExtendedProduct = Product & {
  featured?: boolean;
  tags?: string[];
}

interface StorefrontPageProps {
  params: { username: string }
}

interface Storefront {
  id: string
  title: string
  description: string | null
  logoUrl: string | null
  bannerUrl: string | null
  primaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  products: Product[]
  layoutStyle?: string
  fontFamily?: string
  themeId: string
}

interface User {
  id: string
  name: string | null
  email: string
  twitter: string | null
  instagram: string | null
  linkedin: string | null
  storefront: Storefront | null
}

export default async function StorefrontPage({ params }: StorefrontPageProps) {
  // Fetch user and their storefront data
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: {
          equals: params.username,
          mode: 'insensitive',
        },
      },
      include: {
        storefront: {
          include: {
            products: {
              orderBy: [
                { order: 'asc' },
              ],
            },
          },
        },
      },
    }) as User | null

    if (!user) {
      console.error(`User not found for username: ${params.username}`)
      notFound()
    }

    if (!user.storefront) {
      console.error(`Storefront not found for user: ${user.id}`)
      notFound()
    }

    // Determine if the viewer is the owner (for demo, always false; replace with session check in real app)
    const isOwner = false;

    // Patch products to ensure 'featured' and 'tags' fields exist
    const patchedProducts = user.storefront.products.map((p: ExtendedProduct) => ({
      ...p,
      featured: typeof p.featured === 'boolean' ? p.featured : false,
      tags: Array.isArray(p.tags) ? p.tags : [],
    }))

    const featuredProducts = patchedProducts.filter((p) => p.featured)
    const regularProducts = patchedProducts.filter((p) => !p.featured)
    const allTags = Array.from(new Set(patchedProducts.flatMap((p) => p.tags)))

    return (
      <ThemeProvider themeId={user.storefront.themeId}>
        <StorefrontHeader 
          storefront={user.storefront}
          user={user}
          isOwner={isOwner}
        />
        <StorefrontDescriptionCard
          description={user.storefront.description || ''}
          tags={allTags}
          category="Travel"
        />
        <main className="flex-1 container mx-auto px-4 py-8">
          {user.storefront.products.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">
                Your storefront is almost ready!
              </h2>
              <p className="text-gray-600 mb-6">
                Add products to make it shine.
              </p>
              <Link
                href="/dashboard/products"
                className="theme-button text-white"
              >
                Add Products
              </Link>
            </div>
          ) : (
            <>
              {featuredProducts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
                  <ProductGrid products={featuredProducts} />
                </div>
              )}
              
              {regularProducts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">All Products</h2>
                  <ProductGrid products={regularProducts} />
                </div>
              )}
            </>
          )}

          <div className="mt-16 border-t pt-12">
            <SubscribeForm storefrontId={user.storefront.id} />
          </div>
        </main>

        <StorefrontFooter />
      </ThemeProvider>
    )
  } catch (error) {
    console.error('Error loading storefront:', error)
    notFound()
  }
} 