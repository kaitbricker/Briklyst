"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useStorefrontSettings } from '@/hooks/useStorefrontSettings'
import TemplatePreview from '@/app/dashboard/storefront/customize/components/TemplatePreview'
import TemplateComparison from '@/app/dashboard/storefront/customize/components/TemplateComparison'
import SectionEditor from '@/app/dashboard/storefront/customize/components/SectionEditor'
import BrandingSettings from '@/app/dashboard/storefront/customize/components/BrandingSettings'
import AdvancedEditor from '@/app/dashboard/storefront/customize/components/AdvancedEditor'
import { sectionTypes } from '@/config/sectionTypes'
import { Plus } from 'lucide-react'

export default function CustomizePage() {
  const { settings, updateSettings, isLoading } = useStorefrontSettings()
  const [activeTab, setActiveTab] = useState('templates')

  const handleTemplateUpdate = async (templateId: string) => {
    await updateSettings({ templateId })
  }

  const handleSectionUpdate = async (sectionId: string, updates: any) => {
    const updatedSections = settings?.sections.map((section) =>
      section.id === sectionId ? { ...section, ...updates } : section
    )
    await updateSettings({ sections: updatedSections })
  }

  const handleSectionDelete = async (sectionId: string) => {
    const updatedSections = settings?.sections.filter(
      (section) => section.id !== sectionId
    )
    await updateSettings({ sections: updatedSections })
  }

  const handleAddSection = async (type: string) => {
    const sectionType = sectionTypes.find((t) => t.id === type)
    if (!sectionType) return

    const newSection = {
      id: crypto.randomUUID(),
      type,
      content: sectionType.defaultContent,
      order: (settings?.sections.length || 0) + 1,
    }

    await updateSettings({
      sections: [...(settings?.sections || []), newSection],
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Customize Storefront</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TemplatePreview
              selectedTemplate={settings?.templateId || 'minimal'}
              customizations={settings?.templateOverrides}
            />
            <TemplateComparison
              selectedTemplate={settings?.templateId || 'minimal'}
              onSelect={handleTemplateUpdate}
            />
          </div>
        </TabsContent>

        <TabsContent value="sections" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Page Sections</h2>
              <div className="flex items-center gap-2">
                {sectionTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSection(type.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add {type.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {settings?.sections.map((section) => (
                <SectionEditor
                  key={section.id}
                  section={section}
                  onUpdate={(updates) => handleSectionUpdate(section.id, updates)}
                  onDelete={() => handleSectionDelete(section.id)}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="branding" className="mt-6">
          <BrandingSettings
            assets={settings?.branding || {}}
            onUpdate={async (updates) => {
              await updateSettings({ branding: updates })
            }}
          />
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <AdvancedEditor
            settings={settings || {}}
            onUpdate={async (updates) => {
              await updateSettings(updates)
            }}
            onUpdateSections={async (sections) => {
              await updateSettings({ sections })
            }}
            onUpdateCSS={async (css) => {
              await updateSettings({ customCSS: css })
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
} 