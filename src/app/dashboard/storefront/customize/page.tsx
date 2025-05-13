"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TemplatePicker from './components/TemplatePicker'
import TemplateComparison from './components/TemplateComparison'
import SectionManager from './components/SectionManager'
import BrandingSettings from './components/BrandingSettings'
import { useStorefrontCustomization } from '@/hooks/useStorefrontCustomization'
import { useToast } from '@/components/ui/use-toast'
import { nanoid } from 'nanoid'
import TemplateManager from './components/TemplateManager'
import TemplatePreview from './components/TemplatePreview'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import CollectionsManager from './components/CollectionsManager'

interface Section {
  id: string
  type: string
  title: string
  content: string
}

interface Theme {
  primaryColor: string
  secondaryColor: string
  fontFamily: string
}

interface Storefront {
  id: string
  name: string
  description: string
  logoUrl: string
  bannerUrl: string
  theme: Theme
  sections: Section[]
  collections: any[]
}

export default function CustomizePage() {
  const { toast } = useToast()
  const {
    customization,
    updateTemplate,
    updateCustomSections,
    updateBrandingAssets,
    updateCustomCSS,
    isLoading,
    error,
  } = useStorefrontCustomization()

  const [previewedTemplateId, setPreviewedTemplateId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [storefront, setStorefront] = useState<Storefront>({
    id: '1',
    name: 'My Store',
    description: 'Welcome to my store',
    logoUrl: '/placeholder-logo.png',
    bannerUrl: '/placeholder-banner.jpg',
    theme: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      fontFamily: 'Inter',
    },
    sections: [],
    collections: [],
  })

  const handleTemplateSelect = async (templateId: string) => {
    try {
      await updateTemplate(templateId)
      toast({
        title: 'Success',
        description: 'Template updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update template',
        variant: 'destructive',
      })
    }
  }

  const handleSaveTheme = async () => {
    setIsSaving(true)
    try {
      await updateTemplate(customization.templateId)
      await updateCustomSections(customization.customSections || [])
      await updateBrandingAssets(customization.brandingAssets)
      toast({
        title: 'Success',
        description: 'Theme saved and deployed successfully',
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

  const handleSectionUpdate = async (sections: any[]) => {
    try {
      await updateCustomSections(sections)
      toast({
        title: 'Success',
        description: 'Sections updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update sections',
        variant: 'destructive',
      })
    }
  }

  const handleAddSection = async (sectionType: string) => {
    try {
      const newSection = {
        id: crypto.randomUUID(),
        type: sectionType,
        content: {},
        order: customization.customSections?.length || 0,
      }
      await updateCustomSections([...(customization.customSections || []), newSection])
      toast({
        title: 'Success',
        description: 'Section added successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add section',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteSection = async (sectionId: string) => {
    try {
      const updatedSections = customization.customSections
        ?.filter((section) => section.id !== sectionId)
        .map((section, index) => ({
          ...section,
          order: index,
        })) || []
      await updateCustomSections(updatedSections)
      toast({
        title: 'Success',
        description: 'Section deleted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete section',
        variant: 'destructive',
      })
    }
  }

  const handleBrandingUpdate = async (updates: any) => {
    try {
      await updateBrandingAssets(updates)
      toast({
        title: 'Success',
        description: 'Branding updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update branding',
        variant: 'destructive',
      })
    }
  }

  const handleSaveTemplate = async (template: any) => {
    try {
      // TODO: Implement template saving
      toast({
        title: 'Success',
        description: 'Template saved successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save template',
        variant: 'destructive',
      })
    }
  }

  const handleLoadTemplate = async (templateId: string) => {
    try {
      // TODO: Implement template loading
      toast({
        title: 'Success',
        description: 'Template loaded successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load template',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteTemplate = async (templateId: string) => {
    try {
      // TODO: Implement template deletion
      toast({
        title: 'Success',
        description: 'Template deleted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete template',
        variant: 'destructive',
      })
    }
  }

  const handleShareTemplate = async (templateId: string) => {
    try {
      // TODO: Implement template sharing
      return 'https://example.com/share/template/' + templateId
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to share template',
        variant: 'destructive',
      })
      throw error
    }
  }

  const handleTemplatePreview = (templateId: string) => {
    setPreviewedTemplateId(templateId)
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
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
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

      <div className="grid gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Theme Settings</h2>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-bold">Primary Color</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="color"
                  value={storefront.theme.primaryColor}
                  onChange={(e) =>
                    setStorefront((prev) => ({
                      ...prev,
                      theme: { ...prev.theme, primaryColor: e.target.value },
                    }))
                  }
                  className="w-20 h-10 p-1"
                />
                <Input
                  value={storefront.theme.primaryColor}
                  onChange={(e) =>
                    setStorefront((prev) => ({
                      ...prev,
                      theme: { ...prev.theme, primaryColor: e.target.value },
                    }))
                  }
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold">Secondary Color</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="color"
                  value={storefront.theme.secondaryColor}
                  onChange={(e) =>
                    setStorefront((prev) => ({
                      ...prev,
                      theme: { ...prev.theme, secondaryColor: e.target.value },
                    }))
                  }
                  className="w-20 h-10 p-1"
                />
                <Input
                  value={storefront.theme.secondaryColor}
                  onChange={(e) =>
                    setStorefront((prev) => ({
                      ...prev,
                      theme: { ...prev.theme, secondaryColor: e.target.value },
                    }))
                  }
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold">Font Family</label>
              <select
                value={storefront.theme.fontFamily}
                onChange={(e) =>
                  setStorefront((prev) => ({
                    ...prev,
                    theme: { ...prev.theme, fontFamily: e.target.value },
                  }))
                }
                className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>
          </div>
        </Card>

        <CollectionsManager
          collections={storefront.collections}
          allProducts={[]} // TODO: Fetch products from your data source
          onUpdate={handleUpdateCollections}
        />
      </div>
    </div>
  )
} 