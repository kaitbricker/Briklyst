"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Save, RefreshCw, Settings, LayoutGrid } from 'lucide-react'
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
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('theme')
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
      buttonShape: 'border-radius: 8px; background: linear-gradient(45deg, #000000, #333333); color: #FFFFFF;',
      buttonHover: 'transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);',
      imageBorder: 'border: 1px solid #000000; border-radius: 12px;',
      imageShadow: 'box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);',
      divider: 'border-bottom: 1px solid #000000;',
      card: 'border-radius: 12px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); background: linear-gradient(135deg, #FFFFFF, #F8F9FA);',
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

  // Simulate loading storefront data
  useEffect(() => {
    const loadStorefrontData = async () => {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load storefront data',
          variant: 'destructive',
        })
        setIsLoading(false)
      }
    }

    loadStorefrontData()
  }, [toast])

  const handleSaveTheme = async () => {
    setIsSaving(true)
    try {
      // TODO: Implement theme saving logic
      await new Promise(resolve => setTimeout(resolve, 1000))
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
    } finally {
      setIsSaving(false)
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

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ border: '4px solid red', borderRadius: 12 }}>
        <div className="bg-red-100 text-red-700 font-bold p-2 rounded mb-2 text-center w-full">DEBUG MODE: CustomizePage</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your storefront...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto py-8 space-y-8"
      style={{ border: '4px solid red', borderRadius: 12 }}
    >
      <div className="bg-red-100 text-red-700 font-bold p-2 rounded mb-2 text-center w-full">DEBUG MODE: CustomizePage</div>
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold">Customize Storefront</h1>
          <p className="text-muted-foreground">Customize your storefront appearance and content</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={handleSaveTheme}
            disabled={isSaving}
            className="gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </motion.div>
      </div>

      <Tabs
        defaultValue="theme"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="theme" className="gap-2">
            <Settings className="h-4 w-4" />
            Theme
          </TabsTrigger>
          <TabsTrigger value="collections" className="gap-2">
            <LayoutGrid className="h-4 w-4" />
            Collections
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="theme" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ThemeSelector
                selectedTheme={selectedTheme}
                onSelectTheme={setSelectedTheme}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Live Preview</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh Preview
                  </Button>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <ThemePreview
                    theme={selectedTheme}
                    storefrontData={storefront}
                  />
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="collections">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <CollectionsManager
                collections={storefront.collections || []}
                allProducts={storefront.products}
                onUpdate={handleUpdateCollections}
              />
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  )
} 