'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ShoppingCart, Heart, Share2, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: string
  title: string
  description?: string
  price: number
  imageUrl?: string
  affiliateUrl: string
  collection: string
  clicks: number
}

interface Theme {
  primaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  fontFamily: string
}

interface StorefrontData {
  id: string
  name: string
  description: string
  logo?: string
  banner?: string
  theme: Theme
  products: Product[]
}

export default function PreviewStorefront() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [storefront, setStorefront] = useState<StorefrontData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollection, setSelectedCollection] = useState('all')

  useEffect(() => {
    const fetchStorefront = async () => {
      try {
        const res = await fetch('/api/storefronts/preview')
        if (!res.ok) throw new Error('Failed to fetch storefront')
        const data = await res.json()
        setStorefront(data)
      } catch (error) {
        console.error('Error fetching storefront:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStorefront()
  }, [])

  const handleProductClick = async (productId: string) => {
    try {
      await fetch(`/api/products/${productId}/click`, { method: 'POST' })
    } catch (error) {
      console.error('Error recording click:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6D00] mx-auto"></div>
          <p className="mt-4 text-[#5F5F73]">Loading storefront...</p>
        </motion.div>
      </div>
    )
  }

  if (!storefront) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">No Storefront Found</h1>
        <p className="text-[#5F5F73] mb-6">
          You need to set up your storefront first.
        </p>
        <Button asChild>
          <Link href="/dashboard/settings">Set Up Storefront</Link>
        </Button>
      </div>
    )
  }

  const collections = ['all', ...new Set(storefront.products.map(p => p.collection))]
  const filteredProducts = storefront.products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCollection = selectedCollection === 'all' || product.collection === selectedCollection
    return matchesSearch && matchesCollection
  })

  const style = {
    '--primary-color': storefront.theme.primaryColor,
    '--accent-color': storefront.theme.accentColor,
    '--background-color': storefront.theme.backgroundColor,
    '--text-color': storefront.theme.textColor,
    '--font-family': storefront.theme.fontFamily,
  } as React.CSSProperties

  return (
    <div className="min-h-screen" style={style}>
      <header className="relative bg-white/50 backdrop-blur-sm border-b">
        {storefront.banner && (
          <div className="absolute inset-0 z-0">
            <Image
              src={storefront.banner}
              alt="Store banner"
              fill
              className="object-cover opacity-50"
            />
          </div>
        )}
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center gap-4">
            {storefront.logo && (
              <Image
                src={storefront.logo}
                alt="Store logo"
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold" style={{ color: storefront.theme.textColor }}>
                {storefront.name}
              </h1>
              <p className="text-[#5F5F73]">{storefront.description}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {collections.map((collection) => (
                <Button
                  key={collection}
                  variant={selectedCollection === collection ? 'default' : 'outline'}
                  onClick={() => setSelectedCollection(collection)}
                  className="capitalize"
                >
                  {collection}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                    <div className="relative aspect-square">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <ShoppingCart className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button size="icon" variant="outline" className="bg-white/80 backdrop-blur-sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="bg-white/80 backdrop-blur-sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#FF6D00]/10 text-[#FF6D00]">
                          {product.collection}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                      <p className="text-sm text-[#5F5F73] mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                          <div className="text-xs text-[#5F5F73] mt-1">
                            {product.clicks} clicks
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => {
                            handleProductClick(product.id)
                            window.open(product.affiliateUrl, '_blank')
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Product
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
} 