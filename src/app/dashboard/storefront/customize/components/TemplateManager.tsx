import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Share2, Save, Trash2, Edit2, Copy, Download, Tag, History } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface Template {
  id: string
  name: string
  description?: string
  thumbnail?: string
  sections: any[]
  customCSS?: string
  isPublic?: boolean
  category?: string
  tags?: string[]
  versions?: {
    id: string
    name: string
    createdAt: string
    changes?: string
  }[]
  createdAt: string
  updatedAt: string
}

interface TemplateManagerProps {
  currentTemplate: any
  onSaveTemplate: (template: Partial<Template>) => Promise<void>
  onLoadTemplate: (templateId: string) => Promise<void>
  onDeleteTemplate: (templateId: string) => Promise<void>
  onShareTemplate: (templateId: string) => Promise<string>
}

const categories = [
  'E-commerce',
  'Portfolio',
  'Blog',
  'Landing Page',
  'Corporate',
  'Personal',
  'Other',
]

export default function TemplateManager({
  currentTemplate,
  onSaveTemplate,
  onLoadTemplate,
  onDeleteTemplate,
  onShareTemplate,
}: TemplateManagerProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [newTemplateName, setNewTemplateName] = useState('')
  const [newTemplateDescription, setNewTemplateDescription] = useState('')
  const [newTemplateCategory, setNewTemplateCategory] = useState('')
  const [newTemplateTags, setNewTemplateTags] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)

  const handleSaveTemplate = async () => {
    if (!newTemplateName) {
      toast({
        title: 'Error',
        description: 'Please enter a template name',
        variant: 'destructive',
      })
      return
    }

    setIsSaving(true)
    try {
      const template: Partial<Template> = {
        name: newTemplateName,
        description: newTemplateDescription,
        category: newTemplateCategory,
        tags: newTemplateTags.split(',').map(tag => tag.trim()).filter(Boolean),
        sections: currentTemplate.sections,
        customCSS: currentTemplate.customCSS,
        isPublic: false,
        versions: [
          {
            id: crypto.randomUUID(),
            name: 'Initial Version',
            createdAt: new Date().toISOString(),
            changes: 'Initial template creation',
          },
        ],
      }

      await onSaveTemplate(template)
      setNewTemplateName('')
      setNewTemplateDescription('')
      setNewTemplateCategory('')
      setNewTemplateTags('')
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
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveVersion = async (templateId: string, changes: string) => {
    const template = templates.find(t => t.id === templateId)
    if (!template) return

    const newVersion = {
      id: crypto.randomUUID(),
      name: `Version ${(template.versions?.length || 0) + 1}`,
      createdAt: new Date().toISOString(),
      changes,
    }

    const updatedTemplate = {
      ...template,
      versions: [...(template.versions || []), newVersion],
    }

    await onSaveTemplate(updatedTemplate)
    setSelectedVersion(newVersion.id)
    toast({
      title: 'Success',
      description: 'New version saved successfully',
    })
  }

  const handleLoadVersion = async (templateId: string, versionId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (!template) return

    const version = template.versions?.find(v => v.id === versionId)
    if (!version) return

    await onLoadTemplate(templateId)
    setSelectedVersion(versionId)
    toast({
      title: 'Success',
      description: 'Version loaded successfully',
    })
  }

  const handleShareTemplate = async (templateId: string) => {
    setIsSharing(true)
    try {
      const url = await onShareTemplate(templateId)
      setShareUrl(url)
      toast({
        title: 'Success',
        description: 'Template shared successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to share template',
        variant: 'destructive',
      })
    } finally {
      setIsSharing(false)
    }
  }

  const handleCopyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: 'Success',
      description: 'Share URL copied to clipboard',
    })
  }

  const handleDownloadTemplate = (template: Template) => {
    const data = JSON.stringify(template, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredTemplates = templates.filter(template => {
    if (selectedCategory === 'all') return true
    return template.category === selectedCategory
  })

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Template Manager</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Template Name</Label>
                <Input
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  placeholder="Enter template name"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={newTemplateDescription}
                  onChange={(e) => setNewTemplateDescription(e.target.value)}
                  placeholder="Enter template description"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newTemplateCategory} onValueChange={setNewTemplateCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tags (comma-separated)</Label>
                <Input
                  value={newTemplateTags}
                  onChange={(e) => setNewTemplateTags(e.target.value)}
                  placeholder="Enter tags (e.g., modern, responsive, dark)"
                />
              </div>
              <Button
                onClick={handleSaveTemplate}
                disabled={isSaving || !newTemplateName}
                className="w-full"
              >
                {isSaving ? 'Saving...' : 'Save Template'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="my-templates">
        <TabsList>
          <TabsTrigger value="my-templates">My Templates</TabsTrigger>
          <TabsTrigger value="shared">Shared Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="my-templates">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {filteredTemplates
                .filter((t) => !t.isPublic)
                .map((template) => (
                  <Card key={template.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        {template.description && (
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          {template.category && (
                            <Badge variant="secondary">
                              <Tag className="w-3 h-3 mr-1" />
                              {template.category}
                            </Badge>
                          )}
                          {template.tags?.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Last updated: {new Date(template.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <History className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Version History</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              {template.versions?.map((version) => (
                                <div
                                  key={version.id}
                                  className="flex items-center justify-between p-2 border rounded-md"
                                >
                                  <div>
                                    <p className="font-medium">{version.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {version.changes}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(version.createdAt).toLocaleString()}
                                    </p>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleLoadVersion(template.id, version.id)}
                                  >
                                    Load
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onLoadTemplate(template.id)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShareTemplate(template.id)}
                          disabled={isSharing}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadTemplate(template)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteTemplate(template.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="shared">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {filteredTemplates
                .filter((t) => t.isPublic)
                .map((template) => (
                  <Card key={template.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        {template.description && (
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          {template.category && (
                            <Badge variant="secondary">
                              <Tag className="w-3 h-3 mr-1" />
                              {template.category}
                            </Badge>
                          )}
                          {template.tags?.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Created: {new Date(template.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onLoadTemplate(template.id)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadTemplate(template)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Share URL Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-4">
            <Share2 className="w-4 h-4 mr-2" />
            Share Template
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Share URL</Label>
              <div className="flex gap-2">
                <Input value={shareUrl} readOnly />
                <Button onClick={handleCopyShareUrl}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
} 