import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { templates } from '@/config/storefrontTemplates'
import { cn } from '@/lib/utils'
import { Maximize2, Minimize2, Smartphone, Monitor, RefreshCw } from 'lucide-react'

interface TemplatePreviewProps {
  selectedTemplate: string
  customizations?: any
  onReset?: () => void
  previewMode?: 'desktop' | 'mobile'
}

export default function TemplatePreview({
  selectedTemplate,
  customizations,
  onReset,
  previewMode = 'desktop',
}: TemplatePreviewProps) {
  const template = templates.find((t) => t.id === selectedTemplate)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [localPreviewMode, setLocalPreviewMode] = useState<'desktop' | 'mobile'>(previewMode)

  // Update local preview mode when prop changes
  useEffect(() => {
    setLocalPreviewMode(previewMode)
  }, [previewMode])

  if (!template) return null

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Template Preview</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocalPreviewMode(localPreviewMode === 'desktop' ? 'mobile' : 'desktop')}
            className="flex items-center gap-2"
          >
            {localPreviewMode === 'desktop' ? (
              <>
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Desktop</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile</span>
              </>
            )}
          </Button>
          {onReset && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-2"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Fullscreen</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "relative border rounded-lg overflow-hidden bg-background transition-all duration-200",
          localPreviewMode === 'mobile' ? "max-w-[375px] mx-auto" : "w-full",
          isFullscreen && "h-[calc(100vh-8rem)]"
        )}
      >
        <div className="absolute inset-0 overflow-auto">
          <div className="min-h-full">
            {/* Header */}
            <header className="border-b p-4">
              <div className="flex items-center justify-between">
                <h1 
                  className="text-xl font-bold" 
                  style={{ 
                    fontFamily: customizations?.fonts?.heading || template.defaultFonts.heading,
                    color: customizations?.colors?.text || template.defaultColors.text
                  }}
                >
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
            <section 
              className="p-8 text-center" 
              style={{ 
                backgroundColor: customizations?.colors?.background || template.defaultColors.background,
                padding: customizations?.layout?.spacing || template.defaultLayout.spacing
              }}
            >
              <h2 
                className="text-4xl font-bold mb-4" 
                style={{ 
                  fontFamily: customizations?.fonts?.heading || template.defaultFonts.heading,
                  color: customizations?.colors?.text || template.defaultColors.text
                }}
              >
                Welcome to Our Store
              </h2>
              <p 
                className="mb-6" 
                style={{ 
                  fontFamily: customizations?.fonts?.body || template.defaultFonts.body,
                  color: customizations?.colors?.text || template.defaultColors.text
                }}
              >
                Discover our amazing products and services
              </p>
              <button 
                className="px-6 py-2 rounded-md text-white"
                style={{ 
                  backgroundColor: customizations?.colors?.primary || template.defaultColors.primary,
                  borderRadius: customizations?.layout?.borderRadius || template.defaultLayout.borderRadius
                }}
              >
                Shop Now
              </button>
            </section>

            {/* Featured Products */}
            <section 
              className="p-8" 
              style={{ 
                backgroundColor: customizations?.colors?.secondary || template.defaultColors.secondary,
                padding: customizations?.layout?.spacing || template.defaultLayout.spacing
              }}
            >
              <h3 
                className="text-2xl font-bold mb-6" 
                style={{ 
                  fontFamily: customizations?.fonts?.heading || template.defaultFonts.heading,
                  color: customizations?.colors?.text || template.defaultColors.text
                }}
              >
                Featured Products
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="bg-background rounded-lg p-4"
                    style={{ 
                      borderRadius: customizations?.layout?.borderRadius || template.defaultLayout.borderRadius
                    }}
                  >
                    <div className="aspect-square bg-muted rounded-md mb-4" />
                    <h4 
                      className="font-medium mb-2"
                      style={{ 
                        fontFamily: customizations?.fonts?.heading || template.defaultFonts.heading,
                        color: customizations?.colors?.text || template.defaultColors.text
                      }}
                    >
                      Product {i}
                    </h4>
                    <p 
                      className="text-sm text-muted-foreground mb-4"
                      style={{ 
                        fontFamily: customizations?.fonts?.body || template.defaultFonts.body
                      }}
                    >
                      Product description goes here
                    </p>
                    <button 
                      className="w-full py-2 rounded-md border"
                      style={{ 
                        borderColor: customizations?.colors?.primary || template.defaultColors.primary,
                        color: customizations?.colors?.primary || template.defaultColors.primary,
                        borderRadius: customizations?.layout?.borderRadius || template.defaultLayout.borderRadius
                      }}
                    >
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
                  <h4 
                    className="font-bold mb-4"
                    style={{ 
                      fontFamily: customizations?.fonts?.heading || template.defaultFonts.heading,
                      color: customizations?.colors?.text || template.defaultColors.text
                    }}
                  >
                    About Us
                  </h4>
                  <p 
                    className="text-sm text-muted-foreground"
                    style={{ 
                      fontFamily: customizations?.fonts?.body || template.defaultFonts.body
                    }}
                  >
                    Your trusted source for quality products
                  </p>
                </div>
                <div>
                  <h4 
                    className="font-bold mb-4"
                    style={{ 
                      fontFamily: customizations?.fonts?.heading || template.defaultFonts.heading,
                      color: customizations?.colors?.text || template.defaultColors.text
                    }}
                  >
                    Quick Links
                  </h4>
                  <ul className="space-y-2">
                    <li>Home</li>
                    <li>Products</li>
                    <li>About</li>
                    <li>Contact</li>
                  </ul>
                </div>
                <div>
                  <h4 
                    className="font-bold mb-4"
                    style={{ 
                      fontFamily: customizations?.fonts?.heading || template.defaultFonts.heading,
                      color: customizations?.colors?.text || template.defaultColors.text
                    }}
                  >
                    Contact
                  </h4>
                  <p 
                    className="text-sm text-muted-foreground"
                    style={{ 
                      fontFamily: customizations?.fonts?.body || template.defaultFonts.body
                    }}
                  >
                    Email: info@store.com<br />
                    Phone: (555) 123-4567
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">{template.name}</h4>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </div>
      <div className="mt-4 space-y-2">
        <h5 className="text-sm font-medium">Features:</h5>
        <ul className="text-sm text-muted-foreground space-y-1">
          {template.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </Card>
  )
} 