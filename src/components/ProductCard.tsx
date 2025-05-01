'use client'

import React from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  affiliateUrl: string
  clicks: number
}

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card className="overflow-hidden bg-white hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={product.imageUrl || '/placeholder-product.jpg'}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg text-[#1C1C2E] line-clamp-1">{product.title}</h3>
        <p className="text-[#5F5F73] text-sm line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-[#5F5F73]">{product.clicks} clicks</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#1C1C2E] hover:text-[#2D2D44]"
            onClick={onClick}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Visit Link
          </Button>
        </div>
      </div>
    </Card>
  )
} 