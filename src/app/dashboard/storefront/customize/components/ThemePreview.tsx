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
          className="space-y-8"
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
            fontFamily: theme.fontFamily.body,
          }}
        >
          {/* Header Section */}
          <div className="relative">
            <div className="aspect-[21/9] relative overflow-hidden rounded-lg">
              <img
                src={storefrontData.bannerUrl}
                alt="Store Banner"
                className="object-cover w-full h-full"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: theme.bannerStyle.overlay,
                }}
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: theme.bannerStyle.gradient,
                }}
              />
            </div>
            <div className="absolute -bottom-16 left-8">
              <div 
                className="w-32 h-32 rounded-full overflow-hidden"
                style={{
                  border: theme.imageStyle.border,
                  boxShadow: theme.imageStyle.shadow,
                }}
              >
                <img
                  src={storefrontData.logoUrl}
                  alt="Store Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className="pt-16 space-y-4">
            <div className="space-y-2">
              <h1
                className="text-4xl font-bold"
                style={{ fontFamily: theme.fontFamily.heading }}
              >
                {storefrontData.name}
              </h1>
              <p className="text-lg opacity-90">{storefrontData.description}</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {Object.entries(storefrontData.socials).map(([platform, handle]) => (
                <a
                  key={platform}
                  href={`https://${platform}.com/${handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-full ${theme.buttonStyle} transition-all duration-200`}
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Featured Products */}
          <div className="space-y-4">
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: theme.fontFamily.heading }}
            >
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {storefrontData.products.slice(0, 2).map((product) => (
                <Card
                  key={product.id}
                  className={`overflow-hidden transition-all duration-200 ${theme.accentElements.productCards}`}
                  style={{ backgroundColor: theme.backgroundColor }}
                >
                  <div 
                    className="aspect-square relative"
                    style={{
                      border: theme.imageStyle.border,
                      boxShadow: theme.imageStyle.shadow,
                    }}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3
                      className="text-xl font-semibold"
                      style={{ fontFamily: theme.fontFamily.heading }}
                    >
                      {product.title}
                    </h3>
                    <p className="text-2xl font-bold">${product.price}</p>
                    <button
                      className={`w-full ${theme.buttonStyle} transition-all duration-200`}
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      View Details
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Theme Elements Showcase */}
          <div className="space-y-4 pt-4">
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: theme.fontFamily.heading }}
            >
              Theme Elements
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Typography</h3>
                  <div className="space-y-2">
                    <p 
                      className="text-lg"
                      style={{ fontFamily: theme.fontFamily.heading }}
                    >
                      Heading Font: {theme.fontFamily.heading}
                    </p>
                    <p 
                      className="text-base"
                      style={{ fontFamily: theme.fontFamily.body }}
                    >
                      Body Font: {theme.fontFamily.body}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Colors</h3>
                  <div className="flex gap-2">
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: theme.accentColor }}
                    />
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: theme.backgroundColor }}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Buttons & Elements</h3>
                  <div className="space-y-2">
                    <button
                      className={`w-full ${theme.buttonStyle}`}
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      Button Style
                    </button>
                    <div 
                      className="h-1 w-full"
                      style={{ border: theme.accentElements.dividers }}
                    />
                    <div className="flex gap-2">
                      <span className={theme.accentElements.icons}>Icon 1</span>
                      <span className={theme.accentElements.icons}>Icon 2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 