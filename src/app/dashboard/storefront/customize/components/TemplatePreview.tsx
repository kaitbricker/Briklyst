import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { templates } from '@/config/templates'

interface TemplatePreviewProps {
  selectedTemplate: string
  customizations?: {
    colors?: {
      primary?: string
      secondary?: string
      accent?: string
      background?: string
      text?: string
    }
    fonts?: {
      heading?: string
      body?: string
    }
    layout?: {
      spacing?: string
      containerWidth?: string
      borderRadius?: string
    }
  }
}

export default function TemplatePreview({
  selectedTemplate,
  customizations,
}: TemplatePreviewProps) {
  const template = templates.find((t) => t.id === selectedTemplate)

  if (!template) return null

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Template Preview</h3>
      <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
        <img
          src={template.previewImage}
          alt={template.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="mt-4">
        <h4 className="font-medium">{template.name}</h4>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </div>
      <div className="mt-4 space-y-2">
        <h5 className="text-sm font-medium">Features:</h5>
        <ul className="text-sm text-muted-foreground space-y-1">
          {template.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </Card>
  )
} 