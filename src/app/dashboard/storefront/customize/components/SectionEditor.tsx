import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/ui/image-upload'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GripVertical, Trash2, Smartphone, Monitor } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { cn } from '@/lib/utils'
import { sectionTypes } from '@/config/sectionTypes'
import Image from 'next/image'

interface Section {
  id: string
  type: string
  content: any
  order: number
}

interface SectionEditorProps {
  section: Section
  onUpdate: (updates: Partial<Section>) => Promise<void>
  onDelete: () => Promise<void>
}

export default function SectionEditor({
  section,
  onUpdate,
  onDelete,
}: SectionEditorProps) {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const sectionType = sectionTypes.find((type) => type.id === section.type)

  if (!sectionType) return null

  const handleContentUpdate = async (updates: any) => {
    await onUpdate({
      content: {
        ...section.content,
        ...updates,
      },
    })
  }

  const handleImageUpdate = async (images: string[]) => {
    await handleContentUpdate({ images })
  }

  const handleImageReorder = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(section.content.images || [])
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    await handleContentUpdate({ images: items })
  }

  const handleImageDelete = async (index: number) => {
    const images = [...(section.content.images || [])]
    images.splice(index, 1)
    await handleContentUpdate({ images })
  }

  const renderPreview = () => {
    switch (section.type) {
      case 'hero':
        return (
          <section className="p-8 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {section.content.title || 'Welcome to Our Store'}
            </h2>
            <div className="mb-6">
              {section.content.subtitle || 'Discover our amazing products'}
            </div>
            <button className="px-6 py-2 rounded-md text-white bg-primary">
              {section.content.ctaText || 'Shop Now'}
            </button>
          </section>
        )
      case 'featured-products':
        return (
          <section className="p-8">
            <h3 className="text-2xl font-bold mb-6">
              {section.content.title || 'Featured Products'}
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
        )
      case 'testimonials':
        return (
          <section className="p-8 bg-muted/50">
            <h3 className="text-2xl font-bold mb-6 text-center">
              {section.content.title || 'Customer Testimonials'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-background rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-muted" />
                    <div>
                      <h4 className="font-medium">Customer {i}</h4>
                      <p className="text-sm text-muted-foreground">Verified Buyer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {section.content.testimonials?.[i - 1]?.text || 'Great product! Would definitely recommend.'}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )
      case 'newsletter':
        return (
          <section className="p-8 bg-primary text-primary-foreground">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">
                {section.content.title || 'Subscribe to Our Newsletter'}
              </h3>
              <p className="mb-6">
                {section.content.subtitle || 'Stay updated with our latest products and offers'}
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md bg-background text-foreground"
                />
                <button className="px-6 py-2 rounded-md bg-background text-primary">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        )
      case 'gallery':
        return (
          <section className="p-8">
            <h3 className="text-2xl font-bold mb-6">
              {section.content.title || 'Image Gallery'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(section.content.images || []).map((image: string, index: number) => (
                <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                  />
                </div>
              ))}
            </div>
          </section>
        )
      case 'faq':
        return (
          <section className="p-8">
            <h3 className="text-2xl font-bold mb-6">
              {section.content.title || 'Frequently Asked Questions'}
            </h3>
            <div className="space-y-4 max-w-3xl mx-auto">
              {(section.content.questions || []).map((q: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{q.question || 'Sample Question?'}</h4>
                  <p className="text-muted-foreground">{q.answer || 'Sample answer goes here.'}</p>
                </div>
              ))}
            </div>
          </section>
        )
      default:
        return null
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Edit Section</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(previewMode === 'desktop' ? 'mobile' : 'desktop')}
            className="flex items-center gap-2"
          >
            {previewMode === 'desktop' ? (
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
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete Section</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Editor */}
        <div className="space-y-6">
          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              {sectionType.defaultContent.title !== undefined && (
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={section.content.title || ''}
                    onChange={(e) => handleContentUpdate({ title: e.target.value })}
                    placeholder="Enter section title"
                  />
                </div>
              )}

              {sectionType.defaultContent.subtitle !== undefined && (
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <RichTextEditor
                    value={section.content.subtitle || ''}
                    onChange={(value) => handleContentUpdate({ subtitle: value })}
                  />
                </div>
              )}

              {section.type === 'testimonials' && (
                <div className="space-y-4">
                  <Label>Testimonials</Label>
                  {(section.content.testimonials || []).map((testimonial: any, index: number) => (
                    <div key={index} className="space-y-2 p-4 border rounded-md">
                      <Input
                        value={testimonial.name || ''}
                        onChange={(e) => {
                          const testimonials = [...(section.content.testimonials || [])]
                          testimonials[index] = { ...testimonials[index], name: e.target.value }
                          handleContentUpdate({ testimonials })
                        }}
                        placeholder="Customer name"
                      />
                      <Textarea
                        value={testimonial.text || ''}
                        onChange={(e) => {
                          const testimonials = [...(section.content.testimonials || [])]
                          testimonials[index] = { ...testimonials[index], text: e.target.value }
                          handleContentUpdate({ testimonials })
                        }}
                        placeholder="Testimonial text"
                      />
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const testimonials = [...(section.content.testimonials || [])]
                      testimonials.push({ name: '', text: '' })
                      handleContentUpdate({ testimonials })
                    }}
                  >
                    Add Testimonial
                  </Button>
                </div>
              )}

              {section.type === 'faq' && (
                <div className="space-y-4">
                  <Label>FAQ Items</Label>
                  {(section.content.questions || []).map((q: any, index: number) => (
                    <div key={index} className="space-y-2 p-4 border rounded-md">
                      <Input
                        value={q.question || ''}
                        onChange={(e) => {
                          const questions = [...(section.content.questions || [])]
                          questions[index] = { ...questions[index], question: e.target.value }
                          handleContentUpdate({ questions })
                        }}
                        placeholder="Question"
                      />
                      <Textarea
                        value={q.answer || ''}
                        onChange={(e) => {
                          const questions = [...(section.content.questions || [])]
                          questions[index] = { ...questions[index], answer: e.target.value }
                          handleContentUpdate({ questions })
                        }}
                        placeholder="Answer"
                      />
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const questions = [...(section.content.questions || [])]
                      questions.push({ question: '', answer: '' })
                      handleContentUpdate({ questions })
                    }}
                  >
                    Add FAQ Item
                  </Button>
                </div>
              )}

              {sectionType.defaultContent.images !== undefined && (
                <div className="space-y-4">
                  <Label>Images</Label>
                  <ImageUpload
                    value={section.content.images?.[0] || ''}
                    onChange={(url) => handleImageUpdate([url])}
                  />
                  {(section.content.images || []).length > 0 && (
                    <DragDropContext onDragEnd={handleImageReorder}>
                      <Droppable droppableId="images">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-2"
                          >
                            {(section.content.images || []).map((image: string, index: number) => (
                              <Draggable
                                key={image}
                                draggableId={image}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className="flex items-center gap-2 p-2 border rounded-md"
                                  >
                                    <div
                                      {...provided.dragHandleProps}
                                      className="cursor-grab"
                                    >
                                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <Image
                                      src={image}
                                      alt={`Image ${index + 1}`}
                                      className="w-16 h-16 object-cover rounded-md"
                                      width={64}
                                      height={64}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleImageDelete(index)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
              <div className="space-y-2">
                <Label>Background Color</Label>
                <Input
                  type="color"
                  value={section.content.backgroundColor || '#ffffff'}
                  onChange={(e) => handleContentUpdate({ backgroundColor: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Text Color</Label>
                <Input
                  type="color"
                  value={section.content.textColor || '#000000'}
                  onChange={(e) => handleContentUpdate({ textColor: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              <div className="space-y-2">
                <Label>Padding</Label>
                <Input
                  type="number"
                  value={section.content.padding || 32}
                  onChange={(e) => handleContentUpdate({ padding: parseInt(e.target.value) })}
                  min={0}
                  max={100}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Width</Label>
                <Input
                  type="number"
                  value={section.content.maxWidth || 1200}
                  onChange={(e) => handleContentUpdate({ maxWidth: parseInt(e.target.value) })}
                  min={0}
                  max={2000}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview */}
        <div
          className={cn(
            "border rounded-lg overflow-hidden bg-background",
            previewMode === 'mobile' ? "max-w-[375px] mx-auto" : "w-full"
          )}
        >
          <ScrollArea className="h-[600px]">
            {renderPreview()}
          </ScrollArea>
        </div>
      </div>
    </Card>
  )
} 