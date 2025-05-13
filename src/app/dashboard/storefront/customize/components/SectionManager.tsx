import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { sectionTypes } from '@/config/sectionTypes'

interface Section {
  id: string
  type: string
  content: any
  order: number
}

interface SectionManagerProps {
  sections: Section[]
  onUpdateSections: (sections: Section[]) => Promise<void>
  onAddSection: (type: string) => Promise<void>
  onDeleteSection: (id: string) => Promise<void>
}

export default function SectionManager({
  sections,
  onUpdateSections,
  onAddSection,
  onDeleteSection,
}: SectionManagerProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order property for all sections
    const updatedSections = items.map((item, index) => ({
      ...item,
      order: index,
    }))

    setIsUpdating(true)
    try {
      await onUpdateSections(updatedSections)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Section Manager</h2>
        <p className="text-sm text-muted-foreground">
          Manage and reorder your storefront sections
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Available Section Types */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Available Sections</h3>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {sectionTypes.map((type) => (
                <Card
                  key={type.id}
                  className="p-4 hover:bg-muted/50 cursor-pointer"
                  onClick={() => onAddSection(type.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Current Sections */}
        <Card className="p-6">
          <h3 className="mb-4 font-medium">Current Sections</h3>
          <ScrollArea className="h-[400px] pr-4">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {sections.map((section, index) => {
                      const sectionType = sectionTypes.find(
                        (type) => type.id === section.type
                      )
                      return (
                        <Draggable
                          key={section.id}
                          draggableId={section.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={cn(
                                'p-4',
                                snapshot.isDragging && 'ring-2 ring-primary'
                              )}
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-grab"
                                >
                                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">
                                    {sectionType?.name || section.type}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {sectionType?.description}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onDeleteSection(section.id)}
                                  disabled={isUpdating}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </Card>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </ScrollArea>
        </Card>
      </div>
    </div>
  )
} 