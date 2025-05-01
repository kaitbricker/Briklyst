"use client";

import React from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  affiliateUrl: string
  clicks?: number
}

interface ProductCardProps {
  product: Product
  primaryColor: string
  accentColor: string
}

export function ProductCard({ product, primaryColor, accentColor }: ProductCardProps) {
  const handleClick = async () => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
    } catch (error) {
      console.error("Failed to track click:", error);
    }
    window.open(product.affiliateUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group overflow-hidden bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
        {/* Product Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={product.imageUrl || '/placeholder-product.jpg'}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
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
              {product.clicks && product.clicks > 0 && (
                <p className="text-xs text-gray-500">{product.clicks} clicks</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="group/button flex items-center gap-2 rounded-md px-4 py-2 border font-medium transition hover:bg-gray-100"
              onClick={handleClick}
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