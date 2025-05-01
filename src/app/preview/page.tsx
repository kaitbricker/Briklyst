'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ShoppingCart, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: string
  title: string
  description?: string
  price: number
  imageUrl?: string
  affiliateUrl: string
  collection: string
}

interface StorefrontData {
  name: string
  description: string
  theme: string
  logo?: string
  banner?: string
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1C1C2E] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading storefront...</p>
        </div>
      </div>
    )
  }

  if (!storefront) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">No Storefront Found</h1>
        <p className="text-muted-foreground mb-6">
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">{storefront.name}</h1>
          <p className="text-muted-foreground">{storefront.description}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex flex-wrap gap-2">
              {collections.map((collection) => (
                <Button
                  key={collection}
                  variant={selectedCollection === collection ? 'default' : 'outline'}
                  onClick={() => setSelectedCollection(collection)}
                >
                  {collection}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group overflow-hidden">
                  <div className="relative aspect-square">
                    {product.imageUrl && (
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
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
                    <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                      <Button size="sm">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 