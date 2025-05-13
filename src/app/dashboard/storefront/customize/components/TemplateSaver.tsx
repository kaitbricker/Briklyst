import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Share2, Save, Trash2 } from 'lucide-react'
import { StorefrontSettings } from '@/types/storefront'

interface TemplateSaverProps {
  settings: StorefrontSettings
  onSave: (template: {
    name: string
    description: string
    settings: Partial<StorefrontSettings>
  }) => Promise<void>
  onShare: (templateId: string) => Promise<void>
  onDelete: (templateId: string) => Promise<void>
  savedTemplates: Array<{
    id: string
    name: string
    description: string
    createdAt: Date
  }>
}

export default function TemplateSaver({
  settings,
  onSave,
  onShare,
  onDelete,
  savedTemplates,
}: TemplateSaverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [templateDescription, setTemplateDescription] = useState('')

  const handleSave = async () => {
    if (!templateName) return

    setIsSaving(true)
    try {
      await onSave({
        name: templateName,
        description: templateDescription,
        settings: {
          templateId: settings.templateId,
          templateOverrides: settings.templateOverrides,
          branding: settings.branding,
          layout: settings.layout,
          typography: settings.typography,
          sections: settings.sections,
          customCSS: settings.customCSS,
        },
      })
      setIsOpen(false)
      setTemplateName('')
      setTemplateDescription('')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Saved Templates</h3>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Current Design
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Template Name</Label>
                  <Input
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Enter template name"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={templateDescription}
                    onChange={(e) => setTemplateDescription(e.target.value)}
                    placeholder="Enter template description"
                    rows={3}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleSave}
                  disabled={isSaving || !templateName}
                >
                  {isSaving ? 'Saving...' : 'Save Template'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {savedTemplates.map((template) => (
            <Card key={template.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Saved on {template.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onShare(template.id)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
} 