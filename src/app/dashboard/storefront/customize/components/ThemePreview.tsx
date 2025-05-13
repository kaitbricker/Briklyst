'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Theme } from '@/lib/themes'

interface StorefrontData {
  id: string
  name: string
  description: string
  logoUrl: string
  bannerUrl: string
  socials: {
    instagram: string
    twitter: string
    tiktok: string
  }
  products: {
    id: string
    title: string
    price: number
    imageUrl: string
  }[]
  collections: any[]
  theme: Theme
}

interface ThemePreviewProps {
  theme: Theme
  storefrontData: StorefrontData
}

export default function ThemePreview({ theme, storefrontData }: ThemePreviewProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Theme Preview</h2>
      <Card className="p-6">
        <div
          className="space-y-6"
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
            fontFamily: theme.fontFamily.body,
          }}
        >
          <div className="space-y-2">
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: theme.fontFamily.heading }}
            >
              {storefrontData.name}
            </h1>
            <p className="text-lg">{storefrontData.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storefrontData.products.slice(0, 2).map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden"
                style={{ backgroundColor: theme.backgroundColor }}
              >
                <div className="aspect-square relative">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3
                    className="font-semibold"
                    style={{ fontFamily: theme.fontFamily.heading }}
                  >
                    {product.title}
                  </h3>
                  <p className="text-lg font-bold mt-1">${product.price}</p>
                  <button
                    className={`mt-2 w-full ${theme.buttonStyle}`}
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    View Details
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex gap-4">
            {Object.entries(storefrontData.socials).map(([platform, handle]) => (
              <a
                key={platform}
                href={`https://${platform}.com/${handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded ${theme.buttonStyle}`}
                style={{ backgroundColor: theme.accentColor }}
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
} 