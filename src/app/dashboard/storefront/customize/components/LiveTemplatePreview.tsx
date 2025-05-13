import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Smartphone, Monitor, Maximize2, Minimize2 } from 'lucide-react'
import { templates } from '@/config/templates'
import { cn } from '@/lib/utils'

interface LiveTemplatePreviewProps {
  selectedTemplate: string
  customizations?: {
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
  }
}

export default function LiveTemplatePreview({
  selectedTemplate,
  customizations,
}: LiveTemplatePreviewProps) {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const template = templates.find((t) => t.id === selectedTemplate)

  if (!template) return null

  const previewStyles = {
    '--primary-color': customizations?.colors?.primary || template.defaultColors.primary,
    '--secondary-color': customizations?.colors?.secondary || template.defaultColors.secondary,
    '--accent-color': customizations?.colors?.accent || template.defaultColors.accent,
    '--background-color': customizations?.colors?.background || template.defaultColors.background,
    '--text-color': customizations?.colors?.text || template.defaultColors.text,
    '--heading-font': customizations?.fonts?.heading || template.defaultFonts.heading,
    '--body-font': customizations?.fonts?.body || template.defaultFonts.body,
    '--spacing': customizations?.layout?.spacing || template.defaultLayout.spacing,
    '--container-width': customizations?.layout?.containerWidth || template.defaultLayout.containerWidth,
    '--border-radius': customizations?.layout?.borderRadius || template.defaultLayout.borderRadius,
  } as React.CSSProperties

  return (
    <Card className={cn(
      "p-6",
      isFullscreen && "fixed inset-0 z-50 m-0 rounded-none"
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Live Preview</h3>
        <div className="flex items-center gap-2">
          <Tabs value={previewMode} onValueChange={(v) => setPreviewMode(v as 'desktop' | 'mobile')}>
            <TabsList>
              <TabsTrigger value="desktop">
                <Monitor className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="mobile">
                <Smartphone className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "relative border rounded-lg overflow-hidden bg-background transition-all duration-200",
          previewMode === 'mobile' ? "max-w-[375px] mx-auto" : "w-full",
          isFullscreen && "h-[calc(100vh-8rem)]"
        )}
        style={previewStyles}
      >
        <div className="absolute inset-0 overflow-auto">
          <div className="min-h-full">
            {/* Header */}
            <header className="border-b p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--heading-font)' }}>
                  Store Name
                </h1>
                <nav>
                  <ul className="flex gap-4">
                    <li>Home</li>
                    <li>Products</li>
                    <li>About</li>
                    <li>Contact</li>
                  </ul>
                </nav>
              </div>
            </header>

            {/* Hero Section */}
            <section className="p-8 text-center">
              <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--heading-font)' }}>
                Welcome to Our Store
              </h2>
              <p className="mb-6" style={{ fontFamily: 'var(--body-font)' }}>
                Discover our amazing products and services
              </p>
              <button className="px-6 py-2 rounded-md bg-primary text-white">
                Shop Now
              </button>
            </section>

            {/* Featured Products */}
            <section className="p-8 bg-secondary">
              <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--heading-font)' }}>
                Featured Products
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-background rounded-lg p-4">
                    <div className="aspect-square bg-muted rounded-md mb-4" />
                    <h4 className="font-medium mb-2">Product {i}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Product description goes here
                    </p>
                    <button className="w-full py-2 rounded-md border border-primary text-primary">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-bold mb-4">About Us</h4>
                  <p className="text-sm text-muted-foreground">
                    Your trusted source for quality products
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li>Home</li>
                    <li>Products</li>
                    <li>About</li>
                    <li>Contact</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Contact</h4>
                  <p className="text-sm text-muted-foreground">
                    Email: info@store.com<br />
                    Phone: (555) 123-4567
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </Card>
  )
} 