'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImageUpload } from '@/components/ui/image-upload'
import { ColorPicker } from '@/components/ui/color-picker'

interface BrandingAssets {
  logo?: string
  banner?: string
  favicon?: string
  buttonStyles?: {
    primary?: string
    secondary?: string
  }
  colorPalette?: string[]
}

interface BrandingSettingsProps {
  settings?: BrandingAssets
  onUpdate: (updates: BrandingAssets) => Promise<void>
}

export default function BrandingSettings({
  settings = {},
  onUpdate,
}: BrandingSettingsProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdate = async (updates: Partial<BrandingAssets>) => {
    setIsUpdating(true)
    try {
      await onUpdate({
        ...settings,
        ...updates,
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Branding Settings</h2>
        <p className="text-sm text-muted-foreground">Let&apos;s make your storefront uniquely yours</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Logo */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Logo</h3>
          <div className="space-y-4">
            <ImageUpload
              value={settings.logo}
              onChange={(url) => handleUpdate({ logo: url })}
            />
            <div className="space-y-2">
              <Label>Logo URL</Label>
              <Input
                value={settings.logo || ''}
                onChange={(e) => handleUpdate({ logo: e.target.value })}
                placeholder="Enter logo URL"
              />
            </div>
          </div>
        </Card>

        {/* Banner */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Banner</h3>
          <div className="space-y-4">
            <ImageUpload
              value={settings.banner}
              onChange={(url) => handleUpdate({ banner: url })}
            />
            <div className="space-y-2">
              <Label>Banner URL</Label>
              <Input
                value={settings.banner || ''}
                onChange={(e) => handleUpdate({ banner: e.target.value })}
                placeholder="Enter banner URL"
              />
            </div>
          </div>
        </Card>

        {/* Favicon */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Favicon</h3>
          <div className="space-y-4">
            <ImageUpload
              value={settings.favicon}
              onChange={(url) => handleUpdate({ favicon: url })}
            />
            <div className="space-y-2">
              <Label>Favicon URL</Label>
              <Input
                value={settings.favicon || ''}
                onChange={(e) => handleUpdate({ favicon: e.target.value })}
                placeholder="Enter favicon URL"
              />
            </div>
          </div>
        </Card>

        {/* Button Styles */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Button Styles</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Button Color</Label>
              <ColorPicker
                color={settings.buttonStyles?.primary || '#000000'}
                onChange={(color) =>
                  handleUpdate({
                    buttonStyles: {
                      ...settings.buttonStyles,
                      primary: color,
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Secondary Button Color</Label>
              <ColorPicker
                color={settings.buttonStyles?.secondary || '#ffffff'}
                onChange={(color) =>
                  handleUpdate({
                    buttonStyles: {
                      ...settings.buttonStyles,
                      secondary: color,
                    },
                  })
                }
              />
            </div>
          </div>
        </Card>

        {/* Color Palette */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Color Palette</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2">
              {(settings.colorPalette || []).map((color, index) => (
                <div key={index} className="relative">
                  <ColorPicker
                    color={color}
                    onChange={(newColor) => {
                      const newPalette = [...(settings.colorPalette || [])]
                      newPalette[index] = newColor
                      handleUpdate({ colorPalette: newPalette })
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute -top-2 -right-2"
                    onClick={() => {
                      const newPalette = [...(settings.colorPalette || [])]
                      newPalette.splice(index, 1)
                      handleUpdate({ colorPalette: newPalette })
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newPalette = [...(settings.colorPalette || []), '#000000']
                  handleUpdate({ colorPalette: newPalette })
                }}
              >
                Add Color
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 