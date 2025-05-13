'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { templates } from '@/config/storefrontTemplates'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface TemplatePickerProps {
  currentTemplate: string
  onSelect: (templateId: string) => Promise<void>
  onPreview: (templateId: string) => void
}

export default function TemplatePicker({
  currentTemplate,
  onSelect,
  onPreview,
}: TemplatePickerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(currentTemplate)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleSelect = async (templateId: string) => {
    setSelectedTemplate(templateId)
    setIsUpdating(true)
    try {
      await onSelect(templateId)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Choose a Template</h2>
        <p className="text-sm text-muted-foreground">
          Select a template to use as the base for your storefront
        </p>
      </div>

      <ScrollArea className="h-[600px] rounded-md border p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={cn(
                'relative cursor-pointer overflow-hidden transition-all hover:shadow-lg',
                selectedTemplate === template.id && 'ring-2 ring-primary'
              )}
              onClick={() => handleSelect(template.id)}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src={template.previewImage}
                  alt={template.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{template.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
              <div className="absolute right-2 top-2 flex flex-col gap-2">
                {selectedTemplate === template.id && (
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Selected'}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={e => {
                    e.stopPropagation()
                    onPreview(template.id)
                  }}
                >
                  Preview
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 