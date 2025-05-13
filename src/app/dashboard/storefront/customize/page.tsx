"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Save, RefreshCw, Settings, LayoutGrid, User, Image as ImageIcon } from 'lucide-react'
import ThemeSelector from './components/ThemeSelector'
import ThemePreview from './components/ThemePreview'
import CollectionsManager from './components/CollectionsManager'
import { Theme } from '@/lib/themes'
import { themes } from '@/lib/themes'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/ui/image-upload'

interface Storefront {
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

export default function CustomizePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('theme')
  const [storefront, setStorefront] = useState<Storefront | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0])
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  useEffect(() => {
    const fetchStorefront = async () => {
      try {
        const response = await fetch('/api/storefront')
        if (!response.ok) {
          throw new Error('Failed to fetch storefront')
        }
        const data = await response.json()
        setStorefront(data)
        setSelectedTheme(data.theme || themes[0])
      } catch (error) {
        console.error('Error fetching storefront:', error)
        toast({
          title: 'Error',
          description: 'Failed to load storefront data',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStorefront()
  }, [toast])

  const handleSaveTheme = async () => {
    if (!storefront) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/storefront/theme', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storefrontId: storefront.id,
          themeId: selectedTheme.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save theme')
      }

      // Update local storefront state with new theme
      setStorefront(prev => ({
        ...prev!,
        theme: selectedTheme
      }))

      toast({
        title: 'Success',
        description: 'Theme saved successfully',
      })
    } catch (error) {
      console.error('Error saving theme:', error)
      toast({
        title: 'Error',
        description: 'Failed to save theme',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdateProfile = async () => {
    if (!storefront) return

    setIsUpdatingProfile(true)
    try {
      const response = await fetch('/api/storefront/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storefrontId: storefront.id,
          bio: storefront.description,
          logoUrl: storefront.logoUrl,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      })
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  // Create a derived previewStorefront for live preview
  const previewStorefront = storefront && selectedTheme ? {
    ...storefront,
    theme: selectedTheme,
    primaryColor: selectedTheme.primaryColor,
    accentColor: selectedTheme.accentColor,
    backgroundColor: selectedTheme.backgroundColor,
    textColor: selectedTheme.textColor,
    fontFamily: selectedTheme.fontFamily,
  } : storefront;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading storefront data...</p>
        </div>
      </div>
    )
  }

  if (!storefront) {
    return (
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">No storefront data found</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customize Storefront</h1>
          <p className="text-muted-foreground mt-1">
            Customize your storefront&apos;s appearance and layout
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="theme"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="theme" className="gap-2">
            <Settings className="h-4 w-4" />
            Theme
          </TabsTrigger>
          <TabsTrigger value="details" className="gap-2">
            <User className="h-4 w-4" />
            Storefront Details
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
                onSaveTheme={handleSaveTheme}
                isSaving={isSaving}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ThemePreview
                theme={selectedTheme}
                storefrontData={previewStorefront}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="details">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload a profile picture for your storefront
                  </p>
                  <div className="mt-4">
                    <ImageUpload
                      value={storefront?.logoUrl}
                      onChange={(url) => {
                        setStorefront(prev => ({
                          ...prev!,
                          logoUrl: url
                        }))
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Bio</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Write a brief description about your storefront
                  </p>
                  <div className="mt-4">
                    <Textarea
                      value={storefront?.description || ''}
                      onChange={(e) => {
                        setStorefront(prev => ({
                          ...prev!,
                          description: e.target.value
                        }))
                      }}
                      placeholder="Tell visitors about your storefront..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleUpdateProfile}
                  disabled={isUpdatingProfile}
                  className="w-full"
                >
                  {isUpdatingProfile ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating Profile...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile Changes
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="collections">
            <CollectionsManager
              collections={storefront?.collections || []}
              onUpdateCollections={(collections) => {
                setStorefront(prev => ({
                  ...prev!,
                  collections
                }))
              }}
            />
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  )
} 