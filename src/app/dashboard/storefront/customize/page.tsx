"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSelector, { Theme } from './components/ThemeSelector'
import ThemePreview from './components/ThemePreview'
import CollectionsManager from './components/CollectionsManager'

interface Storefront {
  id: string
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
  collections: Array<{
    id: string
    name: string
    products: string[]
  }>
}

export default function CustomizePage() {
  const { toast } = useToast()
  const [selectedTheme, setSelectedTheme] = useState<Theme>({
    id: 'elevate',
    name: '🌟 Briklyst Default: Elevate',
    description: 'The signature theme for Briklyst, designed for ambitious creators',
    vibe: 'Sleek, professional, and impactful',
    typography: {
      header: 'Poppins',
      body: 'Inter',
      button: 'Inter',
    },
    colors: {
      primary: '#000000',
      secondary: '#FFFFFF',
      background: '#FFFFFF',
      text: '#000000',
      accent: '#FFD700',
    },
    styles: {
      buttonShape: 'border-radius: 8px;',
      buttonHover: 'transform: translateY(-2px);',
      imageBorder: 'border: 1px solid #000000;',
      imageShadow: 'box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);',
      divider: 'border-bottom: 1px solid #000000;',
      card: 'border-radius: 12px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);',
    },
  })

  const [storefront, setStorefront] = useState<Storefront>({
    id: '1',
    name: 'My Store',
    description: 'Welcome to my store',
    logoUrl: '/placeholder-logo.png',
    bannerUrl: '/placeholder-banner.jpg',
    socials: {
      instagram: '@myinstagram',
      twitter: '@mytwitter',
      tiktok: '@mytiktok',
    },
    products: [
      {
        id: '1',
        title: 'Product 1',
        price: 99.99,
        imageUrl: '/placeholder-product.jpg',
      },
      {
        id: '2',
        title: 'Product 2',
        price: 149.99,
        imageUrl: '/placeholder-product.jpg',
      },
      {
        id: '3',
        title: 'Product 3',
        price: 199.99,
        imageUrl: '/placeholder-product.jpg',
      },
    ],
    collections: [],
  })

  const handleSaveTheme = async () => {
    try {
      // TODO: Implement theme saving logic
      toast({
        title: 'Success',
        description: 'Theme saved successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save theme',
        variant: 'destructive',
      })
    }
  }

  const handleUpdateCollections = async (collections: any[]) => {
    try {
      setStorefront(prev => ({
        ...prev,
        collections,
      }))
      toast({
        title: 'Success',
        description: 'Collections updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update collections',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customize Storefront</h1>
          <p className="text-muted-foreground">Customize your storefront appearance and content</p>
        </div>
        <Button onClick={handleSaveTheme}>Save Changes</Button>
      </div>

      <Tabs defaultValue="theme" className="space-y-8">
        <TabsList>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="space-y-8">
          <ThemeSelector
            selectedTheme={selectedTheme}
            onSelectTheme={setSelectedTheme}
          />
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
            <div className="border rounded-lg overflow-hidden">
              <ThemePreview
                theme={selectedTheme}
                storefrontData={storefront}
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="collections">
          <CollectionsManager
            collections={storefront.collections || []}
            allProducts={storefront.products}
            onUpdate={handleUpdateCollections}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
} 