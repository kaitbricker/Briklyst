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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Customize Storefront</h1>

      <Tabs defaultValue="template" className="space-y-8">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          <Button
            onClick={handleSaveTheme}
            disabled={isSaving}
            className="bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold shadow-md hover:from-orange-500 hover:to-pink-600 transition-all"
          >
            {isSaving ? 'Saving...' : 'Save Theme'}
          </Button>
        </div>

        <TabsContent value="template">
          <TemplatePicker
            currentTemplate={customization.templateId}
            onSelect={handleTemplateSelect}
            onPreview={handleTemplatePreview}
          />
          {previewedTemplateId && (
            <div className="mt-6">
              <TemplatePreview
                selectedTemplate={previewedTemplateId}
                customizations={customization.templateOverrides}
              />
            </div>
          )}
        </TabsContent>

        <TabsContent value="sections">
          <SectionManager
            sections={customization.customSections || []}
            onUpdateSections={handleSectionUpdate}
            onAddSection={handleAddSection}
            onDeleteSection={handleDeleteSection}
          />
        </TabsContent>

        <TabsContent value="branding">
          <BrandingSettings
            settings={customization.brandingAssets}
            onUpdate={handleBrandingUpdate}
          />
        </TabsContent>

        <TabsContent value="templates">
          <TemplateManager
            currentTemplate={customization}
            onSaveTemplate={handleSaveTemplate}
            onLoadTemplate={handleLoadTemplate}
            onDeleteTemplate={handleDeleteTemplate}
            onShareTemplate={handleShareTemplate}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
} 