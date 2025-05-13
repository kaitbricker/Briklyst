'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Theme {
  id: string
  name: string
  description: string
  typography: {
    header: string
    body: string
    button: string
  }
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    accent: string
  }
  styles: {
    buttonShape: string
    buttonHover: string
    imageBorder: string
    imageShadow: string
    divider: string
    card: string
  }
}

interface ThemePreviewProps {
  theme: Theme
  storefrontData: {
    name: string
    description: string
    logoUrl: string
    bannerUrl: string
    socials: {
      instagram?: string
      twitter?: string
      tiktok?: string
    }
    products: Array<{
      id: string
      title: string
      price: number
      imageUrl: string
    }>
  }
}

export default function ThemePreview({ theme, storefrontData }: ThemePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto"
      style={{
        fontFamily: theme.typography.body,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      {/* Header */}
      <div className="relative h-64 w-full">
        <Image
          src={storefrontData.bannerUrl}
          alt="Banner"
          fill
          className="object-cover"
          style={{
            filter: 'brightness(0.8)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1
              className="text-4xl font-bold mb-2"
              style={{
                fontFamily: theme.typography.header,
                color: theme.colors.primary,
              }}
            >
              {storefrontData.name}
            </h1>
            <p className="text-lg opacity-90">{storefrontData.description}</p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="relative -mt-16 px-6">
        <div className="flex items-end gap-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4"
            style={{
              borderColor: theme.colors.background,
              boxShadow: theme.styles.imageShadow,
            }}
          >
            <Image
              src={storefrontData.logoUrl}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex gap-2 mb-4">
            {storefrontData.socials.instagram && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                style={{
                  fontFamily: theme.typography.button,
                  ...theme.styles.buttonShape,
                }}
              >
                Instagram
              </Button>
            )}
            {storefrontData.socials.twitter && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                style={{
                  fontFamily: theme.typography.button,
                  ...theme.styles.buttonShape,
                }}
              >
                Twitter
              </Button>
            )}
            {storefrontData.socials.tiktok && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                style={{
                  fontFamily: theme.typography.button,
                  ...theme.styles.buttonShape,
                }}
              >
                TikTok
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-6 py-8">
        <h2
          className="text-2xl font-bold mb-6"
          style={{
            fontFamily: theme.typography.header,
            color: theme.colors.primary,
          }}
        >
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storefrontData.products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden"
              style={{
                ...theme.styles.card,
              }}
            >
              <div className="relative h-48">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover"
                  style={{
                    ...theme.styles.imageBorder,
                  }}
                />
              </div>
              <div className="p-4">
                <h3
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: theme.typography.header,
                  }}
                >
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: theme.colors.accent,
                      color: theme.colors.primary,
                    }}
                  >
                    ${product.price}
                  </Badge>
                  <Button
                    size="sm"
                    style={{
                      fontFamily: theme.typography.button,
                      ...theme.styles.buttonShape,
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  )
} 