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
import StorefrontHeroCarousel, { HeroProduct } from '@/components/storefront/StorefrontHeroCarousel'
import { ProductCard } from '@/components/ProductCard'
import { Flame } from 'lucide-react'

type ExtendedProduct = Product & {
  featured?: boolean;
  tags?: string[];
  collection?: string;
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

    // Group products by collection
    const collectionsMap: Record<string, { title: string; description?: string; products: ExtendedProduct[] }> = {};
    patchedProducts.forEach((product) => {
      const collection = product.collection || 'Uncategorized';
      if (!collectionsMap[collection]) {
        collectionsMap[collection] = {
          title: collection,
          description: '', // Optionally fetch or add collection descriptions if available
          products: [],
        };
      }
      collectionsMap[collection].products.push(product);
    });
    const collections = Object.values(collectionsMap);

    // Prepare up to 3 featured products for the hero carousel
    const heroProducts: HeroProduct[] = featuredProducts.slice(0, 3).map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      imageUrl: p.imageUrl || '',
      creatorNote: (p as any).creatorNote || '',
      testimonial: (p as any).testimonial || '',
    }));

    // Check for live drop
    const hasLiveDrop = patchedProducts.some(p => p.tags?.some(tag => tag.toLowerCase().includes('drop')));
    const bannerColor = 'bg-gradient-to-r from-orange-400 to-pink-500';
    const liveDropText = hasLiveDrop ? '🔥 Live Drop Happening Now!' : '';

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
        {/* Hero Carousel */}
        {heroProducts.length > 0 && (
          <StorefrontHeroCarousel products={heroProducts} />
        )}
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
            <div className="space-y-16">
              {collections.map((collection) => (
                <section key={collection.title} className="">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{collection.title}</h2>
                      {collection.description && (
                        <p className="text-gray-500 text-sm mt-1">{collection.description}</p>
                      )}
                    </div>
                    <Link
                      href={`/${params.username}/collections/${encodeURIComponent(collection.title)}`}
                      className="text-sm text-orange-600 hover:underline font-medium"
                    >
                      See All
                    </Link>
                  </div>
                  {/* Live Drop/Featured Banner */}
                  {hasLiveDrop && (
                    <div className={`mb-4 w-full rounded-xl text-center py-2 text-base font-semibold text-white shadow-md ${bannerColor} flex items-center justify-center gap-2 animate-pulse`}>
                      <Flame className="w-5 h-5" /> {liveDropText}
                    </div>
                  )}
                  <div className="overflow-x-auto pb-2 -mx-2">
                    <div className="flex gap-6 px-2 snap-x snap-mandatory overflow-x-auto scrollbar-thin scrollbar-thumb-orange-200">
                      {collection.products.map((product) => (
                        <div key={product.id} className="min-w-[260px] max-w-xs snap-start">
                          <ProductCard
                            product={product}
                            primaryColor={user.storefront.primaryColor}
                            accentColor={user.storefront.accentColor}
                            showBanner={product.tags?.some(tag => tag.toLowerCase().includes('drop'))}
                            bannerText={product.tags?.some(tag => tag.toLowerCase().includes('drop')) ? '🔥 Live Drop' : ''}
                            bannerColor={bannerColor}
                            onClick={() => window.open(product.affiliateUrl, '_blank')}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </div>
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