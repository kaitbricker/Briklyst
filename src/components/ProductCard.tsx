'use client'

import React from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Share2, Tag, Star, Flame } from 'lucide-react'
import { motion } from 'framer-motion'

interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  affiliateUrl: string
  clicks: number
  tags?: string[]
  featured?: boolean
}

interface ProductCardProps {
  product: Product
  onClick: () => void
  primaryColor?: string
  accentColor?: string
}

export function ProductCard({ product, onClick, primaryColor = '#FF6D00', accentColor = '#FF3CAC', showBanner = false, bannerText = '', bannerColor = 'bg-gradient-to-r from-pink-400 to-orange-400' }: ProductCardProps & { showBanner?: boolean; bannerText?: string; bannerColor?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.025 }}
      transition={{ duration: 0.25 }}
      className="relative"
    >
      {/* Live Drop/Featured Banner */}
      {showBanner && bannerText && (
        <div className={`absolute top-0 left-0 w-full z-20 text-center py-1 text-xs font-bold text-white rounded-t-xl ${bannerColor} shadow-md animate-pulse`}>
          {bannerText}
        </div>
      )}
      <Card className="group overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
        {/* Product Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={product.imageUrl || '/placeholder-product.jpg'}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/90 text-gray-900 hover:bg-white"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/90 text-gray-900 hover:bg-white"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product Content */}
        <div className="p-6 space-y-4">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags?.length === 0 && (
              <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-400">
                <Tag className="w-3.5 h-3.5" /> Uncategorized
              </span>
            )}
            {product.tags?.map((tag) => (
              <span
                key={tag}
                className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${tag.toLowerCase().includes('featured') ? 'bg-pink-100 text-pink-600' : tag.toLowerCase().includes('drop') ? 'bg-orange-100 text-orange-600' : 'bg-orange-50 text-orange-600'}`}
              >
                {tag.toLowerCase().includes('featured') ? <Star className="w-3.5 h-3.5" /> : tag.toLowerCase().includes('drop') ? <Flame className="w-3.5 h-3.5" /> : <Tag className="w-3.5 h-3.5" />} {tag === 'Uncategorized' ? 'Other' : tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-bold text-xl text-gray-900 line-clamp-1">{product.title}</h3>

          {/* Description */}
          <div className="space-y-2">
            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
            {product.description.length > 100 && (
              <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                Read more →
              </button>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-1">
              <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
              {product.clicks > 0 && (
                <p className="text-xs text-gray-500">{product.clicks} clicks</p>
              )}
            </div>
            <Button
              size="sm"
              className="group/button flex items-center gap-2 rounded-full px-5 py-2 font-semibold bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-md hover:from-pink-600 hover:to-orange-500 hover:shadow-lg transition-all border-0"
              onClick={onClick}
            >
              View Details
              <ArrowRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
} 