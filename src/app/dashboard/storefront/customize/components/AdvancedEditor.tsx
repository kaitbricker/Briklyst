'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

interface Section {
  id: string
  type: string
  content: any
  order: number
}

interface AdvancedEditorProps {
  sections?: Section[]
  customCSS?: string
  onUpdateSections: (sections: Section[]) => Promise<void>
  onUpdateCSS: (css: string) => Promise<void>
  settings: {
    customCSS?: string
    customClasses?: string
    metaTags?: {
      title?: string
      description?: string
      keywords?: string
    }
    analytics?: {
      googleAnalyticsId?: string
      facebookPixelId?: string
    }
  }
  onUpdate: (updates: Partial<AdvancedEditorProps['settings']>) => Promise<void>
}

const sectionTypes = [
  { id: 'hero', name: 'Hero Section', description: 'Large banner with headline and image' },
  { id: 'products', name: 'Products Grid', description: 'Grid layout for products' },
  { id: 'featured', name: 'Featured Products', description: 'Highlight specific products' },
  { id: 'testimonials', name: 'Testimonials', description: 'Customer reviews and feedback' },
  { id: 'newsletter', name: 'Newsletter Signup', description: 'Email subscription form' },
  { id: 'social', name: 'Social Feed', description: 'Social media content feed' },
  { id: 'collab', name: 'Collaboration', description: 'Partner or collaboration showcase' },
]

export default function AdvancedEditor({
  sections = [],
  customCSS = '',
  onUpdateSections,
  onUpdateCSS,
  settings = {},
  onUpdate,
}: AdvancedEditorProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [localCSS, setLocalCSS] = useState(customCSS)

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order numbers
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }))

    setIsUpdating(true)
    try {
      await onUpdateSections(updatedItems)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleAddSection = async (type: string) => {
    const newSection: Section = {
      id: crypto.randomUUID(),
      type,
      content: {},
      order: sections.length,
    }

    setIsUpdating(true)
    try {
      await onUpdateSections([...sections, newSection])
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemoveSection = async (id: string) => {
    setIsUpdating(true)
    try {
      const updatedSections = sections
        .filter((section) => section.id !== id)
        .map((section, index) => ({
          ...section,
          order: index,
        }))
      await onUpdateSections(updatedSections)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCSSChange = async (value: string) => {
    setLocalCSS(value)
    setIsUpdating(true)
    try {
      await onUpdateCSS(value)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleUpdate = async (key: string, value: any) => {
    await onUpdate({ ...settings, [key]: value })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Advanced Editor</h2>
        <p className="text-sm text-muted-foreground">
          Customize your storefront with drag-and-drop sections and custom CSS
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Sections Editor */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium">Sections</h3>
            <div className="flex gap-2">
              {sectionTypes.map((type) => (
                <Button
                  key={type.id}
                  size="sm"
                  variant="outline"
                  onClick={() => handleAddSection(type.id)}
                  disabled={isUpdating}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {type.name}
                </Button>
              ))}
            </div>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {sections.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center gap-2 rounded-lg border bg-card p-4"
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-grab"
                          >
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">
                              {sectionTypes.find((t) => t.id === section.type)?.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {sectionTypes.find((t) => t.id === section.type)?.description}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveSection(section.id)}
                            disabled={isUpdating}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Card>

        {/* Custom CSS Editor */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Custom CSS</h3>
          <div className="space-y-4">
            <Label>Custom CSS</Label>
            <Textarea
              value={settings.customCSS || ''}
              onChange={(e) => handleCSSChange(e.target.value)}
              placeholder="Enter your custom CSS here..."
              className="font-mono"
              rows={10}
            />
          </div>
          <div>
            <Label>Custom Classes</Label>
            <Input
              value={settings.customClasses || ''}
              onChange={(e) => handleUpdate('customClasses', e.target.value)}
              placeholder="Enter custom classes (space-separated)"
            />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Meta Tags</h3>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={settings.metaTags?.title || ''}
              onChange={(e) =>
                handleUpdate('metaTags', {
                  ...settings.metaTags,
                  title: e.target.value,
                })
              }
              placeholder="Enter page title"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={settings.metaTags?.description || ''}
              onChange={(e) =>
                handleUpdate('metaTags', {
                  ...settings.metaTags,
                  description: e.target.value,
                })
              }
              placeholder="Enter meta description"
              rows={3}
            />
          </div>
          <div>
            <Label>Keywords</Label>
            <Input
              value={settings.metaTags?.keywords || ''}
              onChange={(e) =>
                handleUpdate('metaTags', {
                  ...settings.metaTags,
                  keywords: e.target.value,
                })
              }
              placeholder="Enter keywords (comma-separated)"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Analytics</h3>
        <div className="space-y-4">
          <div>
            <Label>Google Analytics ID</Label>
            <Input
              value={settings.analytics?.googleAnalyticsId || ''}
              onChange={(e) =>
                handleUpdate('analytics', {
                  ...settings.analytics,
                  googleAnalyticsId: e.target.value,
                })
              }
              placeholder="Enter Google Analytics ID"
            />
          </div>
          <div>
            <Label>Facebook Pixel ID</Label>
            <Input
              value={settings.analytics?.facebookPixelId || ''}
              onChange={(e) =>
                handleUpdate('analytics', {
                  ...settings.analytics,
                  facebookPixelId: e.target.value,
                })
              }
              placeholder="Enter Facebook Pixel ID"
            />
          </div>
        </div>
      </Card>
    </div>
  )
} 