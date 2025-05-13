'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Theme } from '@/lib/themes'
import { themes } from '@/lib/themes'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Save } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ThemeSelectorProps {
  selectedTheme: Theme
  onSelectTheme: (theme: Theme) => void
  onSaveTheme: () => void
  isSaving?: boolean
}

export default function ThemeSelector({ 
  selectedTheme, 
  onSelectTheme, 
  onSaveTheme,
  isSaving = false 
}: ThemeSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Choose Your Theme</h2>
        <p className="text-muted-foreground mt-1">
          Select a theme to customize your storefront&apos;s look and feel
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Select
          value={selectedTheme.id}
          onValueChange={(value) => {
            const theme = themes.find(t => t.id === value)
            if (theme) onSelectTheme(theme)
          }}
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme.id} value={theme.id}>
                <div className="flex items-center gap-2">
                  <span>{theme.name}</span>
                  {selectedTheme.id === theme.id && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={onSaveTheme}
          disabled={isSaving}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Theme'}
        </Button>
      </div>

      {/* Theme Preview Card */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{selectedTheme.name}</h3>
            <Badge className="bg-primary text-primary-foreground">
              <Check className="w-4 h-4 mr-1" />
              Selected
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{selectedTheme.description}</p>
          
          {/* Theme Preview Elements */}
          <div className="space-y-3">
            {/* Color Palette */}
            <div className="flex gap-2">
              <div
                className="w-8 h-8 rounded-full shadow-sm"
                style={{ backgroundColor: selectedTheme.primaryColor }}
              />
              <div
                className="w-8 h-8 rounded-full shadow-sm"
                style={{ backgroundColor: selectedTheme.accentColor }}
              />
              <div
                className="w-8 h-8 rounded-full shadow-sm"
                style={{ backgroundColor: selectedTheme.backgroundColor }}
              />
            </div>

            {/* Typography Preview */}
            <div className="space-y-1">
              <p
                className="text-sm font-medium"
                style={{ fontFamily: selectedTheme.fontFamily.heading }}
              >
                {selectedTheme.name} Heading
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: selectedTheme.fontFamily.body }}
              >
                {selectedTheme.name} Body Text
              </p>
            </div>

            {/* Button Preview */}
            <button
              className={`w-full text-sm ${selectedTheme.buttonStyle}`}
              style={{ backgroundColor: selectedTheme.primaryColor }}
            >
              Preview Button
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
} 