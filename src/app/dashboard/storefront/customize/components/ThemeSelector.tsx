'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Theme } from '@/lib/themes'
import { themes } from '@/lib/themes'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Save, Sparkles } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils'

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
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Choose Your Theme
        </h2>
        <p className="text-muted-foreground mt-1">
          Select a theme to customize your storefront&apos;s look and feel
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Select
          value={selectedTheme.id}
          onValueChange={(value) => {
            const theme = themes.find(t => t.id === value)
            if (theme) onSelectTheme(theme)
          }}
        >
          <SelectTrigger className="w-full sm:w-[300px] bg-white/50 backdrop-blur-sm border-2 border-gray-100 hover:border-gray-200 transition-all">
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
          className={cn(
            "gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all",
            isSaving && "opacity-50 cursor-not-allowed"
          )}
        >
          <Sparkles className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Theme'}
        </Button>
      </div>

      {/* Theme Preview Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTheme.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="p-6 bg-white/50 backdrop-blur-sm border-2 border-gray-100 hover:border-gray-200 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {selectedTheme.name}
                </h3>
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
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
                    className="w-8 h-8 rounded-full shadow-sm transition-transform hover:scale-110"
                    style={{ backgroundColor: selectedTheme.primaryColor }}
                  />
                  <div
                    className="w-8 h-8 rounded-full shadow-sm transition-transform hover:scale-110"
                    style={{ backgroundColor: selectedTheme.accentColor }}
                  />
                  <div
                    className="w-8 h-8 rounded-full shadow-sm transition-transform hover:scale-110"
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
                  className={`w-full text-sm ${selectedTheme.buttonStyle} transition-all duration-200 hover:scale-[1.02]`}
                  style={{ backgroundColor: selectedTheme.primaryColor }}
                >
                  Preview Button
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 