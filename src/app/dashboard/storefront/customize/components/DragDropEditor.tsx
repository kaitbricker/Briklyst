import { useState } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { sectionTypes } from '@/config/sectionTypes'
import { SortableSection } from './SortableSection'

interface Section {
  id: string
  type: string
  content: any
  order: number
}

interface DragDropEditorProps {
  sections: Section[]
  onUpdateSections: (sections: Section[]) => Promise<void>
}

export default function DragDropEditor({
  sections,
  onUpdateSections,
}: DragDropEditorProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = async (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((section) => section.id === active.id)
      const newIndex = sections.findIndex((section) => section.id === over.id)

      const newSections = arrayMove(sections, oldIndex, newIndex).map((section, index) => ({
        ...section,
        order: index,
      }))

      setIsUpdating(true)
      try {
        await onUpdateSections(newSections)
      } finally {
        setIsUpdating(false)
      }
    }
  }

  const handleAddSection = async (typeId: string) => {
    const sectionType = sectionTypes.find((type) => type.id === typeId)
    if (!sectionType) return

    const newSection: Section = {
      id: crypto.randomUUID(),
      type: typeId,
      content: sectionType.defaultContent,
      order: sections.length,
    }

    setIsUpdating(true)
    try {
      await onUpdateSections([...sections, newSection])
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Page Sections</h2>
        <p className="text-sm text-muted-foreground">
          Drag and drop sections to arrange your storefront layout
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-4">
        <div className="md:col-span-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((section) => section.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {sections.map((section) => (
                  <SortableSection
                    key={section.id}
                    id={section.id}
                    type={section.type}
                    content={section.content}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div className="md:col-span-1">
          <Card className="p-4">
            <h3 className="mb-4 font-medium">Add Section</h3>
            <div className="space-y-2">
              {sectionTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Button
                    key={type.id}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleAddSection(type.id)}
                    disabled={isUpdating}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    <span>{type.name}</span>
                  </Button>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 