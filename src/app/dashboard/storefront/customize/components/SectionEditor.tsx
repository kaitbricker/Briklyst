import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/ui/image-upload'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { sectionTypes } from '@/config/sectionTypes'
import { cn } from '@/lib/utils'

interface SectionEditorProps {
  section: {
    id: string
    type: string
    content: any
    order: number
  }
  onUpdate: (updates: any) => Promise<void>
  onDelete: () => Promise<void>
}

export default function SectionEditor({
  section,
  onUpdate,
  onDelete,
}: SectionEditorProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [activeTab, setActiveTab] = useState('content')
  const sectionType = sectionTypes.find((type) => type.id === section.type)

  if (!sectionType) return null

  const handleContentUpdate = async (updates: any) => {
    setIsUpdating(true)
    try {
      await onUpdate({
        ...section,
        content: {
          ...section.content,
          ...updates,
        },
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const renderContentEditor = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={section.content.title}
                onChange={(e) => handleContentUpdate({ title: e.target.value })}
                disabled={isUpdating}
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={section.content.subtitle}
                onChange={(e) => handleContentUpdate({ subtitle: e.target.value })}
                disabled={isUpdating}
              />
            </div>
            <div>
              <Label>Background Image</Label>
              <ImageUpload
                value={section.content.imageUrl}
                onChange={(url) => handleContentUpdate({ imageUrl: url })}
                disabled={isUpdating}
              />
            </div>
            <div>
              <Label>CTA Text</Label>
              <Input
                value={section.content.ctaText}
                onChange={(e) => handleContentUpdate({ ctaText: e.target.value })}
                disabled={isUpdating}
              />
            </div>
            <div>
              <Label>CTA Link</Label>
              <Input
                value={section.content.ctaLink}
                onChange={(e) => handleContentUpdate({ ctaLink: e.target.value })}
                disabled={isUpdating}
              />
            </div>
          </div>
        )

      case 'featured_products':
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={section.content.title}
                onChange={(e) => handleContentUpdate({ title: e.target.value })}
                disabled={isUpdating}
              />
            </div>
            <div>
              <Label>Layout</Label>
              <select
                value={section.content.layout}
                onChange={(e) => handleContentUpdate({ layout: e.target.value })}
                disabled={isUpdating}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="grid">Grid</option>
                <option value="carousel">Carousel</option>
                <option value="list">List</option>
              </select>
            </div>
            <div>
              <Label>Products</Label>
              <div className="space-y-2">
                {section.content.products?.map((product: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={product.id}
                      onChange={(e) => {
                        const newProducts = [...section.content.products]
                        newProducts[index] = { ...product, id: e.target.value }
                        handleContentUpdate({ products: newProducts })
                      }}
                      disabled={isUpdating}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newProducts = section.content.products.filter(
                          (_: any, i: number) => i !== index
                        )
                        handleContentUpdate({ products: newProducts })
                      }}
                      disabled={isUpdating}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    const newProducts = [...(section.content.products || []), { id: '' }]
                    handleContentUpdate({ products: newProducts })
                  }}
                  disabled={isUpdating}
                >
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        )

      case 'testimonials':
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={section.content.title}
                onChange={(e) => handleContentUpdate({ title: e.target.value })}
                disabled={isUpdating}
              />
            </div>
            <div>
              <Label>Testimonials</Label>
              <div className="space-y-4">
                {section.content.testimonials?.map((testimonial: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Name"
                        value={testimonial.name}
                        onChange={(e) => {
                          const newTestimonials = [...section.content.testimonials]
                          newTestimonials[index] = {
                            ...testimonial,
                            name: e.target.value,
                          }
                          handleContentUpdate({ testimonials: newTestimonials })
                        }}
                        disabled={isUpdating}
                      />
                      <Textarea
                        placeholder="Testimonial"
                        value={testimonial.text}
                        onChange={(e) => {
                          const newTestimonials = [...section.content.testimonials]
                          newTestimonials[index] = {
                            ...testimonial,
                            text: e.target.value,
                          }
                          handleContentUpdate({ testimonials: newTestimonials })
                        }}
                        disabled={isUpdating}
                      />
                      <ImageUpload
                        value={testimonial.imageUrl}
                        onChange={(url) => {
                          const newTestimonials = [...section.content.testimonials]
                          newTestimonials[index] = {
                            ...testimonial,
                            imageUrl: url,
                          }
                          handleContentUpdate({ testimonials: newTestimonials })
                        }}
                        disabled={isUpdating}
                      />
                    </div>
                  </Card>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    const newTestimonials = [
                      ...(section.content.testimonials || []),
                      { name: '', text: '', imageUrl: '' },
                    ]
                    handleContentUpdate({ testimonials: newTestimonials })
                  }}
                  disabled={isUpdating}
                >
                  Add Testimonial
                </Button>
              </div>
            </div>
          </div>
        )

      case 'custom_html':
        return (
          <div className="space-y-4">
            <div>
              <Label>HTML Content</Label>
              <Textarea
                value={section.content.html}
                onChange={(e) => handleContentUpdate({ html: e.target.value })}
                disabled={isUpdating}
                className="font-mono"
                rows={10}
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={section.content.title}
                onChange={(e) => handleContentUpdate({ title: e.target.value })}
                disabled={isUpdating}
              />
            </div>
            <div>
              <Label>Content</Label>
              <RichTextEditor
                value={section.content.content}
                onChange={(content) => handleContentUpdate({ content })}
                disabled={isUpdating}
              />
            </div>
          </div>
        )
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium">{sectionType.name}</h3>
          <p className="text-sm text-muted-foreground">
            {sectionType.description}
          </p>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          disabled={isUpdating}
        >
          Delete Section
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-4">
          {renderContentEditor()}
        </TabsContent>

        <TabsContent value="style" className="mt-4">
          <div className="space-y-4">
            <div>
              <Label>Background Color</Label>
              <Input
                type="color"
                value={section.content.backgroundColor || '#ffffff'}
                onChange={(e) =>
                  handleContentUpdate({ backgroundColor: e.target.value })
                }
                disabled={isUpdating}
              />
            </div>
            <div>
              <Label>Text Color</Label>
              <Input
                type="color"
                value={section.content.textColor || '#000000'}
                onChange={(e) =>
                  handleContentUpdate({ textColor: e.target.value })
                }
                disabled={isUpdating}
              />
            </div>
            <div>
              <Label>Padding</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Top"
                  value={section.content.paddingTop || 0}
                  onChange={(e) =>
                    handleContentUpdate({ paddingTop: parseInt(e.target.value) })
                  }
                  disabled={isUpdating}
                />
                <Input
                  type="number"
                  placeholder="Bottom"
                  value={section.content.paddingBottom || 0}
                  onChange={(e) =>
                    handleContentUpdate({
                      paddingBottom: parseInt(e.target.value),
                    })
                  }
                  disabled={isUpdating}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="mt-4">
          <div className="space-y-4">
            <div>
              <Label>Custom CSS</Label>
              <Textarea
                value={section.content.customCSS || ''}
                onChange={(e) =>
                  handleContentUpdate({ customCSS: e.target.value })
                }
                disabled={isUpdating}
                className="font-mono"
                rows={5}
              />
            </div>
            <div>
              <Label>Custom Classes</Label>
              <Input
                value={section.content.customClasses || ''}
                onChange={(e) =>
                  handleContentUpdate({ customClasses: e.target.value })
                }
                disabled={isUpdating}
                placeholder="space-y-4 bg-gray-100"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
} 