import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GripVertical, Settings, Trash2 } from 'lucide-react'

interface SortableSectionProps {
  id: string
  type: string
  content: any
}

export function SortableSection({ id, type, content }: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="relative p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab p-1 hover:bg-gray-100 rounded"
          >
            <GripVertical className="h-5 w-5 text-gray-400" />
          </button>
          <span className="font-medium">{type}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-4">
        {/* Section content preview will go here */}
        <div className="h-20 bg-gray-50 rounded flex items-center justify-center text-gray-400">
          Section Preview
        </div>
      </div>
    </Card>
  )
} 