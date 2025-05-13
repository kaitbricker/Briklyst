'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'

interface TypographySettings {
  fontFamily?: string
  headingFont?: string
  baseFontSize?: number
  headingScale?: number
  lineHeight?: number
  letterSpacing?: number
}

interface TypographySettingsProps {
  settings?: TypographySettings
  onUpdate: (settings: TypographySettings) => Promise<void>
}

const fontFamilies = [
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'open-sans', label: 'Open Sans' },
  { value: 'lato', label: 'Lato' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'raleway', label: 'Raleway' },
  { value: 'source-sans-pro', label: 'Source Sans Pro' },
]

export default function TypographySettings({
  settings,
  onUpdate,
}: TypographySettingsProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [localSettings, setLocalSettings] = useState<TypographySettings>(settings || {})

  const handleUpdate = async (updates: Partial<TypographySettings>) => {
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
        <h2 className="text-xl font-semibold">Typography Settings</h2>
        <p className="text-sm text-muted-foreground">
          Customize your storefront's typography and text styles
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Font Family */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Font Family</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Base Font</Label>
              <Select
                value={localSettings.fontFamily || 'inter'}
                onValueChange={(value) => handleUpdate({ fontFamily: value })}
                disabled={isUpdating}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select base font" />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Heading Font */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Heading Font</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Font Family</Label>
              <Select
                value={localSettings.headingFont || 'inter'}
                onValueChange={(value) => handleUpdate({ headingFont: value })}
                disabled={isUpdating}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select heading font" />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Base Font Size */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Base Font Size</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Size (px)</Label>
              <Slider
                value={[localSettings.baseFontSize || 16]}
                min={12}
                max={24}
                step={1}
                onValueChange={([value]) => handleUpdate({ baseFontSize: value })}
                disabled={isUpdating}
              />
              <div className="text-sm text-muted-foreground">
                {localSettings.baseFontSize || 16}px
              </div>
            </div>
          </div>
        </Card>

        {/* Heading Scale */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Heading Scale</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Scale Factor</Label>
              <Slider
                value={[localSettings.headingScale || 1.2]}
                min={1}
                max={1.5}
                step={0.1}
                onValueChange={([value]) => handleUpdate({ headingScale: value })}
                disabled={isUpdating}
              />
              <div className="text-sm text-muted-foreground">
                {localSettings.headingScale || 1.2}x
              </div>
            </div>
          </div>
        </Card>

        {/* Line Height */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Line Height</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Height</Label>
              <Slider
                value={[localSettings.lineHeight || 1.5]}
                min={1}
                max={2}
                step={0.1}
                onValueChange={([value]) => handleUpdate({ lineHeight: value })}
                disabled={isUpdating}
              />
              <div className="text-sm text-muted-foreground">
                {localSettings.lineHeight || 1.5}
              </div>
            </div>
          </div>
        </Card>

        {/* Letter Spacing */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Letter Spacing</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Spacing (px)</Label>
              <Slider
                value={[localSettings.letterSpacing || 0]}
                min={-1}
                max={2}
                step={0.1}
                onValueChange={([value]) => handleUpdate({ letterSpacing: value })}
                disabled={isUpdating}
              />
              <div className="text-sm text-muted-foreground">
                {localSettings.letterSpacing || 0}px
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 