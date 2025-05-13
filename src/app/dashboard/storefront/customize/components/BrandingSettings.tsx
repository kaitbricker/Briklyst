'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImageUpload } from '@/components/ui/image-upload'
import { ColorPicker } from '@/components/ui/color-picker'
import Image from 'next/image'

interface BrandingAssets {
  logo?: string
  banner?: string
  favicon?: string
  profilePicture?: string
  headingPicture?: string
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
        {/* Profile Picture */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Profile Picture</h3>
          <div className="space-y-4">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border mx-auto">
              {settings.profilePicture ? (
                <Image
                  src={settings.profilePicture}
                  alt="Profile picture preview"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-avatar.jpg';
                  }}
                />
              ) : (
                <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                  <p className="text-sm text-gray-500">No profile picture</p>
                </div>
              )}
            </div>
            <ImageUpload
              value={settings.profilePicture}
              onChange={(url) => handleUpdate({ profilePicture: url })}
            />
            <div className="space-y-2">
              <Label>Profile Picture URL</Label>
              <Input
                value={settings.profilePicture || ''}
                onChange={(e) => handleUpdate({ profilePicture: e.target.value })}
                placeholder="Enter profile picture URL"
              />
              <p className="text-xs text-muted-foreground">
                Recommended size: 400x400px. Max file size: 2MB
              </p>
            </div>
          </div>
        </Card>

        {/* Heading Picture */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Heading Picture</h3>
          <div className="space-y-4">
            <div className="relative h-48 w-full rounded-lg overflow-hidden border">
              {settings.headingPicture ? (
                <Image
                  src={settings.headingPicture}
                  alt="Heading picture preview"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-banner.jpg';
                  }}
                />
              ) : (
                <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                  <p className="text-sm text-gray-500">No heading picture</p>
                </div>
              )}
            </div>
            <ImageUpload
              value={settings.headingPicture}
              onChange={(url) => handleUpdate({ headingPicture: url })}
            />
            <div className="space-y-2">
              <Label>Heading Picture URL</Label>
              <Input
                value={settings.headingPicture || ''}
                onChange={(e) => handleUpdate({ headingPicture: e.target.value })}
                placeholder="Enter heading picture URL"
              />
              <p className="text-xs text-muted-foreground">
                Recommended size: 1200x400px. Max file size: 5MB
              </p>
            </div>
          </div>
        </Card>

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
            <div className="relative h-48 w-full rounded-lg overflow-hidden border">
              {settings.banner ? (
                <Image
                  src={settings.banner}
                  alt="Banner preview"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-banner.jpg';
                  }}
                />
              ) : (
                <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                  <p className="text-sm text-gray-500">No banner image selected</p>
                </div>
              )}
            </div>
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
              <p className="text-xs text-muted-foreground">
                Recommended size: 1920x1080px. Max file size: 5MB
              </p>
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