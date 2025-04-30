import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import StorefrontHeader from "@/components/storefront/StorefrontHeader"
import ProductGrid from "@/components/storefront/ProductGrid"
import StorefrontFooter from "@/components/storefront/StorefrontFooter"
import SubscribeForm from "@/components/storefront/SubscribeForm"
import { ThemeProvider } from "@/components/theme/ThemeProvider"

interface StorefrontPageProps {
  params: { username: string }
}

interface Product {
  id: string
  title: string
  description?: string | null
  imageUrl?: string | null
  affiliateUrl: string
  price: number
  featured: boolean
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
            where: {
              // Only show active products (if we add an active field later)
            },
            orderBy: [
              { featured: 'desc' },
              { order: 'asc' },
            ],
          },
        },
      },
    },
  }) as User | null

  if (!user || !user.storefront) {
    notFound()
  }

  const featuredProducts = user.storefront.products.filter(p => p.featured)
  const regularProducts = user.storefront.products.filter(p => !p.featured)

  return (
    <ThemeProvider themeId={user.storefront.themeId}>
      <StorefrontHeader 
        storefront={user.storefront}
        user={user}
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
            <a
              href="/dashboard/products"
              className="theme-button text-white"
            >
              Add Products
            </a>
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
} 