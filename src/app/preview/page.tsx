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

interface Product {
  id: string
  title: string
  description: string
  price: number
  images: string[]
  category: string
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
  const [selectedCategory, setSelectedCategory] = useState('all')

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
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">No Storefront Found</h2>
          <p className="mt-2 text-gray-600">Please set up your storefront first.</p>
          <Button
            className="mt-4"
            onClick={() => router.push('/dashboard/storefront')}
          >
            Set Up Storefront
          </Button>
        </div>
      </div>
    )
  }

  const categories = ['all', ...new Set(storefront.products.map(p => p.category))]
  const filteredProducts = storefront.products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div 
        className="relative h-64 w-full bg-cover bg-center"
        style={{ 
          backgroundImage: storefront.banner 
            ? `url(${storefront.banner})` 
            : 'linear-gradient(135deg, #1C1C2E 0%, #2D2D44 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white mb-4"
              >
                {storefront.name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-200"
              >
                {storefront.description}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="group overflow-hidden">
                <div className="relative aspect-square">
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
} 