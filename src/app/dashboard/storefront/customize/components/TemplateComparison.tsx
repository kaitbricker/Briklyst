import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { templates } from '@/config/storefrontTemplates'
import { cn } from '@/lib/utils'

interface TemplateComparisonProps {
  selectedTemplate: string
  onSelect: (templateId: string) => void
}

export default function TemplateComparison({
  selectedTemplate,
  onSelect,
}: TemplateComparisonProps) {
  const [comparisonTemplates, setComparisonTemplates] = useState<string[]>([])

  const addToComparison = (templateId: string) => {
    if (comparisonTemplates.length < 2 && !comparisonTemplates.includes(templateId)) {
      setComparisonTemplates([...comparisonTemplates, templateId])
    }
  }

  const removeFromComparison = (templateId: string) => {
    setComparisonTemplates(comparisonTemplates.filter((id) => id !== templateId))
  }

  const getTemplateData = (templateId: string) => {
    return templates.find((t) => t.id === templateId)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Compare Templates</h2>
        <p className="text-sm text-muted-foreground">
          Select up to 2 templates to compare side by side
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {comparisonTemplates.map((templateId) => {
          const template = getTemplateData(templateId)
          if (!template) return null

          return (
            <Card key={templateId} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10"
                onClick={() => removeFromComparison(templateId)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="aspect-video relative">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {template.description}
                </p>
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Colors</h4>
                    <div className="flex gap-2">
                      {Object.entries(template.defaultColors).map(([key, value]) => (
                        <div
                          key={key}
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: value }}
                          title={`${key}: ${value}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Fonts</h4>
                    <div className="text-sm">
                      <p>Heading: {template.defaultFonts.heading}</p>
                      <p>Body: {template.defaultFonts.body}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Layout</h4>
                    <div className="text-sm">
                      <p>Spacing: {template.defaultLayout.spacing}</p>
                      <p>Container: {template.defaultLayout.containerWidth}</p>
                      <p>Border Radius: {template.defaultLayout.borderRadius}</p>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => onSelect(templateId)}
                  variant={selectedTemplate === templateId ? 'default' : 'outline'}
                >
                  {selectedTemplate === templateId ? 'Selected' : 'Select Template'}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              'cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-primary',
              comparisonTemplates.includes(template.id) && 'ring-2 ring-primary'
            )}
            onClick={() => addToComparison(template.id)}
          >
            <div className="aspect-video relative">
              <img
                src={template.previewImage}
                alt={template.name}
                className="object-cover w-full h-full rounded-t-lg"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 