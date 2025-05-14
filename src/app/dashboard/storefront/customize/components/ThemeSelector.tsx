'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Theme } from '@/lib/themes'
import { themes } from '@/lib/themes'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Save, Sparkles, Eye, Palette, Type, Layout } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
          <SelectContent className="bg-white/95 backdrop-blur-lg border-2 border-transparent shadow-2xl rounded-xl ring-1 ring-primary/20 ring-offset-2 ring-offset-white transition-all duration-200">
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

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Theme Preview</DialogTitle>
              <DialogDescription>
                Preview how your storefront will look with this theme
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <h3 className="font-semibold">Color Palette</h3>
                </div>
                <div className="flex gap-2">
                  {[selectedTheme.primaryColor, selectedTheme.accentColor, selectedTheme.backgroundColor].map((color, index) => (
                    <motion.div
                      key={index}
                      className="w-12 h-12 rounded-lg shadow-sm transition-all duration-300"
                      style={{ backgroundColor: color }}
                      whileHover={{ scale: 1.1 }}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  <h3 className="font-semibold">Typography</h3>
                </div>
                <div className="space-y-2">
                  <p
                    className="text-lg font-medium"
                    style={{ fontFamily: selectedTheme.fontFamily.heading }}
                  >
                    {selectedTheme.name} Heading
                  </p>
                  <p
                    className="text-base"
                    style={{ fontFamily: selectedTheme.fontFamily.body }}
                  >
                    {selectedTheme.name} Body Text
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
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
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Color Palette */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    <h4 className="font-medium">Colors</h4>
                  </div>
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
                </div>

                {/* Typography Preview */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    <h4 className="font-medium">Typography</h4>
                  </div>
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
                </div>

                {/* Layout Preview */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Layout className="w-4 h-4" />
                    <h4 className="font-medium">Layout</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded-full w-full" />
                    <div className="h-2 bg-gray-200 rounded-full w-3/4" />
                    <div className="h-2 bg-gray-200 rounded-full w-1/2" />
                  </div>
                </div>
              </div>

              {/* Button Preview */}
              <div className="pt-4">
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