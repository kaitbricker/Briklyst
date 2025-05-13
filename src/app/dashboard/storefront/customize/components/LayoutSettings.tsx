'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'

interface LayoutSettings {
  headerStyle?: 'minimal' | 'standard' | 'expanded'
  footerStyle?: 'minimal' | 'standard' | 'expanded'
  sidebarPosition?: 'left' | 'right'
  showBreadcrumbs?: boolean
  containerWidth?: number
  spacing?: number
}

interface LayoutSettingsProps {
  settings?: LayoutSettings
  onUpdate: (settings: LayoutSettings) => Promise<void>
}

export default function LayoutSettings({
  settings,
  onUpdate,
}: LayoutSettingsProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [localSettings, setLocalSettings] = useState<LayoutSettings>(settings || {})

  const handleUpdate = async (updates: Partial<LayoutSettings>) => {
    setIsUpdating(true)
    try {
      const updatedSettings = {
        ...localSettings,
        ...updates,
      }
      setLocalSettings(updatedSettings)
      await onUpdate(updatedSettings)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Layout Settings</h2>
        <p className="text-sm text-muted-foreground">
          Customize your storefront's layout and structure
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Header Style */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Header Style</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Header Type</Label>
              <Select
                value={localSettings.headerStyle || 'standard'}
                onValueChange={(value) =>
                  handleUpdate({ headerStyle: value as LayoutSettings['headerStyle'] })
                }
                disabled={isUpdating}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select header style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="expanded">Expanded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Footer Style */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Footer Style</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Footer Type</Label>
              <Select
                value={localSettings.footerStyle || 'standard'}
                onValueChange={(value) =>
                  handleUpdate({ footerStyle: value as LayoutSettings['footerStyle'] })
                }
                disabled={isUpdating}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select footer style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="expanded">Expanded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Sidebar Position */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Sidebar Position</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Position</Label>
              <Select
                value={localSettings.sidebarPosition || 'left'}
                onValueChange={(value) =>
                  handleUpdate({ sidebarPosition: value as LayoutSettings['sidebarPosition'] })
                }
                disabled={isUpdating}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sidebar position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Breadcrumbs */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Navigation</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Show Breadcrumbs</Label>
              <Switch
                checked={localSettings.showBreadcrumbs ?? true}
                onCheckedChange={(checked) => handleUpdate({ showBreadcrumbs: checked })}
                disabled={isUpdating}
              />
            </div>
          </div>
        </Card>

        {/* Container Width */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Container Width</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Width (px)</Label>
              <Slider
                value={[localSettings.containerWidth || 1200]}
                min={800}
                max={1600}
                step={50}
                onValueChange={([value]) => handleUpdate({ containerWidth: value })}
                disabled={isUpdating}
              />
              <div className="text-sm text-muted-foreground">
                {localSettings.containerWidth || 1200}px
              </div>
            </div>
          </div>
        </Card>

        {/* Spacing */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Spacing</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Base Spacing (px)</Label>
              <Slider
                value={[localSettings.spacing || 16]}
                min={8}
                max={32}
                step={4}
                onValueChange={([value]) => handleUpdate({ spacing: value })}
                disabled={isUpdating}
              />
              <div className="text-sm text-muted-foreground">
                {localSettings.spacing || 16}px
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 