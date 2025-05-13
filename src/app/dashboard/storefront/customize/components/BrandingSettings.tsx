'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/ui/image-upload'
import { cn } from '@/lib/utils'

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
  assets: BrandingAssets
  onUpdate: (updates: BrandingAssets) => Promise<void>
}

export default function BrandingSettings({
  assets = {},
  onUpdate,
}: BrandingSettingsProps) {
  const handleUpdate = async (key: string, value: any) => {
    await onUpdate({ ...assets, [key]: value })
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Brand Assets</h3>
        <div className="space-y-4">
          <div>
            <Label>Logo</Label>
            <ImageUpload
              value={assets.logo}
              onChange={(url) => handleUpdate('logo', url)}
            />
          </div>
          <div>
            <Label>Banner Image</Label>
            <ImageUpload
              value={assets.banner}
              onChange={(url) => handleUpdate('banner', url)}
            />
          </div>
          <div>
            <Label>Favicon</Label>
            <ImageUpload
              value={assets.favicon}
              onChange={(url) => handleUpdate('favicon', url)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Button Styles</h3>
        <div className="space-y-4">
          <div>
            <Label>Primary Button Style</Label>
            <select
              value={assets.buttonStyles?.primary || 'default'}
              onChange={(e) =>
                handleUpdate('buttonStyles', {
                  ...assets.buttonStyles,
                  primary: e.target.value,
                })
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="default">Default</option>
              <option value="rounded">Rounded</option>
              <option value="pill">Pill</option>
              <option value="outline">Outline</option>
            </select>
          </div>
          <div>
            <Label>Secondary Button Style</Label>
            <select
              value={assets.buttonStyles?.secondary || 'default'}
              onChange={(e) =>
                handleUpdate('buttonStyles', {
                  ...assets.buttonStyles,
                  secondary: e.target.value,
                })
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="default">Default</option>
              <option value="rounded">Rounded</option>
              <option value="pill">Pill</option>
              <option value="outline">Outline</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Color Palette</h3>
        <div className="space-y-4">
          {(assets.colorPalette || []).map((color, index) => (
            <div key={index}>
              <Label>Color {index + 1}</Label>
              <Input
                type="color"
                value={color}
                onChange={(e) => {
                  const newPalette = [...(assets.colorPalette || [])]
                  newPalette[index] = e.target.value
                  handleUpdate('colorPalette', newPalette)
                }}
              />
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              handleUpdate('colorPalette', [
                ...(assets.colorPalette || []),
                '#000000',
              ])
            }
          >
            Add Color
          </Button>
        </div>
      </Card>
    </div>
  )
} 