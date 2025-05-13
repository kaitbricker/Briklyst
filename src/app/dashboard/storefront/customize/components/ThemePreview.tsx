'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Theme } from '@/lib/themes'
import Image from 'next/image'

interface ThemePreviewProps {
  theme: Theme
  storefrontData: any
}

export default function ThemePreview({ theme, storefrontData }: ThemePreviewProps) {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="relative">
            <div className="aspect-[21/9] relative overflow-hidden rounded-lg">
              <Image
                src={storefrontData?.bannerUrl || '/placeholder-banner.png'}
                alt="Store Banner"
                fill
                className="object-cover"
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
                className="w-32 h-32 rounded-full overflow-hidden relative"
                style={{
                  border: theme.imageStyle.border,
                  boxShadow: theme.imageStyle.shadow,
                }}
              >
                <Image
                  src={storefrontData?.logoUrl || '/placeholder-logo.png'}
                  alt="Store Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className="pt-20">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: theme.fontFamily.heading, color: theme.textColor }}
            >
              {storefrontData?.name}
            </h1>
            <p 
              className="text-lg"
              style={{ fontFamily: theme.fontFamily.body, color: theme.textColor }}
            >
              {storefrontData?.description}
            </p>
          </div>

          {/* Social Links */}
          {storefrontData?.socials && (
            <div className="flex gap-4">
              {storefrontData.socials.instagram && (
                <a 
                  href={storefrontData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.textColor }}
                  className="hover:underline"
                >
                  Instagram
                </a>
              )}
              {storefrontData.socials.twitter && (
                <a 
                  href={storefrontData.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.textColor }}
                  className="hover:underline"
                >
                  Twitter
                </a>
              )}
              {storefrontData.socials.tiktok && (
                <a 
                  href={storefrontData.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.textColor }}
                  className="hover:underline"
                >
                  TikTok
                </a>
              )}
            </div>
          )}

          {/* Featured Products */}
          <div className="space-y-4">
            <h2 
              className="text-2xl font-bold"
              style={{ fontFamily: theme.fontFamily.heading }}
            >
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {storefrontData?.products?.slice(0, 3).map((product: any) => (
                <Card key={product.id} className="overflow-hidden">
                  <div 
                    className="aspect-square relative"
                    style={{
                      border: theme.imageStyle.border,
                      boxShadow: theme.imageStyle.shadow,
                    }}
                  >
                    <Image
                      src={product.imageUrl || '/placeholder-product.png'}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 
                      className="font-semibold"
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