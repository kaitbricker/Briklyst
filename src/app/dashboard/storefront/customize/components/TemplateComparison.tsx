import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { templates } from '@/config/storefrontTemplates'
import TemplatePreview from './TemplatePreview'
import { ArrowLeftRight, RefreshCw, SplitSquareHorizontal } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface TemplateComparisonProps {
  onSelect: (templateId: string) => Promise<void>
}

export default function TemplateComparison({ onSelect }: TemplateComparisonProps) {
  const [leftTemplate, setLeftTemplate] = useState(templates[0].id)
  const [rightTemplate, setRightTemplate] = useState(templates[1].id)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [isSplitView, setIsSplitView] = useState(false)

  const handleSwap = () => {
    const temp = leftTemplate
    setLeftTemplate(rightTemplate)
    setRightTemplate(temp)
  }

  const handleReset = () => {
    setLeftTemplate(templates[0].id)
    setRightTemplate(templates[1].id)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Compare Templates</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="split-view"
              checked={isSplitView}
              onCheckedChange={setIsSplitView}
            />
            <Label htmlFor="split-view" className="flex items-center gap-2">
              <SplitSquareHorizontal className="w-4 h-4" />
              Split View
            </Label>
          </div>
          <Select value={previewMode} onValueChange={(value: 'desktop' | 'mobile') => setPreviewMode(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select preview mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desktop">Desktop View</SelectItem>
              <SelectItem value="mobile">Mobile View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleSwap} className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4" />
            Swap Templates
          </Button>
          <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>

      <div className={cn(
        "grid gap-6",
        isSplitView ? "grid-cols-2" : "grid-cols-1"
      )}>
        {/* Left Template */}
        <div className="space-y-4">
          <Select value={leftTemplate} onValueChange={setLeftTemplate}>
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <TemplatePreview
            selectedTemplate={leftTemplate}
            customizations={templates.find(t => t.id === leftTemplate)?.defaultColors}
            previewMode={previewMode}
          />
        </div>

        {/* Right Template */}
        <div className="space-y-4">
          <Select value={rightTemplate} onValueChange={setRightTemplate}>
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <TemplatePreview
            selectedTemplate={rightTemplate}
            customizations={templates.find(t => t.id === rightTemplate)?.defaultColors}
            previewMode={previewMode}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <Button onClick={() => onSelect(leftTemplate)}>Use Left Template</Button>
        <Button onClick={() => onSelect(rightTemplate)}>Use Right Template</Button>
      </div>
    </Card>
  )
} 