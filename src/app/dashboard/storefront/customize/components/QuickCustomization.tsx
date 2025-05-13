'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface QuickCustomizationProps {
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
  onUpdateColors: (colors: QuickCustomizationProps['colors']) => Promise<void>
  onUpdateFonts: (fonts: QuickCustomizationProps['fonts']) => Promise<void>
  onUpdateLayout: (layout: QuickCustomizationProps['layout']) => Promise<void>
}

const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Playfair Display', label: 'Playfair Display' },
  { value: 'Lora', label: 'Lora' },
  { value: 'Cormorant Garamond', label: 'Cormorant Garamond' },
  { value: 'Cormorant', label: 'Cormorant' },
]

export default function QuickCustomization({
  colors,
  fonts,
  layout,
  onUpdateColors,
  onUpdateFonts,
  onUpdateLayout,
}: QuickCustomizationProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleColorChange = async (key: keyof typeof colors, value: string) => {
    setIsUpdating(true)
    try {
      await onUpdateColors({ ...colors, [key]: value })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleFontChange = async (key: keyof typeof fonts, value: string) => {
    setIsUpdating(true)
    try {
      await onUpdateFonts({ ...fonts, [key]: value })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleLayoutChange = async (key: keyof typeof layout, value: string) => {
    setIsUpdating(true)
    try {
      await onUpdateLayout({ ...layout, [key]: value })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Quick Customization</h2>
        <p className="text-sm text-muted-foreground">
          Quickly adjust your storefront's appearance
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Colors */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Colors</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={colors?.primary || '#000000'}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="h-10 w-20"
                />
                <Input
                  type="text"
                  value={colors?.primary || '#000000'}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={colors?.secondary || '#ffffff'}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="h-10 w-20"
                />
                <Input
                  type="text"
                  value={colors?.secondary || '#ffffff'}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Accent Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={colors?.accent || '#666666'}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="h-10 w-20"
                />
                <Input
                  type="text"
                  value={colors?.accent || '#666666'}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={colors?.background || '#ffffff'}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="h-10 w-20"
                />
                <Input
                  type="text"
                  value={colors?.background || '#ffffff'}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Text Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={colors?.text || '#000000'}
                  onChange={(e) => handleColorChange('text', e.target.value)}
                  className="h-10 w-20"
                />
                <Input
                  type="text"
                  value={colors?.text || '#000000'}
                  onChange={(e) => handleColorChange('text', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Fonts */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Fonts</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Heading Font</Label>
              <Select
                value={fonts?.heading || 'Inter'}
                onValueChange={(value) => handleFontChange('heading', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select heading font" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Body Font</Label>
              <Select
                value={fonts?.body || 'Inter'}
                onValueChange={(value) => handleFontChange('body', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select body font" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Layout */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Layout</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Spacing</Label>
              <Slider
                value={[parseInt(layout?.spacing || '1.5rem')]}
                min={1}
                max={4}
                step={0.5}
                onValueChange={([value]) =>
                  handleLayoutChange('spacing', `${value}rem`)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Container Width</Label>
              <Select
                value={layout?.containerWidth || '1200px'}
                onValueChange={(value) => handleLayoutChange('containerWidth', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select container width" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000px">Narrow (1000px)</SelectItem>
                  <SelectItem value="1200px">Default (1200px)</SelectItem>
                  <SelectItem value="1400px">Wide (1400px)</SelectItem>
                  <SelectItem value="1600px">Extra Wide (1600px)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Border Radius</Label>
              <Slider
                value={[parseInt(layout?.borderRadius || '0.5rem')]}
                min={0}
                max={2}
                step={0.25}
                onValueChange={([value]) =>
                  handleLayoutChange('borderRadius', `${value}rem`)
                }
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 